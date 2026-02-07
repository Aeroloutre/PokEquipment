import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-editor',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './team-display.html',
  styleUrl: './team-display.css',
})
export class TeamDisplay {
  // Fetch les teams dans le local storage
  // Fetch les sprites pour chaque pokemon de la liste
  // affichage des sprites
}