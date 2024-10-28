import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ConfirmacionModalPage } from './confirmacion-modal.component';

@NgModule({
  declarations: [ConfirmacionModalPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule // Importar IonicModule
  ],
  exports: [ConfirmacionModalPage] // Asegúrate de exportarlo si lo usas en otro lugar
})
export class ConfirmacionModalModule {}
