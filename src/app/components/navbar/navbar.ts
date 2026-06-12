import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bell, LucideAngularModule, Menu } from 'lucide-angular';
import { UserRole } from '../../types/types';

interface NavbarUser {
  avatarUrl?: string;
  role: UserRole;
}

@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Input() currentRoute: string = 'dashboard';
  @Input() currentUser: NavbarUser | null = null;
  @Input() unreadCount: number = 0;

  @Output() navigate = new EventEmitter<string>();
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() roleChange = new EventEmitter<UserRole>();

  readonly MenuIcon = Menu;
  readonly BellIcon = Bell;

  readonly roles: UserRole[] = [
    'Administrateur',
    'Responsable sportif',
    'Capitaine equipe',
    'Étudiant',
  ];

  getPageTitle(route: string): string {
    switch (route) {
      case 'dashboard':
        return 'Tableau de bord';
      case 'competition':
        return 'Gestion des compétitions';
      case 'team':
        return 'Équipes universitaires';
      case 'players':
        return 'Joueurs & rôles';
      case 'matches':
        return 'Matchs & calendrier';
      case 'rankings':
        return 'Classements officiels';
      case 'notifications':
        return 'Annonces & notifications';
      case 'profile':
        return 'Profil utilisateur';
      case 'auditlogs':
        return 'Journal des actions';
      default:
        return 'IUSJ Sports';
    }
  }

  handleRoleChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as UserRole;
    this.roleChange.emit(value);
  }
}
