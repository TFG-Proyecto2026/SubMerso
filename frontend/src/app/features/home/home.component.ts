import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isAuthenticated = false;

  features = [
    {
      icon: 'bi-journal-bookmark',
      title: 'Logbook Digital',
      description: 'Registra todas tus inmersiones con validación mediante código QR por centros de buceo.'
    },
    {
      icon: 'bi-people',
      title: 'Comunidad Social',
      description: 'Conecta con otros buceadores, comparte experiencias y descubre nuevos spots.'
    },
    {
      icon: 'bi-shop',
      title: 'Marketplace',
      description: 'Encuentra y reserva experiencias de buceo en centros verificados de todo el mundo.'
    },
    {
      icon: 'bi-robot',
      title: 'DeepBlue Bot',
      description: 'Tu asistente IA personal para recomendaciones de buceo y consejos personalizados.'
    }
  ];

  stats = [
    { value: '10K+', label: 'Buceadores' },
    { value: '500+', label: 'Centros' },
    { value: '50K+', label: 'Inmersiones' },
    { value: '100+', label: 'Países' }
  ];

  constructor(private authService: AuthService) {
    this.isAuthenticated = this.authService.isLoggedIn();
  }
}
