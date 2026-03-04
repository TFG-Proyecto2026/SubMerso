import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { DiveService, Dive } from '../../../core/services/dive.service';

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

        @if (cargando) {
          <div class="card-ocean p-12 text-center">
            <i class="bi bi-arrow-repeat animate-spin text-4xl text-ocean-500 mb-3 block"></i>
            <p class="text-gray-600">Cargando inmersión...</p>
          </div>
        } @else if (!dive) {
          <div class="card-ocean p-8 text-center text-gray-500">
            <p>No se encontró la inmersión.</p>
            <a routerLink="/logbook" class="text-ocean-600 hover:underline mt-2 inline-block">Volver al logbook</a>
          </div>
        } @else {
          <div class="card-ocean overflow-hidden mb-6">
            <div class="h-32 bg-gradient-to-br from-ocean-100 to-ocean-200 flex items-center justify-center">
              <span class="text-6xl" aria-hidden="true">🤿</span>
            </div>
            <div class="p-6">
              <div class="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <i class="bi bi-geo-alt text-ocean-500"></i>{{ dive.location || 'Sin ubicación' }}
                  </h1>
                  <p class="text-gray-500 mt-1">
                    <i class="bi bi-calendar3 me-1"></i>{{ dive.diveDate | date:'dd/MM/yyyy' }}
                    @if (dive.diveNumber) { <span class="ms-2">· Inmersión #{{ dive.diveNumber }}</span> }
                  </p>
                </div>
                @if (dive.verified) {
                  <span class="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium inline-flex items-center gap-1">
                    <i class="bi bi-patch-check-fill"></i> Verificada
                  </span>
                }
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 space-y-6">
              <div class="card-ocean p-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-4">Datos de la inmersión</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div class="text-center">
                    <div class="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i class="bi bi-arrow-down-circle text-ocean-600"></i>
                    </div>
                    <div class="font-semibold text-gray-800">{{ dive.depthMax ?? '-' }} m</div>
                    <div class="text-xs text-gray-500">Profundidad máx.</div>
                  </div>
                  <div class="text-center">
                    <div class="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i class="bi bi-clock text-ocean-600"></i>
                    </div>
                    <div class="font-semibold text-gray-800">{{ dive.durationMinutes ?? '-' }} min</div>
                    <div class="text-xs text-gray-500">Duración</div>
                  </div>
                  <div class="text-center">
                    <div class="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i class="bi bi-thermometer-half text-ocean-600"></i>
                    </div>
                    <div class="font-semibold text-gray-800">{{ dive.tempBottom ?? dive.tempSurface ?? '-' }} °C</div>
                    <div class="text-xs text-gray-500">Temp. fondo</div>
                  </div>
                  <div class="text-center">
                    <div class="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i class="bi bi-brightness-high text-ocean-600"></i>
                    </div>
                    <div class="font-semibold text-gray-800">{{ dive.visibility ?? '-' }}{{ dive.visibilityUnit ?? '' }}</div>
                    <div class="text-xs text-gray-500">Visibilidad</div>
                  </div>
                </div>
                @if (dive.pressureStart != null || dive.pressureEnd != null) {
                  <div class="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                    <div><span class="text-gray-500 text-sm">Presión inicio:</span> <span class="font-medium">{{ dive.pressureStart ?? '-' }}</span></div>
                    <div><span class="text-gray-500 text-sm">Presión fin:</span> <span class="font-medium">{{ dive.pressureEnd ?? '-' }}</span></div>
                  </div>
                }
              </div>

              @if (dive.exposureProtection?.length || dive.conditions?.length) {
                <div class="card-ocean p-6">
                  <h2 class="text-lg font-semibold text-gray-800 mb-4">Protección y condiciones</h2>
                  @if (dive.exposureProtection?.length) {
                    <p class="text-sm text-gray-500 mb-1">Protección térmica</p>
                    <div class="flex flex-wrap gap-2 mb-3">
                      @for (p of dive.exposureProtection; track p) {
                        <span class="px-2 py-1 bg-ocean-50 text-ocean-700 rounded text-sm">{{ p }}</span>
                      }
                    </div>
                  }
                  @if (dive.conditions?.length) {
                    <p class="text-sm text-gray-500 mb-1">Condiciones</p>
                    <div class="flex flex-wrap gap-2">
                      @for (c of dive.conditions; track c) {
                        <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">{{ c }}</span>
                      }
                    </div>
                  }
                </div>
              }

              @if (dive.comments) {
                <div class="card-ocean p-6">
                  <h2 class="text-lg font-semibold text-gray-800 mb-4">Comentarios</h2>
                  <p class="text-gray-600 whitespace-pre-wrap">{{ dive.comments }}</p>
                </div>
              }
            </div>

            <div class="space-y-6">
              <div class="card-ocean p-6 text-center">
                <div class="w-24 h-24 bg-ocean-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i class="bi bi-qr-code text-4xl text-ocean-500"></i>
                </div>
                <h3 class="font-semibold text-gray-800 mb-1">Código QR</h3>
                <p class="text-sm text-gray-500">Validación del centro</p>
              </div>

              <div class="card-ocean p-6 space-y-3">
                <a [routerLink]="['/logbook/editar', dive.id]" class="w-full btn-ocean py-2.5 inline-flex items-center justify-center gap-2">
                  <i class="bi bi-pencil"></i> Editar
                </a>
                <button type="button" (click)="eliminar()" class="w-full text-red-600 hover:bg-red-50 py-2.5 rounded-lg transition-colors inline-flex items-center justify-center gap-2 border border-red-200">
                  <i class="bi bi-trash"></i> Eliminar
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class DiveDetailComponent implements OnInit {
  dive: Dive | null = null;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private diveService: DiveService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/logbook']);
      return;
    }
    this.diveService.getDive(id).subscribe({
      next: (d) => {
        this.dive = d;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.router.navigate(['/logbook']);
      }
    });
  }

  eliminar(): void {
    if (!this.dive?.id) return;
    if (!window.confirm('¿Eliminar esta inmersión? Esta acción no se puede deshacer.')) return;
    this.diveService.deleteDive(this.dive.id).subscribe({
      next: () => this.router.navigate(['/logbook']),
      error: () => {}
    });
  }
}
