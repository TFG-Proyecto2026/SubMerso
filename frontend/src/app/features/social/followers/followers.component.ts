import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4 max-w-2xl">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">Seguidores</h1>
        
        <!-- Tabs -->
        <div class="flex border-b border-gray-200 mb-6">
          <button class="px-6 py-3 font-medium text-ocean-600 border-b-2 border-ocean-500">
            Seguidores
          </button>
          <button class="px-6 py-3 font-medium text-gray-500 hover:text-gray-700">
            Siguiendo
          </button>
        </div>

        <!-- Followers List Placeholder -->
        @for (i of [1, 2, 3, 4, 5]; track i) {
          <div class="card-ocean p-4 mb-3">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 bg-ocean-100 rounded-full placeholder-shimmer"></div>
              <div class="flex-1">
                <div class="h-4 bg-gray-200 rounded w-32 mb-2 placeholder-shimmer"></div>
                <div class="h-3 bg-gray-100 rounded w-24 placeholder-shimmer"></div>
              </div>
              <div class="h-10 w-24 bg-gray-100 rounded-lg placeholder-shimmer"></div>
            </div>
          </div>
        }

        <!-- Coming Soon Notice -->
        <div class="text-center py-12">
          <div class="w-20 h-20 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="bi bi-people text-4xl text-ocean-600"></i>
          </div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2">Gestión de Seguidores - Próximamente</h2>
          <p class="text-gray-600">
            Aquí podrás ver y gestionar tus seguidores y a quienes sigues.
          </p>
        </div>
      </div>
    </div>
  `
})
export class FollowersComponent {}
