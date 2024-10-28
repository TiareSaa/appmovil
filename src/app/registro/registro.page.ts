import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss']
})
export class RegistroPage {
  formularioRegistro: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    // Inyecta el Router
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

      // Usamos NavigationExtras para pasar el nombre del usuario
      const navigationExtras: NavigationExtras = {
        state: { nombre: nombreUsuario }
      };

      console.log('Registro exitoso');

      // Redireccionar a la página de bienvenida con el nombre
      this.router.navigate(['/bienvenida'], navigationExtras);
    } else {
      console.log('Formulario inválido');
    }
  }
}
