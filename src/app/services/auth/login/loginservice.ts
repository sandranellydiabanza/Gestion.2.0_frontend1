import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { API_BASE_URL } from '../../api/api.config';
import { Etablissement, User } from '../../../types/types';

export const AUTH_TOKEN_KEY = 'iusj_sports_token';
export const AUTH_REFRESH_TOKEN_KEY = 'iusj_sports_refresh_token';
export const AUTH_USER_KEY = 'iusj_sports_user';

interface LoginResponse {
  token: string;
  refresh: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class Loginservice {
  private http = inject(HttpClient);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async loginWithPassword(email: string, motDePasse: string): Promise<{ token: string; user: User }> {
    const result = await firstValueFrom(
      this.http.post<LoginResponse>(`${API_BASE_URL}/auth/login/`, {
        email,
        motDePasse
      })
    );

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(AUTH_TOKEN_KEY, result.token);
      localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, result.refresh);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(result.user));
    }

    return {
      token: result.token,
      user: result.user
    };
  }

  getCurrentUser(): User | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const userStr = localStorage.getItem(AUTH_USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }

  async updateProfile(firstName: string, lastName: string, etablissement: Etablissement): Promise<User> {
    const updatedUser = await firstValueFrom(
      this.http.patch<User>(`${API_BASE_URL}/auth/me/`, {
        firstName,
        lastName,
        etablissement
      })
    );

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedUser));
    }

    return updatedUser;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }
}
