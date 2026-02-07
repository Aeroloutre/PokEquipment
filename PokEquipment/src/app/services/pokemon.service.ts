import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { shareReplay } from 'rxjs/operators';

interface PokemonListResponse {
  results: { name: string; url: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  constructor(private http: HttpClient) {}

  private cachedList$: Observable<PokemonListResponse> | null = null;
  
  getPokemon(): Observable<PokemonListResponse> {
  if (!this.cachedList$) {
    this.cachedList$ = this.http
      .get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon?limit=151')
      .pipe(shareReplay(1)); // cache and replay the last result to any subscriber
  }
  return this.cachedList$;
}
  
  getPokemonById(id: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
