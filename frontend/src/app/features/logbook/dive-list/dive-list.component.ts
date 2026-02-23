import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dive-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 class="text-3xl font-bold text-gray-800">Mi Logbook</h1>
            <p class="text-gray-600">Registro de todas tus inmersiones</p>
          </div>
          <button class="btn-ocean">
            <i class="bi bi-plus-lg me-2"></i>Nueva Inmersión
          </button>
        </div>

        <!-- Stats Summary -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          @for (stat of stats; track stat.label) {
            <div class="card-ocean p-4 text-center">
              <div class="text-2xl font-bold text-ocean-600">{{ stat.value }}</div>
              <div class="text-gray-500 text-sm">{{ stat.label }}</div>
            </div>
          }
        </div>

        <!-- Filters -->
        <div class="card-ocean p-4 mb-6">
          <div class="flex flex-wrap gap-4">
            <div class="flex-1 min-w-[200px]">
              <div class="h-10 bg-gray-100 rounded-lg placeholder-shimmer"></div>
            </div>
            <div class="w-40">
              <div class="h-10 bg-gray-100 rounded-lg placeholder-shimmer"></div>
            </div>
            <div class="w-40">
              <div class="h-10 bg-gray-100 rounded-lg placeholder-shimmer"></div>
            </div>
          </div>
        </div>

        <!-- Dive List -->
        <div class="space-y-4">
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <div class="card-ocean p-6 hover:shadow-lg transition-all cursor-pointer">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="w-full md:w-32 h-24 bg-gray-200 rounded-lg placeholder-shimmer"></div>
                <div class="flex-1">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <div class="h-5 bg-gray-200 rounded w-48 mb-2 placeholder-shimmer"></div>
                      <div class="h-4 bg-gray-100 rounded w-32 placeholder-shimmer"></div>
                    </div>
                    <div class="h-6 w-20 bg-ocean-100 rounded-full placeholder-shimmer"></div>
                  </div>
                  <div class="grid grid-cols-4 gap-4 mt-4">
                    <div>
                      <div class="text-xs text-gray-500">Profundidad</div>
                      <div class="h-4 bg-gray-100 rounded w-12 placeholder-shimmer mt-1"></div>
                    </div>
                    <div>
                      <div class="text-xs text-gray-500">Duración</div>
                      <div class="h-4 bg-gray-100 rounded w-12 placeholder-shimmer mt-1"></div>
                    </div>
                    <div>
                      <div class="text-xs text-gray-500">Temp.</div>
                      <div class="h-4 bg-gray-100 rounded w-12 placeholder-shimmer mt-1"></div>
                    </div>
                    <div>
                      <div class="text-xs text-gray-500">Visibilidad</div>
                      <div class="h-4 bg-gray-100 rounded w-12 placeholder-shimmer mt-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Coming Soon Notice -->
        <div class="text-center py-12 mt-8">
          <div class="w-20 h-20 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="bi bi-journal-bookmark text-4xl text-ocean-600"></i>
          </div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2">Logbook Digital - Próximamente</h2>
          <p class="text-gray-600 max-w-md mx-auto mb-6">
            Pronto podrás registrar todas tus inmersiones con validación QR por centros de buceo certificados.
          </p>
          <a routerLink="/deepblue" class="btn-ocean">
            <i class="bi bi-robot me-2"></i>Hablar con DeepBlue
          </a>
        </div>
      </div>
    </div>
  `
})
export class DiveListComponent {
  stats = [
    { value: '0', label: 'Total Inmersiones' },
    { value: '0m', label: 'Prof. Máxima' },
    { value: '0 min', label: 'Tiempo Total' },
    { value: '-', label: 'Último Buceo' }
  ];
}
