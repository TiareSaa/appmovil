import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [PokemonSearchComponent],
  imports: [CommonModule],
  exports: [PokemonSearchComponent]  // Asegúrate de exportarlo
})
export class SharedModule { }
