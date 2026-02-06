import { Injectable } from '@angular/core';

export interface Team {
  id: string;
  pokemon1: { name: string };
  pokemon2: { name: string };
  pokemon3: { name: string };
  pokemon4: { name: string };
  pokemon5: { name: string };
  pokemon6: { name: string };
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private storageKey = 'pokemonTeams';

  getTeams(): Team[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  deleteTeam(id: string): void {
    const teams = this.getTeams().filter(t => t.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(teams));
  }
}
