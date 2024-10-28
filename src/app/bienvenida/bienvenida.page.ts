import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { SqliteService } from '../services/sqlite.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  userName: string = 'Invitado'; // Valor por defecto
  userId: string | null = '';
  pokemons: Array<{ nombre: string; tipo: string; poder: number; habilidad: string; id: string }> = [];
  newPokemon: { nombre: string; tipo: string; poder: number; habilidad: string; id: string } = {
    nombre: '',
    tipo: '',
    poder: 0,
    habilidad: '',
    id: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private sqliteService: SqliteService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    // Obtén el nombre de usuario pasado desde registro.page.ts
    if (this.router.getCurrentNavigation()?.extras.state) {
      const state = this.router.getCurrentNavigation()?.extras.state as { nombre: string };
      this.userName = state.nombre || 'Invitado';
    }

    this.userId = localStorage.getItem('userId'); // Mantén el uso de userId desde localStorage si es necesario

    // Asegura que la base de datos esté abierta y luego carga los Pokémon
    await this.sqliteService.openDatabase();
    this.loadPokemons();
  }

  async loadPokemons() {
    if (this.userId) {
      const pokemonsFromSQLite = await this.sqliteService.getPokemonsByUser(parseInt(this.userId));
      
      this.dataService.getPokemonDataByUser(this.userId).subscribe({
        next: (pokemonsFromService) => {
          this.pokemons = [...pokemonsFromSQLite, ...pokemonsFromService];
        },
        error: (err) => {
          console.error('Error al cargar Pokémon desde el servicio', err);
        }
      });
    }
  }

  async addPokemon() {
    if (this.userId) {
      const nuevoPokemon = { ...this.newPokemon, userId: this.userId, id: Date.now().toString() };

      this.dataService.addPokemonForUser(nuevoPokemon, this.userId).subscribe({
        next: async () => {
          await this.sqliteService.addPokemon(nuevoPokemon);
          this.loadPokemons();
          this.newPokemon = { nombre: '', tipo: '', poder: 0, habilidad: '', id: '' }; // Reiniciar el formulario
        },
        error: (err) => {
          console.error('Error al agregar Pokémon', err);
        }
      });
    }
  }

  async editPokemon(pokemon: any) {
    const alert = await this.alertController.create({
      header: 'Editar Pokémon',
      inputs: [
        { name: 'nombre', type: 'text', value: pokemon.nombre, placeholder: 'Nombre' },
        { name: 'tipo', type: 'text', value: pokemon.tipo, placeholder: 'Tipo' },
        { name: 'poder', type: 'number', value: pokemon.poder, placeholder: 'Poder' },
        { name: 'habilidad', type: 'text', value: pokemon.habilidad, placeholder: 'Habilidad' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data) => {
            const pokemonEditado = {
              ...pokemon,
              nombre: data.nombre,
              tipo: data.tipo,
              poder: +data.poder,
              habilidad: data.habilidad
            };
            if (this.userId) {
              await this.dataService.editPokemonForUser(pokemonEditado, this.userId).subscribe({
                next: async () => {
                  await this.sqliteService.updatePokemon(pokemonEditado);
                  this.loadPokemons();
                },
                error: (err) => {
                  console.error('Error al editar Pokémon', err);
                }
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async deletePokemon(pokemonId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de eliminar este Pokémon?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            if (this.userId) {
              await this.dataService.deletePokemonForUser(pokemonId, this.userId).subscribe({
                next: async () => {
                  await this.sqliteService.deletePokemon(pokemonId);
                  this.loadPokemons();
                },
                error: (err) => {
                  console.error('Error al eliminar Pokémon', err);
                }
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
