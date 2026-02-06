import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { Loader } from '../loader/loader';
import { AsyncPipe } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { forkJoin, Observable, map } from 'rxjs';

@Component({
  selector: 'app-infinite-list',
  imports: [Header, Loader, AsyncPipe],
  templateUrl: './infinite-list.html',
  styleUrl: './infinite-list.css',
})
export class InfiniteList implements OnInit {
  pokemonsIds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
  sprites$!: Observable<string[]>;
  
  constructor(private pokemonService: PokemonService) {}
  
  ngOnInit() {
    const requests = this.pokemonsIds.map(id => this.pokemonService.getPokemonById(id));
    
    this.sprites$ = forkJoin(requests).pipe(
      map((pokemons: any[]) => pokemons.map(p => p.sprites.front_default))
    );
  }
}
