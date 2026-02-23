import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4 max-w-4xl">
        <a routerLink="/marketplace" class="text-ocean-600 hover:text-ocean-700 mb-4 inline-block">
          <i class="bi bi-arrow-left me-1"></i>Volver al marketplace
        </a>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <div class="card-ocean overflow-hidden mb-6">
              <div class="h-64 bg-gray-200 placeholder-shimmer"></div>
              <div class="p-6">
                <div class="h-6 bg-gray-200 rounded w-3/4 mb-4 placeholder-shimmer"></div>
                <div class="h-4 bg-gray-100 rounded w-1/2 mb-6 placeholder-shimmer"></div>
                
                <div class="space-y-3">
                  <div class="h-4 bg-gray-100 rounded w-full placeholder-shimmer"></div>
                  <div class="h-4 bg-gray-100 rounded w-full placeholder-shimmer"></div>
                  <div class="h-4 bg-gray-100 rounded w-3/4 placeholder-shimmer"></div>
                </div>
              </div>
            </div>

            <!-- Booking Form Placeholder -->
            <div class="card-ocean p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-6">Detalles de la Reserva</h2>
              <div class="space-y-4">
                <div class="h-12 bg-gray-100 rounded-lg placeholder-shimmer"></div>
                <div class="h-12 bg-gray-100 rounded-lg placeholder-shimmer"></div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="h-12 bg-gray-100 rounded-lg placeholder-shimmer"></div>
                  <div class="h-12 bg-gray-100 rounded-lg placeholder-shimmer"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div>
            <div class="card-ocean p-6 sticky top-24">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Resumen</h3>
              <div class="space-y-3 mb-6">
                <div class="flex justify-between">
                  <span class="text-gray-600">Precio base</span>
                  <span class="placeholder-shimmer h-4 w-16 rounded"></span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Tasas</span>
                  <span class="placeholder-shimmer h-4 w-12 rounded"></span>
                </div>
                <hr>
                <div class="flex justify-between font-semibold">
                  <span>Total</span>
                  <span class="placeholder-shimmer h-5 w-20 rounded"></span>
                </div>
              </div>
              <button class="w-full btn-ocean py-3" disabled>
                Continuar al Pago
              </button>
            </div>
          </div>
        </div>

        <!-- Coming Soon Notice -->
        <div class="text-center py-12 mt-8">
          <div class="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="bi bi-calendar-check text-3xl text-ocean-600"></i>
          </div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2">Sistema de Reservas - Próximamente</h2>
          <p class="text-gray-600">La funcionalidad de reservas estará disponible pronto.</p>
        </div>
      </div>
    </div>
  `
})
export class BookingComponent {}
