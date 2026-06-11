import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { API_BASE_URL } from '../api/api.config';
import { SportNotification } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class Notificationservice {
  private http = inject(HttpClient);
  private readonly url = `${API_BASE_URL}/notifications/`;

  getAllNotifications(): Observable<SportNotification[]> {
    return this.http.get<SportNotification[]>(this.url);
  }

  markAsRead(id: string): Observable<SportNotification[]> {
    return this.http
      .post<SportNotification>(`${this.url}${id}/mark-as-read/`, {})
      .pipe(switchMap(() => this.getAllNotifications()));
  }

  markAllAsRead(): Observable<SportNotification[]> {
    return this.http.post<SportNotification[]>(`${this.url}mark-all-as-read/`, {});
  }

  createNotification(
    notification: Omit<SportNotification, 'id' | 'date' | 'isRead'>
  ): Observable<SportNotification> {
    return this.http.post<SportNotification>(this.url, notification);
  }
}
