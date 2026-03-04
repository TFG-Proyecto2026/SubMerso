import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DiveService, Dive } from '../../../core/services/dive.service';

@Component({
  selector: 'app-dive-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div class="flex items-center gap-3">
            <span class="text-4xl" aria-hidden="true">📒</span>
            <div>
              <h1 class="text-3xl font-bold text-gray-800">Mi Logbook</h1>
              <p class="text-gray-600">Registro de todas tus inmersiones</p>
            </div>
          </div>
          <a routerLink="/logbook/nueva" class="btn-ocean inline-flex items-center gap-2">
            <i class="bi bi-plus-circle"></i> Nueva inmersión
          </a>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="card-ocean p-4 text-center">
            <i class="bi bi-water text-2xl text-ocean-500 mb-1 block"></i>
            <div class="text-2xl font-bold text-ocean-600">{{ stats[0].value }}</div>
            <div class="text-gray-500 text-sm">{{ stats[0].label }}</div>
          </div>
          <div class="card-ocean p-4 text-center">
            <i class="bi bi-arrow-down-circle text-2xl text-ocean-500 mb-1 block"></i>
            <div class="text-2xl font-bold text-ocean-600">{{ stats[1].value }}</div>
            <div class="text-gray-500 text-sm">{{ stats[1].label }}</div>
          </div>
          <div class="card-ocean p-4 text-center">
            <i class="bi bi-clock text-2xl text-ocean-500 mb-1 block"></i>
            <div class="text-2xl font-bold text-ocean-600">{{ stats[2].value }}</div>
            <div class="text-gray-500 text-sm">{{ stats[2].label }}</div>
          </div>
          <div class="card-ocean p-4 text-center">
            <i class="bi bi-calendar3 text-2xl text-ocean-500 mb-1 block"></i>
            <div class="text-2xl font-bold text-ocean-600">{{ stats[3].value }}</div>
            <div class="text-gray-500 text-sm">{{ stats[3].label }}</div>
          </div>
        </div>

        @if (cargando) {
          <div class="card-ocean p-8 text-center text-gray-500">
            <i class="bi bi-arrow-repeat animate-spin text-4xl text-ocean-500 mb-3 block"></i>
            <p>Cargando inmersiones...</p>
          </div>
        } @else if (dives.length === 0) {
          <div class="card-ocean p-12 text-center">
            <span class="text-6xl block mb-4" aria-hidden="true">🌊</span>
            <div class="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="bi bi-journal-plus text-3xl text-ocean-600"></i>
            </div>
            <h2 class="text-xl font-semibold text-gray-800 mb-2">Aún no tienes inmersiones</h2>
            <p class="text-gray-600 max-w-md mx-auto mb-6">
              Registra tu primera inmersión y aparecerá aquí. También podrás validarlas con QR en centros de buceo.
            </p>
            <a routerLink="/logbook/nueva" class="btn-ocean inline-flex items-center gap-2">
              <i class="bi bi-plus-circle"></i> Nueva inmersión
            </a>
          </div>
        } @else {
          <div class="space-y-4">
            @for (dive of dives; track dive.id) {
              <a [routerLink]="['/logbook', dive.id]" class="block card-ocean p-6 hover:shadow-lg transition-all cursor-pointer group">
                <div class="flex flex-col md:flex-row gap-4">
                  <div class="w-full md:w-28 h-24 bg-gradient-to-br from-ocean-100 to-ocean-200 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span class="text-4xl" aria-hidden="true">🤿</span>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between items-start mb-2">
                      <div>
                        <div class="font-semibold text-gray-800 flex items-center gap-2">
                          <i class="bi bi-geo-alt text-ocean-500 text-sm"></i>{{ dive.location || 'Sin ubicación' }}
                        </div>
                        <div class="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                          <i class="bi bi-calendar3 text-gray-400"></i>
                          {{ dive.diveDate | date:'dd/MM/yyyy' }}{{ dive.diveNumber ? ' · #' + dive.diveNumber : '' }}
                        </div>
                      </div>
                      @if (dive.verified) {
                        <span class="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium inline-flex items-center gap-1">
                          <i class="bi bi-patch-check-fill"></i> Verificada
                        </span>
                      }
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                      <div class="flex items-center gap-2">
                        <i class="bi bi-arrow-down-circle text-ocean-500"></i>
                        <div>
                          <span class="text-gray-500 block text-xs">Profundidad</span>
                          <span class="font-medium">{{ dive.depthMax ?? '-' }} m</span>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="bi bi-clock text-ocean-500"></i>
                        <div>
                          <span class="text-gray-500 block text-xs">Duración</span>
                          <span class="font-medium">{{ dive.durationMinutes ?? '-' }} min</span>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="bi bi-thermometer-half text-ocean-500"></i>
                        <div>
                          <span class="text-gray-500 block text-xs">Temp.</span>
                          <span class="font-medium">{{ dive.tempBottom ?? dive.tempSurface ?? '-' }} °C</span>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="bi bi-brightness-high text-ocean-500"></i>
                        <div>
                          <span class="text-gray-500 block text-xs">Visibilidad</span>
                          <span class="font-medium">{{ dive.visibility ?? '-' }}{{ dive.visibilityUnit ? dive.visibilityUnit : '' }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="self-center flex flex-col sm:flex-row items-center gap-2">
                    <a [routerLink]="['/logbook/editar', dive.id]" (click)="$event.stopPropagation()" class="px-3 py-1.5 rounded-lg border border-ocean-500 text-ocean-600 hover:bg-ocean-50 text-sm font-medium inline-flex items-center gap-1">
                      <i class="bi bi-pencil"></i> Modificar
                    </a>
                    <button type="button" (click)="borrar(dive); $event.stopPropagation()" class="px-3 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 text-sm font-medium inline-flex items-center gap-1">
                      <i class="bi bi-trash"></i> Borrar
                    </button>
                    <i class="bi bi-chevron-right text-2xl text-gray-300 group-hover:text-ocean-500 transition-colors hidden sm:block"></i>
                  </div>
                </div>
              </a>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class DiveListComponent implements OnInit {
  dives: Dive[] = [];
  cargando = true;
  stats = [
    { value: '0', label: 'Total inmersiones' },
    { value: '0 m', label: 'Prof. máxima' },
    { value: '0 min', label: 'Tiempo total' },
    { value: '-', label: 'Último buceo' }
  ];

  constructor(private diveService: DiveService) {}

  ngOnInit(): void {
    this.diveService.getDives().subscribe({
      next: (list) => {
        this.dives = list;
        this.cargando = false;
        this.actualizarEstadisticas();
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  borrar(dive: Dive): void {
    if (!dive.id) return;
    if (!window.confirm('¿Eliminar esta inmersión? Esta acción no se puede deshacer.')) return;
    this.diveService.deleteDive(dive.id).subscribe({
      next: () => {
        this.dives = this.dives.filter((d) => d.id !== dive.id);
        this.actualizarEstadisticas();
      },
      error: () => {}
    });
  }

  private actualizarEstadisticas(): void {
    const n = this.dives.length;
    const maxDepth = this.dives.reduce((acc, d) => Math.max(acc, d.depthMax ?? 0), 0);
    const totalMin = this.dives.reduce((acc, d) => acc + (d.durationMinutes ?? 0), 0);
    const last = this.dives[0];
    this.stats = [
      { value: String(n), label: 'Total inmersiones' },
      { value: maxDepth ? maxDepth + ' m' : '0 m', label: 'Prof. máxima' },
      { value: totalMin ? totalMin + ' min' : '0 min', label: 'Tiempo total' },
      { value: last?.diveDate ? new Date(last.diveDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : '-', label: 'Último buceo' }
    ];
  }
}
