import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Team, TeamService } from '../../services/team.service';

interface PokemonListResponse {
  results: { name: string; url: string }[];
}

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

  allPokemons: string[] = [];
  savedTeams: Team[] = [];
  errorMessage = '';

  constructor(
    private pokemonService: PokemonService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    this.pokemonService.getPokemon().subscribe((response) => {
      const data = response as PokemonListResponse;
      this.allPokemons = data.results.map((p) => p.name);
    });

    this.loadTeams();
  }

  loadTeams() {
    this.savedTeams = this.teamService.getTeams();
  }

  onSubmit() {
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

    this.savedTeams.push(newTeam);
    localStorage.setItem('pokemonTeams', JSON.stringify(this.savedTeams));
    console.log('Team sauvegardée :', newTeam);

    this.team.reset();
  }

  deleteTeam(id: string) {
    this.teamService.deleteTeam(id);
    this.savedTeams = this.savedTeams.filter(t => t.id !== id);
  }
}
