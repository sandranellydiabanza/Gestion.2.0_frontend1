import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { API_BASE_URL } from '../api/api.config';
import { Competition } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class Competitionservice {
  private http = inject(HttpClient);
  private readonly url = `${API_BASE_URL}/competitions/`;

  async getAllCompetitions(): Promise<Competition[]> {
    return firstValueFrom(this.http.get<Competition[]>(this.url));
  }

  async getCompetitionById(id: string): Promise<Competition | undefined> {
    return firstValueFrom(this.http.get<Competition>(`${this.url}${id}/`));
  }

  async createCompetition(competition: Omit<Competition, 'id' | 'teamsCount'>): Promise<Competition> {
    return firstValueFrom(this.http.post<Competition>(this.url, competition));
  }

  async updateCompetition(id: string, updated: Partial<Competition>): Promise<Competition> {
    return firstValueFrom(this.http.patch<Competition>(`${this.url}${id}/`, updated));
  }

  async deleteCompetition(id: string): Promise<boolean> {
    await firstValueFrom(this.http.delete<void>(`${this.url}${id}/`));
    return true;
  }
}
