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
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=(.*\d){4,})(?=(.*[!@#$%^&*()\-__+.]{3,}))(?=.*[A-Z]).{8,}$/)
      ]]
    });
  }
    
  ngOnInit(): void {}

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Formulario válido:', this.loginForm.value);
      this.router.navigate(['/bienvenida']);
      // Aquí puedes manejar el envío del formulario, como una solicitud HTTP a una API.
    } else {
      console.log('Formulario inválido');
    }
  }

  recuperarContrasena() {
    console.log('Redirigiendo a recuperación de contraseña');
    this.router.navigate(['/recuperar-contrasena']); // Redirige a la página de recuperación de contraseña
  }
}
