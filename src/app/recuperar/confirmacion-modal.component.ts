import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirmacion-modal',
  templateUrl: './confirmacion-modal.component.html',
  styleUrls: ['./confirmacion-modal.component.scss'],
})
export class ConfirmacionModalPage {

  constructor(private modalController: ModalController) {}

  cerrarModal() {
    this.modalController.dismiss();  // Cierra el modal
  }
}

