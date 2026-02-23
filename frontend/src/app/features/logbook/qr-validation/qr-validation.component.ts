import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-qr-validation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4 max-w-md">
        <div class="card-ocean p-8 text-center">
          <!-- Scan Icon -->
          <div class="w-24 h-24 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="bi bi-qr-code-scan text-5xl text-ocean-600"></i>
          </div>

          <h1 class="text-2xl font-bold text-gray-800 mb-2">Validación QR</h1>
          <p class="text-gray-600 mb-8">
            Escanea el código QR proporcionado por el centro de buceo para validar tu inmersión
          </p>

          <!-- QR Scanner Placeholder -->
          <div class="bg-gray-100 rounded-xl p-8 mb-6">
            <div class="w-48 h-48 mx-auto border-4 border-dashed border-ocean-300 rounded-lg 
                        flex items-center justify-center">
              <div class="text-center">
                <i class="bi bi-camera text-4xl text-gray-400 mb-2"></i>
                <p class="text-sm text-gray-500">Área de escaneo</p>
              </div>
            </div>
          </div>

          <button class="btn-ocean w-full py-3 mb-4" disabled>
            <i class="bi bi-camera me-2"></i>Iniciar Escáner
          </button>

          <p class="text-sm text-gray-500 mb-6">
            O introduce el código manualmente:
          </p>

          <div class="flex gap-2 mb-6">
            <input 
              type="text" 
              placeholder="Código de validación"
              class="input-ocean flex-1"
            />
            <button class="btn-ocean-outline px-6" disabled>Validar</button>
          </div>

          <!-- Info -->
          <div class="bg-ocean-50 rounded-lg p-4 text-left">
            <h3 class="font-semibold text-ocean-800 mb-2">
              <i class="bi bi-info-circle me-1"></i>¿Cómo funciona?
            </h3>
            <ol class="text-sm text-ocean-700 space-y-1 list-decimal list-inside">
              <li>El centro de buceo genera un código QR único</li>
              <li>Escanea el código con tu dispositivo</li>
              <li>Tu inmersión queda validada oficialmente</li>
            </ol>
          </div>
        </div>

        <!-- Coming Soon Notice -->
        <div class="text-center py-8">
          <div class="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="bi bi-patch-check text-3xl text-ocean-600"></i>
          </div>
          <h2 class="text-lg font-semibold text-gray-800 mb-2">Validación QR - Próximamente</h2>
          <p class="text-gray-600 text-sm">
            Sistema de validación de inmersiones por centros certificados en desarrollo.
          </p>
        </div>
      </div>
    </div>
  `
})
export class QrValidationComponent {}
