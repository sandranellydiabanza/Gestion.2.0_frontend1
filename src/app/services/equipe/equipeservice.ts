import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { API_BASE_URL } from '../api/api.config';
import { Player, Team } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class Equipeservice {
  private http = inject(HttpClient);
  private readonly teamsUrl = `${API_BASE_URL}/teams/`;
  private readonly playersUrl = `${API_BASE_URL}/players/`;

  async getAllTeams(): Promise<Team[]> {
    return firstValueFrom(this.http.get<Team[]>(this.teamsUrl));
  }

  async getTeamById(id: string): Promise<Team | undefined> {
    return firstValueFrom(this.http.get<Team>(`${this.teamsUrl}${id}/`));
  }

  async createTeam(team: Omit<Team, 'id' | 'playersCount'>): Promise<Team> {
    return firstValueFrom(this.http.post<Team>(this.teamsUrl, team));
  }

  async updateTeam(id: string, updated: Partial<Team>): Promise<Team> {
    return firstValueFrom(this.http.patch<Team>(`${this.teamsUrl}${id}/`, updated));
  }

  async deleteTeam(id: string): Promise<boolean> {
    await firstValueFrom(this.http.delete<void>(`${this.teamsUrl}${id}/`));
    return true;
  }

  async getAllPlayers(): Promise<Player[]> {
    return firstValueFrom(this.http.get<Player[]>(this.playersUrl));
  }

  async getPlayersByTeam(teamId: string): Promise<Player[]> {
    return firstValueFrom(this.http.get<Player[]>(`${this.playersUrl}?teamId=${encodeURIComponent(teamId)}`));
  }

  async addPlayer(player: Omit<Player, 'id'>): Promise<Player> {
    return firstValueFrom(this.http.post<Player>(this.playersUrl, player));
  }

  async updatePlayer(id: string, updated: Partial<Player>): Promise<Player> {
    return firstValueFrom(this.http.patch<Player>(`${this.playersUrl}${id}/`, updated));
  }

  async removePlayer(id: string): Promise<boolean> {
    await firstValueFrom(this.http.delete<void>(`${this.playersUrl}${id}/`));
    return true;
  }
}
