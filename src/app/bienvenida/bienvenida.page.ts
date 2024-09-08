import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  userName: string | null = '';
  pokemons: Array<{ name: string; type: string; level: number; image: string }> = [];

  constructor() { }

  ngOnInit() {
    // Recuperar el nombre del usuario desde localStorage
    this.userName = localStorage.getItem('userName');

    // Inicializar la lista de Pokémon con las imágenes
    this.pokemons = [
      { name: 'Charizard', type: 'Fuego', level: 36, image: 'assets/img/Charizard.png' },
      { name: 'Pikachu', type: 'Eléctrico', level: 25, image: 'assets/img/Pikachu.png' },
      { name: 'Ditto', type: 'Normal', level: 20, image: 'assets/img/Ditto.png' },
      { name: 'Squirtle', type: 'Agua', level: 16, image: 'assets/img/Squirtle.png' },
      { name: 'Articuno', type: 'Hielo/Volador', level: 50, image: 'assets/img/Articuno.png' }
    ];
  }
}
