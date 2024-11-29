// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Obtener Pokémon por usuario
  getPokemonDataByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Pokemon?userId=${userId}`);
  }

  // Agregar un nuevo Pokémon para un usuario específico
  addPokemonForUser(pokemon: any, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Pokemon`, { ...pokemon, userId });
  }

  // Editar un Pokémon existente para un usuario
  editPokemonForUser(pokemon: any, userId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Pokemon/${pokemon.id}`, { ...pokemon, userId });
  }

  // Eliminar un Pokémon por ID y usuario
  deletePokemonForUser(pokemonId: string, userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Pokemon/${pokemonId}`);
  }

  // Registrar un nuevo usuario
  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Users/`, user); // Asegúrate de que este método devuelve el usuario agregado.
  }
}
