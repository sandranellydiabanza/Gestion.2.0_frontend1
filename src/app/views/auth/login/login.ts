import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Loginservice } from '../../../services/auth/login/loginservice';
import { User, UserRole } from '../../../types/types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private loginService = inject(Loginservice);

  @Input() showToast: (msg: string, type: 'success' | 'error') => void = () => {};
  @Output() loginSuccess = new EventEmitter<User>();

  email = 'admin@iusj.org';
  role: UserRole = 'Administrateur';
  password = '';
  loading = false;

  async handleSubmit(): Promise<void> {
    if (!this.email || !this.password) {
      this.showToast('Email et mot de passe requis', 'error');
      return;
    }

    this.loading = true;

    try {
      const result = await this.loginService.loginWithPassword(
        this.email,
        this.password
      );

      this.showToast('Connexion réussie', 'success');
      this.loginSuccess.emit(result.user);
    } catch {
      this.showToast('Email ou mot de passe incorrect', 'error');
    } finally {
      this.loading = false;
    }
  }

  handleQuickSelect(email: string, role: UserRole): void {
    this.email = email;
    this.role = role;
  }
}
