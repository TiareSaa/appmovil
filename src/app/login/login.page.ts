import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router para manejar la navegación

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    // Configuración del formulario con validaciones
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Valida email
      password: ['', [
        Validators.required, // Requerido
        Validators.minLength(8), // Mínimo 8 caracteres
        Validators.pattern(/^(?=(.*\d){4,})(?=(.*[!@#$%^&*()\-__+.]{3,}))(?=.*[A-Z]).{8,}$/) // 4 números, 3 caracteres especiales, 1 mayúscula
      ]]
    });
  }

  ngOnInit(): void {}

  // Método de login
  onLogin() {
    if (this.loginForm.valid) {
      console.log('Formulario válido:', this.loginForm.value);
      this.router.navigate(['/bienvenida']); // Redirige a la página de bienvenida si el login es exitoso
    } else {
      console.log('Formulario inválido');
    }
  }

  // Método para recuperar contraseña
  recuperarContrasena() {
    console.log('Redirigiendo a recuperación de contraseña');
    this.router.navigate(['/recuperar-contrasena']); // Redirige a la página de recuperación de contraseña
  }
}
