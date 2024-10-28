import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Agregar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { BienvenidaPageRoutingModule } from './bienvenida-routing.module';
import { BienvenidaPage } from './bienvenida.page';
import { PokemonSearchComponent } from '../components/pokemon-search/pokemon-search.component'; // Asegurar la importación correcta del componente

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Aseguramos la compatibilidad con formularios reactivos
    IonicModule,
    BienvenidaPageRoutingModule
  ],
  declarations: [
    BienvenidaPage,
    PokemonSearchComponent // Declaramos el componente adicional
  ]
})
export class BienvenidaPageModule {}
