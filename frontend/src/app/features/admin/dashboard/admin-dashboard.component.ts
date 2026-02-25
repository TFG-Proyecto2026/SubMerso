import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService, AdminUser } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  users: AdminUser[] = [];
  loading = true;
  error = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe({
      next: list => {
        this.users = list;
        this.loading = false;
      },
      error: err => {
        this.error = err?.message || 'Error al cargar usuarios';
        this.loading = false;
      }
    });
  }

  isAdmin(roles: string[]): boolean {
    return roles?.includes('ROLE_ADMIN') ?? false;
  }
}
