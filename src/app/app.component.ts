import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private db: SQLiteObject | null = null; // Inicializa la base de datos como nula

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready(); // Espera a que la plataforma esté lista
    await this.createDatabase(); // Asegúrate de esperar a que la base de datos se cree
  }

  async createDatabase() {
    try {
      this.db = await this.sqlite.create({
        name: 'pokemons.db',
        location: 'default'
      });
      console.log('Base de datos creada con éxito');

      // Crea las tablas necesarias
      await this.createTables();
    } catch (error) {
      console.error('Error al crear la base de datos:', error);
    }
  }

  private async createTables() {
    try {
      if (this.db) {
        // Crea la tabla de usuarios
        await this.db.executeSql(`CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          email TEXT,
          password TEXT
        );`, []);
        console.log('Tabla Usuarios creada con éxito');

        // Crea la tabla de Pokémon
        await this.db.executeSql(`CREATE TABLE IF NOT EXISTS pokemons (
          id TEXT PRIMARY KEY,
          userId INTEGER,
          nombre TEXT,
          tipo TEXT,
          poder INTEGER,
          habilidad TEXT,
          FOREIGN KEY(userId) REFERENCES usuarios(id)
        );`, []);
        console.log('Tabla Pokémon creada con éxito');
      }
    } catch (error) {
      console.error('Error al crear tablas:', error);
    }
  }
}
