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
  private storage: Storage | null = null;

constructor() {
  try {
    this.storage = localStorage;
  } catch {
    this.storage = null;
  }
  
}

  private storageKey = 'pokemonTeams';

  getTeams(): Team[] {
    const stored = this.storage?.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }
  
  deleteTeam(id: string): void {
    const teams = this.getTeams().filter(t => t.id !== id);
    this.storage?.setItem(this.storageKey, JSON.stringify(teams));
  }

  addTeam(team: Team): void {
  const teams = this.getTeams();
  this.storage?.setItem(this.storageKey, JSON.stringify([...teams, team]));
}
}
