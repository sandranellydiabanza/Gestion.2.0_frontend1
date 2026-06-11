import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Shield,
  Search,
  RefreshCw,
  Trash2,
  Clock,
  LucideAngularModule
} from 'lucide-angular';

import { ActionLog, User } from '../../types/types';
import { Auditlogservice } from '../../services/audit-log/auditlogservice';

@Component({
  selector: 'app-audit-logs',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './audit-logs.html',
  styleUrl: './audit-logs.css',
})
export class AuditLogs {
  private auditLogService = inject(Auditlogservice);

  @Input() currentUser: User | null = null;
  @Input() showToast!: (msg: string, type: 'success' | 'error') => void;

  readonly Shield = Shield;
  readonly Search = Search;
  readonly RefreshCw = RefreshCw;
  readonly Trash2 = Trash2;
  readonly Clock = Clock;

  logs: ActionLog[] = [];
  loading = true;
  search = '';

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.loading = true;

    this.auditLogService.getAllLogs().subscribe({
      next: (data) => {
        this.logs = data;
        this.loading = false;
      },
      error: () => {
        this.showToast?.(
          'Impossible de recuperer le journal audit',
          'error'
        );
        this.loading = false;
      }
    });
  }

  handleClearLogs(): void {
    this.showToast?.(
      'Le journal audit est conserve par le backend',
      'error'
    );
  }

  get filteredLogs(): ActionLog[] {
    return this.logs.filter((log) => {
      return (
        log.userName.toLowerCase().includes(this.search.toLowerCase()) ||
        log.action.toLowerCase().includes(this.search.toLowerCase()) ||
        log.details.toLowerCase().includes(this.search.toLowerCase())
      );
    });
  }
}
