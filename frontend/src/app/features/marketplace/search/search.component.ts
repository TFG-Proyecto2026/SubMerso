import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Search -->
      <div class="gradient-ocean py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl font-bold text-white mb-4">Encuentra tu próxima aventura</h1>
          <p class="text-ocean-100 mb-8">Descubre centros de buceo y experiencias únicas en todo el mundo</p>
          
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-2 flex gap-2">
            <div class="flex-1 relative">
              <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input 
                type="text" 
                placeholder="Buscar destinos, centros o experiencias..."
                class="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none"
              />
            </div>
            <button class="btn-ocean px-8">Buscar</button>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-12">
        <!-- Categories -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Categorías Populares</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            @for (category of categories; track category.name) {
              <div class="card-ocean p-6 text-center hover:shadow-lg transition-all cursor-pointer">
                <div class="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="bi {{ category.icon }} text-2xl text-ocean-600"></i>
                </div>
                <h3 class="font-semibold text-gray-800">{{ category.name }}</h3>
                <p class="text-sm text-gray-500">{{ category.count }} opciones</p>
              </div>
            }
          </div>
        </div>

        <!-- Featured Experiences -->
        <div class="mb-12">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Experiencias Destacadas</h2>
            <a href="#" class="text-ocean-600 hover:text-ocean-700">Ver todas</a>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (i of [1, 2, 3]; track i) {
              <div class="card-ocean overflow-hidden hover:shadow-xl transition-all diving-card">
                <div class="h-48 bg-gray-200 placeholder-shimmer"></div>
                <div class="p-6">
                  <div class="h-5 bg-gray-200 rounded w-3/4 mb-3 placeholder-shimmer"></div>
                  <div class="h-4 bg-gray-100 rounded w-1/2 mb-4 placeholder-shimmer"></div>
                  <div class="flex justify-between items-center">
                    <div class="h-6 bg-gray-200 rounded w-20 placeholder-shimmer"></div>
                    <div class="h-4 bg-gray-100 rounded w-24 placeholder-shimmer"></div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Popular Destinations -->
        <div>
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Destinos Populares</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            @for (dest of destinations; track dest.name) {
              <div class="relative rounded-xl overflow-hidden h-40 group cursor-pointer">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div class="absolute inset-0 bg-ocean-600 opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <h3 class="font-semibold">{{ dest.name }}</h3>
                  <p class="text-sm text-white/80">{{ dest.centers }} centros</p>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Coming Soon Notice -->
        <div class="text-center py-16">
          <div class="w-20 h-20 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="bi bi-shop text-4xl text-ocean-600"></i>
          </div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2">Marketplace - Próximamente</h2>
          <p class="text-gray-600 max-w-md mx-auto">
            Pronto podrás buscar y reservar experiencias de buceo en centros verificados de todo el mundo.
          </p>
        </div>
      </div>
    </div>
  `
})
export class SearchComponent {
  categories = [
    { name: 'Bautismo', icon: 'bi-stars', count: 45 },
    { name: 'Open Water', icon: 'bi-water', count: 120 },
    { name: 'Naufragios', icon: 'bi-tsunami', count: 38 },
    { name: 'Nocturno', icon: 'bi-moon-stars', count: 25 }
  ];

  destinations = [
    { name: 'Islas Canarias', centers: 45 },
    { name: 'Costa Brava', centers: 32 },
    { name: 'Baleares', centers: 28 },
    { name: 'Caribe', centers: 56 }
  ];
}
