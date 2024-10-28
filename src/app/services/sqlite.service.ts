import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private db: SQLiteObject | undefined;

  constructor(private sqlite: SQLite) {}

  public async openDatabase() {
    if (!this.db) {
      try {
        this.db = await this.sqlite.create({
          name: 'mydatabase.db',
          location: 'default'
        });
        console.log('Base de datos creada con éxito');
        await this.createTables();
      } catch (error) {
        console.error('Error al abrir la base de datos:', error);
      }
    }
  }

  private async createTables() {
    if (this.db) {
      try {
        await this.db.executeSql(`
          CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            email TEXT,
            password TEXT
          )`, []);

        await this.db.executeSql(`
          CREATE TABLE IF NOT EXISTS pokemons (
            id TEXT PRIMARY KEY,
            userId INTEGER,
            nombre TEXT,
            tipo TEXT,
            poder INTEGER,
            habilidad TEXT,
            FOREIGN KEY(userId) REFERENCES usuarios(id)
          )`, []);
        console.log('Tablas creadas con éxito');
      } catch (error) {
        console.error('Error al crear tablas:', error);
      }
    }
  }

  async addUser(user: any) {
    try {
      await this.openDatabase();
      return await this.db?.executeSql(`INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)`, 
      [user.nombre, user.email, user.password]);
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  }

  async getUsers(): Promise<any[]> {
    try {
      await this.openDatabase();
      const res = await this.db?.executeSql(`SELECT * FROM usuarios`, []);
      const users = [];
      for (let i = 0; i < (res?.rows.length || 0); i++) {
        users.push(res.rows.item(i));
      }
      return users;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }
  }

  async addPokemon(pokemon: any) {
    try {
      await this.openDatabase();
      return await this.db?.executeSql(`INSERT INTO pokemons (id, userId, nombre, tipo, poder, habilidad) VALUES (?, ?, ?, ?, ?, ?)`, 
        [pokemon.id, pokemon.userId, pokemon.nombre, pokemon.tipo, pokemon.poder, pokemon.habilidad]);
    } catch (error) {
      console.error('Error al agregar Pokémon:', error);
    }
  }

  async getPokemonsByUser(userId: number): Promise<any[]> {
    try {
      await this.openDatabase();
      const res = await this.db?.executeSql(`SELECT * FROM pokemons WHERE userId = ?`, [userId]);
      const pokemons = [];
      for (let i = 0; i < (res?.rows.length || 0); i++) {
        pokemons.push(res.rows.item(i));
      }
      return pokemons;
    } catch (error) {
      console.error('Error al obtener Pokémon por usuario:', error);
      return [];
    }
  }

  async updatePokemon(pokemon: any) {
    try {
      await this.openDatabase();
      return await this.db?.executeSql(`UPDATE pokemons SET nombre = ?, tipo = ?, poder = ?, habilidad = ? WHERE id = ?`, 
        [pokemon.nombre, pokemon.tipo, pokemon.poder, pokemon.habilidad, pokemon.id]);
    } catch (error) {
      console.error('Error al actualizar Pokémon:', error);
    }
  }

  async deletePokemon(pokemonId: string) {
    try {
      await this.openDatabase();
      return await this.db?.executeSql(`DELETE FROM pokemons WHERE id = ?`, [pokemonId]);
    } catch (error) {
      console.error('Error al eliminar Pokémon:', error);
    }
  }
}
