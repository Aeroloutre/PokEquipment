import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PokemonService } from '../../services/pokemon.service';
import { Team, TeamService } from '../../services/team.service';
import { ChangeDetectorRef } from '@angular/core';

interface PokemonListResponse {
  results: { name: string; url: string }[];
}

interface PokemonSlot {
  name: string;
  sprite: string | null;
}

interface TeamWithSprites {
  id: string;
  pokemon1: PokemonSlot;
  pokemon2: PokemonSlot;
  pokemon3: PokemonSlot;
  pokemon4: PokemonSlot;
  pokemon5: PokemonSlot;
  pokemon6: PokemonSlot;
}

const POKEMON_KEYS = [
  'pokemon1', 'pokemon2', 'pokemon3',
  'pokemon4', 'pokemon5', 'pokemon6',
] as const;

type PokemonKey = typeof POKEMON_KEYS[number];

@Component({
  selector: 'app-team-editor',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './team-editor.html',
  styleUrl: './team-editor.css',
})
export class TeamEditor implements OnInit {
  team = new FormGroup({
    pokemon1: new FormControl('', Validators.required),
    pokemon2: new FormControl('', Validators.required),
    pokemon3: new FormControl('', Validators.required),
    pokemon4: new FormControl('', Validators.required),
    pokemon5: new FormControl('', Validators.required),
    pokemon6: new FormControl('', Validators.required),
  });

  // Exposed so the template can iterate with *ngFor
  readonly pokemonKeys = POKEMON_KEYS;

  allPokemons: string[] = [];
  savedTeamsWithSprites: TeamWithSprites[] = [];
  errorMessage = '';
  isLoading = false;

  constructor(
    private pokemonService: PokemonService,
    private teamService: TeamService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pokemonService.getPokemon().subscribe((response) => {
      const data = response as PokemonListResponse;
      this.allPokemons = data.results.map((p) => p.name);
      this.cdr.markForCheck();
    });

    this.refreshTeams();
  }

  // ── Data loading ─────────────────────────────────────────────────────────────
  private refreshTeams(): void {
    const teams = this.teamService.getTeams();

    if (teams.length === 0) {
      this.savedTeamsWithSprites = [];
      this.cdr.markForCheck();
      return;
    }

    this.isLoading = true;

    const teamObservables = teams.map((team) => {
      const slotObservables = POKEMON_KEYS.map((key) =>
        this.resolvePokemonSlot(team, key)
      );

      return forkJoin(slotObservables).pipe(
        map((slots): TeamWithSprites => ({
          id: team.id,
          pokemon1: slots[0],
          pokemon2: slots[1],
          pokemon3: slots[2],
          pokemon4: slots[3],
          pokemon5: slots[4],
          pokemon6: slots[5],
        }))
      );
    });

    forkJoin(teamObservables).subscribe({
      next: (teamsWithSprites) => {
        this.savedTeamsWithSprites = teamsWithSprites;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  private resolvePokemonSlot(team: Team, key: PokemonKey) {
    const name = team[key]?.name;

    if (!name) {
      return of<PokemonSlot>({ name: '', sprite: null });
    }

    // getPokemonByName if your service exposes it; otherwise fall back to
    // getPokemonById with the name string — PokeAPI accepts both.
    const request = this.pokemonService.getPokemonById(name as unknown as number);

    return request.pipe(
      map((res: any): PokemonSlot => ({
        name,
        sprite: res?.sprites?.front_default ?? null,
      })),
      catchError(() => of<PokemonSlot>({ name, sprite: null }))
    );
  }

  // ── Mutations ─────────────────────────────────────────────────────────────────
  onSubmit(): void {
    if (this.team.invalid) {
      this.errorMessage = 'Veuillez sélectionner 6 Pokémon';
      return;
    }

    this.errorMessage = '';

    const newTeam: Team = {
      id: crypto.randomUUID(),
      pokemon1: { name: this.team.value.pokemon1! },
      pokemon2: { name: this.team.value.pokemon2! },
      pokemon3: { name: this.team.value.pokemon3! },
      pokemon4: { name: this.team.value.pokemon4! },
      pokemon5: { name: this.team.value.pokemon5! },
      pokemon6: { name: this.team.value.pokemon6! },
    };

    // Persist via the service if addTeam exists, otherwise write directly.
    // Add `addTeam(team: Team)` to TeamService to remove this branch.
    if (typeof this.teamService.addTeam === 'function') {
      this.teamService.addTeam(newTeam);
    } else {
      const current = this.teamService.getTeams();
      localStorage.setItem('pokemonTeams', JSON.stringify([...current, newTeam]));
    }

    this.team.reset();
    this.refreshTeams();
  }

  deleteTeam(id: string): void {
    this.teamService.deleteTeam(id);
    this.refreshTeams();
  }
}