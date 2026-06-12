import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { API_BASE_URL } from '../api/api.config';
import { EtablissementStanding, Standing } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class Classementservice {
  private http = inject(HttpClient);

  async getStandings(competitionId: string): Promise<Standing[]> {
    return firstValueFrom(
      this.http.get<Standing[]>(`${API_BASE_URL}/standings/${competitionId}/`)
    );
  }

  async getInterEcolesStandings(): Promise<EtablissementStanding[]> {
    return firstValueFrom(
      this.http.get<EtablissementStanding[]>(`${API_BASE_URL}/standings/etablissements/`)
    );
  }
}
