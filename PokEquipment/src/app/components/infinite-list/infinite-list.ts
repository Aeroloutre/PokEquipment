import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { Loader } from '../loader/loader';
import { AsyncPipe } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { forkJoin, Observable, map } from 'rxjs';
import { MarqueeCarousel } from '../marquee-carousel/marquee-carousel';

@Component({
  selector: 'app-infinite-list',
  imports: [Header, Loader, AsyncPipe, MarqueeCarousel],
  templateUrl: './infinite-list.html',
  styleUrl: './infinite-list.css',
})
export class InfiniteList implements OnInit {
  sprites1$!: Observable<string[]>; // Pokémon 1-30
  sprites2$!: Observable<string[]>; // Pokémon 31-60
  sprites3$!: Observable<string[]>; // Pokémon 61-90
  sprites4$!: Observable<string[]>; // Pokémon 91-120
  sprites5$!: Observable<string[]>; // Pokémon 121-150
  
  constructor(private pokemonService: PokemonService) {}
  
  ngOnInit() {
    this.sprites1$ = this.loadSprites(1, 30);
    this.sprites2$ = this.loadSprites(31, 60);
    this.sprites3$ = this.loadSprites(61, 90);
    this.sprites4$ = this.loadSprites(91, 120);
    this.sprites5$ = this.loadSprites(121, 150);
  }

  private loadSprites(start: number, end: number): Observable<string[]> {
    const ids = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    const requests = ids.map(id => this.pokemonService.getPokemonById(id));
    
    return forkJoin(requests).pipe(
      map((pokemons: any[]) => pokemons.map(p => p.sprites.front_default))
    );
  }
}
