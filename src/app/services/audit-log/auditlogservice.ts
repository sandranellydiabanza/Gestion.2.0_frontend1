import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../api/api.config';
import { ActionLog } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class Auditlogservice {
  private http = inject(HttpClient);

  getAllLogs(): Observable<ActionLog[]> {
    return this.http.get<ActionLog[]>(`${API_BASE_URL}/audit-logs/`);
  }
}
