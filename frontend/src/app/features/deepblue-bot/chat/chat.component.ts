import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="container mx-auto px-4 py-8 max-w-4xl">
        <div class="card-ocean overflow-hidden" style="height: calc(100vh - 200px); min-height: 500px;">
          <!-- Chat Header -->
          <div class="gradient-ocean p-4 flex items-center gap-4">
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <i class="bi bi-robot text-2xl text-white"></i>
            </div>
            <div class="text-white">
              <h1 class="font-bold text-lg">DeepBlue</h1>
              <p class="text-ocean-100 text-sm">Tu asistente de buceo con IA</p>
            </div>
            <div class="ml-auto">
              <span class="inline-flex items-center px-3 py-1 bg-green-400/20 text-green-100 rounded-full text-sm">
                <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                En línea
              </span>
            </div>
          </div>

          <!-- Chat Messages -->
          <div class="flex-1 overflow-y-auto p-4 space-y-4" style="height: calc(100% - 140px);">
            <!-- Welcome Message -->
            <div class="flex gap-3">
              <div class="w-10 h-10 bg-ocean-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="bi bi-robot text-ocean-600"></i>
              </div>
              <div class="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                <p class="text-gray-800">
                  ¡Hola! Soy <strong>DeepBlue</strong>, tu asistente personal de buceo. 
                  Estoy aquí para ayudarte con:
                </p>
                <ul class="mt-3 space-y-2">
                  <li class="flex items-center gap-2 text-gray-700">
                    <i class="bi bi-geo-alt text-ocean-500"></i>
                    Recomendaciones de destinos
                  </li>
                  <li class="flex items-center gap-2 text-gray-700">
                    <i class="bi bi-shop text-ocean-500"></i>
                    Buscar centros de buceo
                  </li>
                  <li class="flex items-center gap-2 text-gray-700">
                    <i class="bi bi-question-circle text-ocean-500"></i>
                    Responder tus dudas sobre buceo
                  </li>
                  <li class="flex items-center gap-2 text-gray-700">
                    <i class="bi bi-lightbulb text-ocean-500"></i>
                    Consejos personalizados
                  </li>
                </ul>
                <p class="mt-3 text-gray-600">
                  ¿En qué puedo ayudarte hoy?
                </p>
              </div>
            </div>

            <!-- Sample Suggestions -->
            <div class="flex flex-wrap gap-2 ml-13">
              @for (suggestion of suggestions; track suggestion) {
                <button class="px-4 py-2 bg-ocean-50 text-ocean-700 rounded-full text-sm 
                               hover:bg-ocean-100 transition-colors border border-ocean-200">
                  {{ suggestion }}
                </button>
              }
            </div>

            <!-- Placeholder messages -->
            <div class="flex gap-3 justify-end">
              <div class="bg-ocean-500 text-white rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                <p>¿Cuáles son los mejores sitios para bucear en España?</p>
              </div>
            </div>

            <div class="flex gap-3">
              <div class="w-10 h-10 bg-ocean-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="bi bi-robot text-ocean-600"></i>
              </div>
              <div class="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                <div class="flex items-center gap-2 text-gray-500">
                  <div class="flex gap-1">
                    <span class="w-2 h-2 bg-ocean-500 rounded-full animate-bounce" style="animation-delay: 0ms;"></span>
                    <span class="w-2 h-2 bg-ocean-500 rounded-full animate-bounce" style="animation-delay: 150ms;"></span>
                    <span class="w-2 h-2 bg-ocean-500 rounded-full animate-bounce" style="animation-delay: 300ms;"></span>
                  </div>
                  <span class="text-sm">DeepBlue está escribiendo...</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Chat Input -->
          <div class="border-t border-gray-200 p-4">
            <div class="flex gap-3">
              <input 
                type="text"
                [(ngModel)]="message"
                placeholder="Escribe tu mensaje..."
                class="input-ocean flex-1"
                disabled
              />
              <button class="btn-ocean px-6" disabled>
                <i class="bi bi-send"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Coming Soon Notice -->
        <div class="text-center py-6">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-800 rounded-full text-sm">
            <i class="bi bi-exclamation-triangle"></i>
            DeepBlue está en desarrollo - Próximamente disponible
          </div>
        </div>
      </div>
    </div>
  `
})
export class ChatComponent {
  message = '';
  
  suggestions = [
    '🌊 Mejores sitios en España',
    '🎓 Cursos recomendados',
    '🏊 Consejos para principiantes',
    '🐠 Vida marina mediterránea'
  ];
}
