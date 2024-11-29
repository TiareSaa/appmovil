import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../services/data.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss']
})
export class RegistroPage {
  formularioRegistro: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService // Inyecta el servicio de datos
  ) {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      confirmacionPassword: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirmacionPassword') });
  }

  passwordValidator(control: any): { [key: string]: any } | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d{4,}/.test(value); // Al menos 4 números
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{3,}/.test(value); // Al menos 3 caracteres especiales
    const isValid = hasUpperCase && hasNumber && hasSpecialChar;
    return !isValid ? { invalidPassword: true } : null;
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[passwordKey];
      const confirmPasswordControl = formGroup.controls[confirmPasswordKey];

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  guardar() {
    if (this.formularioRegistro.valid) {
      const nombreUsuario = this.formularioRegistro.get('nombre')?.value;
      const email = this.formularioRegistro.get('email')?.value;
      const password = this.formularioRegistro.get('password')?.value;

      // Crear el objeto usuario con los datos del formulario
      const nuevoUsuario = { nombre: nombreUsuario, email, password };

      // Llamar a la función addUser del servicio para guardar el usuario en la API
      this.dataService.addUser(nuevoUsuario).subscribe(
        (response) => {
          console.log('Usuario registrado exitosamente:', response);

          // Configurar NavigationExtras con el nombre del usuario registrado
          const navigationExtras: NavigationExtras = {
            state: { nombre: nombreUsuario }
          };

          // Redireccionar a la página de bienvenida con el nombre del usuario
          this.router.navigate(['/bienvenida'], navigationExtras);
        },
        (error) => {
          console.error('Error al registrar el usuario:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
