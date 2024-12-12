import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../services/data.service'; // Servicio para manejar datos
import { AuthService } from '../services/auth.service'; // Servicio para autenticación
import { FirestoreService } from '../services/firestore.service';

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
    private dataService: DataService, // Servicio para datos
    private authService: AuthService, // Servicio para autenticación
    private firestore: FirestoreService //servicio para firebase
  ) {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      confirmacionPassword: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirmacionPassword') });
  }

  getLogin() {
      this.firestore.getCollection();
  }

  passwordValidator(control: any): { [key: string]: any } | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d{4,}/.test(value); // Al menos 4 números
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]{3,}/.test(value); // Al menos 3 caracteres especiales
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

      const nuevoUsuario = { nombre: nombreUsuario, email, password };

      this.dataService.addUser(nuevoUsuario).subscribe(
        (response) => {
          console.log('Usuario registrado exitosamente:', response);

          const navigationExtras: NavigationExtras = {
            state: { nombre: nombreUsuario }
          };

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

  async registrarConGoogle() {
    try {
      const usuario = await this.authService.loginWithGoogle();

      if (usuario) {
        console.log('Usuario autenticado con Google:', usuario);

        const navigationExtras: NavigationExtras = {
          state: { nombre: usuario.displayName }
        };

        // Redirigir al usuario a la página de bienvenida
        this.router.navigate(['/bienvenida'], navigationExtras);
      }
    } catch (error) {
      console.error('Error al autenticar con Google:', error);
    }
  }
}
