import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { API_BASE_URL } from '../api/api.config';
import { CardRecord, GoalRecord, Match, Team } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class Matchservice {
  private http = inject(HttpClient);
  private readonly url = `${API_BASE_URL}/matches/`;

  async getAllMatches(): Promise<Match[]> {
    return firstValueFrom(this.http.get<Match[]>(this.url));
  }

  async getMatchesByCompetition(competitionId: string): Promise<Match[]> {
    return firstValueFrom(
      this.http.get<Match[]>(`${this.url}?competitionId=${encodeURIComponent(competitionId)}`)
    );
  }

  async createMatch(match: Omit<Match, 'id' | 'goals' | 'cards'>): Promise<Match> {
    return firstValueFrom(this.http.post<Match>(this.url, match));
  }

  async updateMatch(id: string, updated: Partial<Match>): Promise<Match> {
    return firstValueFrom(this.http.patch<Match>(`${this.url}${id}/`, updated));
  }

  async deleteMatch(id: string): Promise<boolean> {
    await firstValueFrom(this.http.delete<void>(`${this.url}${id}/`));
    return true;
  }

  async generateAutoSchedule(
    competitionId: string,
    _competitionName: string,
    selectedTeams: Team[],
    startDate: string
  ): Promise<Match[]> {
    return firstValueFrom(
      this.http.post<Match[]>(`${this.url}generate-auto-schedule/`, {
        competitionId,
        teamIds: selectedTeams.map(team => team.id),
        startDate
      })
    );
  }

  async addGoal(matchId: string, item: Omit<GoalRecord, 'id'>): Promise<Match> {
    return firstValueFrom(this.http.post<Match>(`${this.url}${matchId}/goals/`, item));
  }

  async addCard(matchId: string, item: Omit<CardRecord, 'id'>): Promise<Match> {
    return firstValueFrom(this.http.post<Match>(`${this.url}${matchId}/cards/`, item));
  }
}
