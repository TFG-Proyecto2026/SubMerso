import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4 max-w-2xl">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">Pago Seguro</h1>

        <!-- Progress Steps -->
        <div class="flex items-center justify-center mb-8">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-ocean-500 text-white rounded-full flex items-center justify-center">
              <i class="bi bi-check"></i>
            </div>
            <div class="w-20 h-1 bg-ocean-500"></div>
            <div class="w-10 h-10 bg-ocean-500 text-white rounded-full flex items-center justify-center">
              <i class="bi bi-check"></i>
            </div>
            <div class="w-20 h-1 bg-gray-200"></div>
            <div class="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
              3
            </div>
          </div>
        </div>

        <div class="card-ocean p-8">
          <!-- Payment Methods -->
          <h2 class="text-xl font-semibold text-gray-800 mb-6">Método de Pago</h2>
          
          <div class="space-y-3 mb-8">
            <div class="border-2 border-ocean-500 rounded-lg p-4 cursor-pointer bg-ocean-50">
              <div class="flex items-center gap-3">
                <input type="radio" checked class="w-5 h-5 text-ocean-500">
                <i class="bi bi-credit-card text-xl text-ocean-600"></i>
                <span class="font-medium">Tarjeta de Crédito/Débito</span>
              </div>
            </div>
            <div class="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-ocean-300">
              <div class="flex items-center gap-3">
                <input type="radio" class="w-5 h-5">
                <i class="bi bi-paypal text-xl text-blue-600"></i>
                <span class="font-medium">PayPal</span>
              </div>
            </div>
          </div>

          <!-- Card Form Placeholder -->
          <div class="space-y-4 mb-8">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Número de tarjeta</label>
              <div class="h-12 bg-gray-100 rounded-lg placeholder-shimmer"></div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Fecha de expiración</label>
                <div class="h-12 bg-gray-100 rounded-lg placeholder-shimmer"></div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                <div class="h-12 bg-gray-100 rounded-lg placeholder-shimmer"></div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre en la tarjeta</label>
              <div class="h-12 bg-gray-100 rounded-lg placeholder-shimmer"></div>
            </div>
          </div>

          <!-- Security Notice -->
          <div class="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <i class="bi bi-shield-check text-green-500"></i>
            <span>Tus datos están protegidos con encriptación SSL</span>
          </div>

          <button class="w-full btn-ocean py-3 text-lg" disabled>
            <i class="bi bi-lock me-2"></i>Pagar €0.00
          </button>
        </div>

        <!-- Coming Soon Notice -->
        <div class="text-center py-8">
          <p class="text-gray-500">
            <i class="bi bi-info-circle me-1"></i>
            Sistema de pagos en desarrollo
          </p>
        </div>
      </div>
    </div>
  `
})
export class PaymentComponent {}
