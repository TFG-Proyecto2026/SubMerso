import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recommendation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="text-center mb-12">
          <div class="w-20 h-20 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="bi bi-stars text-4xl text-ocean-600"></i>
          </div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Recomendaciones Personalizadas</h1>
          <p class="text-gray-600 max-w-xl mx-auto">
            Basándonos en tu experiencia y preferencias, DeepBlue ha seleccionado estas experiencias para ti
          </p>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-3 justify-center mb-8">
          @for (filter of filters; track filter.name) {
            <button 
              class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              [ngClass]="filter.active 
                ? 'bg-ocean-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-ocean-50 border border-gray-200'">
              <i class="bi {{ filter.icon }} me-1"></i>{{ filter.name }}
            </button>
          }
        </div>

        <!-- Recommendations Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          @for (i of [1, 2, 3, 4, 5, 6]; track i) {
            <div class="card-ocean overflow-hidden hover:shadow-xl transition-all diving-card">
              <!-- Match Badge -->
              <div class="relative">
                <div class="h-48 bg-gray-200 placeholder-shimmer"></div>
                <div class="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <i class="bi bi-hand-thumbs-up me-1"></i>95% match
                </div>
              </div>
              
              <div class="p-6">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <div class="h-5 bg-gray-200 rounded w-40 mb-2 placeholder-shimmer"></div>
                    <div class="h-4 bg-gray-100 rounded w-28 placeholder-shimmer"></div>
                  </div>
                  <div class="flex items-center text-yellow-500">
                    <i class="bi bi-star-fill"></i>
                    <span class="text-gray-700 ml-1 font-medium">4.8</span>
                  </div>
                </div>

                <div class="flex flex-wrap gap-2 mb-4">
                  <span class="px-2 py-1 bg-ocean-50 text-ocean-700 rounded text-xs">Principiantes</span>
                  <span class="px-2 py-1 bg-ocean-50 text-ocean-700 rounded text-xs">Costa</span>
                </div>

                <div class="h-4 bg-gray-100 rounded w-full mb-2 placeholder-shimmer"></div>
                <div class="h-4 bg-gray-100 rounded w-3/4 mb-4 placeholder-shimmer"></div>

                <div class="flex justify-between items-center pt-4 border-t">
                  <div class="h-6 bg-gray-200 rounded w-20 placeholder-shimmer"></div>
                  <button class="btn-ocean text-sm py-2">Ver más</button>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Why These -->
        <div class="card-ocean p-8 mb-8">
          <h2 class="text-xl font-bold text-gray-800 mb-6 text-center">
            <i class="bi bi-lightbulb text-ocean-500 me-2"></i>
            ¿Por qué estas recomendaciones?
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="w-14 h-14 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i class="bi bi-person-badge text-2xl text-ocean-600"></i>
              </div>
              <h3 class="font-semibold text-gray-800 mb-1">Tu nivel</h3>
              <p class="text-gray-600 text-sm">Experiencias adaptadas a tu certificación y experiencia</p>
            </div>
            <div class="text-center">
              <div class="w-14 h-14 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i class="bi bi-geo-alt text-2xl text-ocean-600"></i>
              </div>
              <h3 class="font-semibold text-gray-800 mb-1">Tu ubicación</h3>
              <p class="text-gray-600 text-sm">Destinos accesibles desde donde te encuentras</p>
            </div>
            <div class="text-center">
              <div class="w-14 h-14 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i class="bi bi-heart text-2xl text-ocean-600"></i>
              </div>
              <h3 class="font-semibold text-gray-800 mb-1">Tus gustos</h3>
              <p class="text-gray-600 text-sm">Basado en tus inmersiones anteriores y preferencias</p>
            </div>
          </div>
        </div>

        <!-- Coming Soon Notice -->
        <div class="text-center py-8">
          <div class="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="bi bi-magic text-3xl text-ocean-600"></i>
          </div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2">Recomendaciones IA - Próximamente</h2>
          <p class="text-gray-600 max-w-md mx-auto mb-6">
            DeepBlue analizará tu perfil para ofrecerte las mejores experiencias de buceo personalizadas.
          </p>
          <a routerLink="/deepblue" class="btn-ocean">
            <i class="bi bi-chat-dots me-2"></i>Chatear con DeepBlue
          </a>
        </div>
      </div>
    </div>
  `
})
export class RecommendationComponent {
  filters = [
    { name: 'Todos', icon: 'bi-grid', active: true },
    { name: 'Destinos', icon: 'bi-geo-alt', active: false },
    { name: 'Centros', icon: 'bi-shop', active: false },
    { name: 'Experiencias', icon: 'bi-water', active: false },
    { name: 'Cursos', icon: 'bi-mortarboard', active: false }
  ];
}
