import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4 max-w-3xl">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">Feed de la Comunidad</h1>
        
        <!-- Create Post Placeholder -->
        <div class="card-ocean p-6 mb-6">
          <div class="flex gap-4">
            <div class="w-12 h-12 bg-ocean-100 rounded-full"></div>
            <div class="flex-1">
              <div class="h-12 bg-gray-100 rounded-lg"></div>
            </div>
          </div>
        </div>

        <!-- Feed Posts Placeholder -->
        @for (i of [1, 2, 3]; track i) {
          <div class="card-ocean p-6 mb-4">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 bg-ocean-100 rounded-full placeholder-shimmer"></div>
              <div class="flex-1">
                <div class="h-4 bg-gray-200 rounded w-32 mb-2 placeholder-shimmer"></div>
                <div class="h-3 bg-gray-100 rounded w-24 placeholder-shimmer"></div>
              </div>
            </div>
            <div class="h-4 bg-gray-100 rounded w-full mb-2 placeholder-shimmer"></div>
            <div class="h-4 bg-gray-100 rounded w-3/4 mb-4 placeholder-shimmer"></div>
            <div class="h-48 bg-gray-100 rounded-lg mb-4 placeholder-shimmer"></div>
            <div class="flex gap-4 pt-4 border-t">
              <div class="h-8 w-20 bg-gray-100 rounded placeholder-shimmer"></div>
              <div class="h-8 w-20 bg-gray-100 rounded placeholder-shimmer"></div>
              <div class="h-8 w-20 bg-gray-100 rounded placeholder-shimmer"></div>
            </div>
          </div>
        }

        <!-- Coming Soon Notice -->
        <div class="text-center py-12">
          <div class="w-20 h-20 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="bi bi-newspaper text-4xl text-ocean-600"></i>
          </div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2">Feed Social - Próximamente</h2>
          <p class="text-gray-600 mb-6">
            Aquí podrás ver publicaciones de otros buceadores, compartir tus experiencias 
            y conectar con la comunidad.
          </p>
          <a routerLink="/marketplace" class="btn-ocean">
            <i class="bi bi-compass me-2"></i>Explorar Marketplace
          </a>
        </div>
      </div>
    </div>
  `
})
export class FeedComponent {}
