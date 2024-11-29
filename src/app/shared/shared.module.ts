import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonSearchComponent } from '../components/pokemon-search/pokemon-search.component';



@NgModule({
  declarations: [./PokemonSearchComponent],
  imports: [CommonModule],
  exports: [PokemonSearchComponent]  // Asegúrate de exportarlo
})
export class SharedModule { }
