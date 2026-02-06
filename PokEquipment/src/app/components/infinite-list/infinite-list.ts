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
  pokemonsIds: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  sprites$!: Observable<string[]>;
  
  constructor(private pokemonService: PokemonService) {}
  
  ngOnInit() {
    const requests = this.pokemonsIds.map(id => this.pokemonService.getPokemonById(id));
    
    this.sprites$ = forkJoin(requests).pipe(
      map((pokemons: any[]) => pokemons.map(p => p.sprites.front_default))
    );
  }
}
