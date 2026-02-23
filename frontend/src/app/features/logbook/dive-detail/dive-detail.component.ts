import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dive-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4 max-w-4xl">
        <a routerLink="/logbook" class="text-ocean-600 hover:text-ocean-700 mb-4 inline-block">
          <i class="bi bi-arrow-left me-1"></i>Volver al logbook
        </a>

        <!-- Dive Header -->
        <div class="card-ocean overflow-hidden mb-6">
          <div class="h-64 bg-gray-200 placeholder-shimmer"></div>
          <div class="p-6">
            <div class="flex justify-between items-start">
              <div>
                <div class="h-7 bg-gray-200 rounded w-64 mb-3 placeholder-shimmer"></div>
                <div class="h-5 bg-gray-100 rounded w-40 placeholder-shimmer"></div>
              </div>
              <div class="h-8 w-24 bg-green-100 rounded-full placeholder-shimmer"></div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Info -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Stats Grid -->
            <div class="card-ocean p-6">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Datos de la Inmersión</h2>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                @for (item of diveStats; track item.label) {
                  <div class="text-center">
                    <div class="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i class="bi {{ item.icon }} text-ocean-600"></i>
                    </div>
                    <div class="h-5 bg-gray-200 rounded w-12 mx-auto mb-1 placeholder-shimmer"></div>
                    <div class="text-xs text-gray-500">{{ item.label }}</div>
                  </div>
                }
              </div>
            </div>

            <!-- Equipment -->
            <div class="card-ocean p-6">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Equipo Utilizado</h2>
              <div class="grid grid-cols-2 gap-4">
                @for (i of [1, 2, 3, 4]; track i) {
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gray-100 rounded placeholder-shimmer"></div>
                    <div class="h-4 bg-gray-100 rounded w-24 placeholder-shimmer"></div>
                  </div>
                }
              </div>
            </div>

            <!-- Notes -->
            <div class="card-ocean p-6">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Notas</h2>
              <div class="space-y-2">
                <div class="h-4 bg-gray-100 rounded w-full placeholder-shimmer"></div>
                <div class="h-4 bg-gray-100 rounded w-full placeholder-shimmer"></div>
                <div class="h-4 bg-gray-100 rounded w-3/4 placeholder-shimmer"></div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- QR Validation -->
            <div class="card-ocean p-6 text-center">
              <div class="w-32 h-32 bg-gray-100 mx-auto mb-4 rounded-lg placeholder-shimmer"></div>
              <h3 class="font-semibold text-gray-800 mb-2">Código QR</h3>
              <p class="text-sm text-gray-500">Validación del centro</p>
            </div>

            <!-- Buddy -->
            <div class="card-ocean p-6">
              <h3 class="font-semibold text-gray-800 mb-4">Compañero de Buceo</h3>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gray-200 rounded-full placeholder-shimmer"></div>
                <div>
                  <div class="h-4 bg-gray-200 rounded w-24 mb-1 placeholder-shimmer"></div>
                  <div class="h-3 bg-gray-100 rounded w-16 placeholder-shimmer"></div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="card-ocean p-6 space-y-3">
              <button class="w-full btn-ocean-outline py-2">
                <i class="bi bi-pencil me-2"></i>Editar
              </button>
              <button class="w-full btn-ocean-outline py-2">
                <i class="bi bi-share me-2"></i>Compartir
              </button>
              <button class="w-full text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors">
                <i class="bi bi-trash me-2"></i>Eliminar
              </button>
            </div>
          </div>
        </div>

        <!-- Coming Soon Notice -->
        <div class="text-center py-8 mt-8">
          <p class="text-gray-500">
            <i class="bi bi-info-circle me-1"></i>
            Detalles de inmersión - En desarrollo
          </p>
        </div>
      </div>
    </div>
  `
})
export class DiveDetailComponent {
  diveStats = [
    { icon: 'bi-arrow-down', label: 'Profundidad' },
    { icon: 'bi-clock', label: 'Duración' },
    { icon: 'bi-thermometer', label: 'Temperatura' },
    { icon: 'bi-eye', label: 'Visibilidad' },
    { icon: 'bi-speedometer', label: 'Aire Inicio' },
    { icon: 'bi-speedometer2', label: 'Aire Final' },
    { icon: 'bi-box', label: 'Peso' },
    { icon: 'bi-person', label: 'Traje' }
  ];
}
