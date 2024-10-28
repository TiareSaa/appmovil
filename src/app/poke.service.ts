import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  // Obtener Pokémon por nombre
  getPokemonByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${name.toLowerCase()}`); // Convertir a minúsculas
  }

  // Obtener una lista de Pokémon (opcional)
  getPokemons(limit: number = 20, offset: number = 0): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }
}
