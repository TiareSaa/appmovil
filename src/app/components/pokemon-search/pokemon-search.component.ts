import { Component } from '@angular/core';
import { PokeService } from '../../poke.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss'],
})
export class PokemonSearchComponent {
  pokemonName: string = '';
  pokemonData: any = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(private pokeService: PokeService) {}

  searchPokemon() {
    this.loading = true;
    this.error = null; // Reiniciar el error

    this.pokeService.getPokemonByName(this.pokemonName).subscribe(
      data => {
        this.pokemonData = data; // Guardar datos del Pokémon
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.error = 'Pokémon no encontrado'; // Manejar error
        this.pokemonData = null; // Reiniciar los datos
      }
    );
  }
}
