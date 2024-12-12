import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Iniciar sesión con Google
  async loginWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');

      const result = await this.afAuth.signInWithPopup(provider);
      console.log('Usuario autenticado:', result.user);
      return result.user;
    } catch (error) {
      console.error('Error en login con Google:', error);
      throw error;
    }
  }

  // Cerrar sesión
  async logout() {
    try {
      await this.afAuth.signOut();
      console.log('Usuario desconectado');
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  }

  // Obtener usuario actual
  getCurrentUser() {
    return this.afAuth.authState; // Retorna un observable con el usuario actual
  }
}
