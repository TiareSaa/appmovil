import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ConfirmacionModalPage } from '../confirmacion-modal/confirmacion-modal.component'; // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage {
  correoElectronico: string = '';
  mensajeError: string = ''; // Mensaje de error

  constructor(private modalController: ModalController, private router: Router) {}

  async enviarCorreo() {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.correoElectronico)) {
      // Muestra un mensaje de error si el correo electrónico no es válido
      this.mensajeError = 'Ingresa un correo electrónico válido';
      return; // Sale del método si el correo no es válido
    }

    // Aquí iría la lógica para enviar el correo electrónico
    // ...

    // Abre el modal si el correo es válido
    const modal = await this.modalController.create({
      component: ConfirmacionModalPage,
      cssClass: 'mi-clase-modal'
    });

    modal.onDidDismiss().then(() => {
      // Redirige al login después de que el modal se haya cerrado
      this.router.navigate(['/']);
    });

    return await modal.present();
  }
}
