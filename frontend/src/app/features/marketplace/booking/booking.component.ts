import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarketplaceService, OfferDetail } from '../marketplace.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4 max-w-4xl">

        <a routerLink="/marketplace" class="inline-flex items-center gap-1 text-ocean-600 hover:text-ocean-700 mb-6">
          <i class="bi bi-arrow-left"></i> Volver al marketplace
        </a>

        <!-- Loading -->
        @if (loading) {
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-6">
              <div class="card-ocean overflow-hidden animate-pulse">
                <div class="h-56 bg-gray-200"></div>
                <div class="p-6 space-y-3">
                  <div class="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-4 bg-gray-100 rounded w-1/2"></div>
                </div>
              </div>
              <div class="card-ocean p-6 animate-pulse space-y-4">
                <div class="h-5 bg-gray-200 rounded w-1/3"></div>
                <div class="h-12 bg-gray-100 rounded-lg"></div>
                <div class="h-12 bg-gray-100 rounded-lg"></div>
                <div class="h-24 bg-gray-100 rounded-lg"></div>
              </div>
            </div>
            <div class="card-ocean p-6 animate-pulse space-y-4">
              <div class="h-5 bg-gray-200 rounded w-1/2"></div>
              <div class="h-4 bg-gray-100 rounded"></div>
              <div class="h-4 bg-gray-100 rounded"></div>
              <div class="h-10 bg-gray-200 rounded-lg mt-4"></div>
            </div>
          </div>
        }

        <!-- Error -->
        @if (error && !loading) {
          <div class="text-center py-20">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="bi bi-exclamation-triangle text-2xl text-red-500"></i>
            </div>
            <h2 class="text-xl font-semibold text-gray-800 mb-2">Oferta no encontrada</h2>
            <p class="text-gray-500 mb-6">No pudimos cargar los detalles de esta oferta.</p>
            <a routerLink="/marketplace" class="btn-ocean px-6 py-2">Volver al marketplace</a>
          </div>
        }

        <!-- Confirmed -->
        @if (confirmed) {
          <div class="text-center py-20">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="bi bi-check-circle-fill text-4xl text-green-500"></i>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">¡Reserva confirmada!</h2>
            <p class="text-gray-600 mb-2">Tu reserva para <strong>{{ offer?.title }}</strong> ha sido registrada.</p>
            <p class="text-gray-500 mb-8">Te esperamos el <strong>{{ form.value.date }}</strong> con {{ form.value.participants }} participante{{ form.value.participants > 1 ? 's' : '' }}.</p>
            <div class="flex gap-4 justify-center">
              <a routerLink="/marketplace" class="btn-ocean px-6 py-2">Explorar más</a>
              <a routerLink="/logbook" class="border border-ocean-600 text-ocean-600 hover:bg-ocean-50 px-6 py-2 rounded-lg transition-colors">Mi logbook</a>
            </div>
          </div>
        }

        <!-- Main content -->
        @if (!loading && !error && !confirmed && offer) {
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <!-- Left column -->
            <div class="lg:col-span-2 space-y-6">

              <!-- Offer card -->
              <div class="card-ocean overflow-hidden">
                <div class="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    [src]="offer.imageUrl"
                    [alt]="offer.title"
                    class="absolute inset-0 w-full h-full object-cover"
                    (error)="onImgError($event)"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <span class="absolute top-3 left-3 text-xs bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                    {{ offer.category }}
                  </span>
                  <div class="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1">
                    <i class="bi bi-star-fill text-yellow-400 text-xs"></i>
                    <span class="text-white text-xs font-semibold">{{ offer.rating }}</span>
                    <span class="text-white/70 text-xs">({{ offer.reviewCount }})</span>
                  </div>
                </div>
                <div class="p-6">
                  <h1 class="text-xl font-bold text-gray-800 mb-2">{{ offer.title }}</h1>

                  <div class="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <span class="flex items-center gap-1">
                      <i class="bi bi-geo-alt text-ocean-500"></i>{{ offer.city }}, {{ offer.country }}
                    </span>
                    <span class="flex items-center gap-1">
                      <i class="bi bi-clock text-ocean-500"></i>{{ formatDuration(offer.durationMinutes) }}
                    </span>
                    <span class="flex items-center gap-1">
                      <i class="bi bi-people text-ocean-500"></i>Máx. {{ offer.maxParticipants }} personas
                    </span>
                    <span class="flex items-center gap-1">
                      <i class="bi bi-building text-ocean-500"></i>{{ offer.centerName }}
                      @if (offer.centerVerified) {
                        <i class="bi bi-patch-check-fill text-ocean-500 text-xs"></i>
                      }
                    </span>
                  </div>

                  @if (offer.description) {
                    <p class="text-gray-600 text-sm leading-relaxed mb-4">{{ offer.description }}</p>
                  }

                  @if (offer.tags?.length) {
                    <div class="flex flex-wrap gap-2">
                      @for (tag of offer.tags; track tag) {
                        <span class="text-xs bg-ocean-50 text-ocean-700 px-2 py-1 rounded-full border border-ocean-100">{{ tag }}</span>
                      }
                    </div>
                  }
                </div>
              </div>

              <!-- Booking form -->
              <div class="card-ocean p-6">
                <h2 class="text-xl font-bold text-gray-800 mb-6">Detalles de la reserva</h2>

                <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-5">

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de la inmersión *</label>
                    <input
                      type="date"
                      formControlName="date"
                      [min]="minDate"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500"
                      [class.border-red-400]="form.get('date')?.invalid && form.get('date')?.touched"
                    />
                    @if (form.get('date')?.invalid && form.get('date')?.touched) {
                      <p class="text-red-500 text-xs mt-1">Selecciona una fecha válida.</p>
                    }
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Número de participantes *</label>
                    <select
                      formControlName="participants"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500"
                      [class.border-red-400]="form.get('participants')?.invalid && form.get('participants')?.touched"
                    >
                      @for (n of participantsOptions; track n) {
                        <option [value]="n">{{ n }} persona{{ n > 1 ? 's' : '' }}</option>
                      }
                    </select>
                    @if (form.get('participants')?.invalid && form.get('participants')?.touched) {
                      <p class="text-red-500 text-xs mt-1">Selecciona el número de participantes.</p>
                    }
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Notas adicionales <span class="text-gray-400 font-normal">(opcional)</span></label>
                    <textarea
                      formControlName="notes"
                      rows="3"
                      placeholder="Alergias, nivel de experiencia, necesidades especiales..."
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 resize-none"
                    ></textarea>
                  </div>

                  @if (submitError) {
                    <div class="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                      {{ submitError }}
                    </div>
                  }

                  <button
                    type="submit"
                    class="w-full btn-ocean py-3 font-semibold"
                    [disabled]="form.invalid || submitting"
                  >
                    @if (submitting) {
                      <span class="flex items-center justify-center gap-2">
                        <span class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                        Procesando...
                      </span>
                    } @else {
                      Confirmar reserva
                    }
                  </button>
                </form>
              </div>
            </div>

            <!-- Sidebar summary -->
            <div>
              <div class="card-ocean p-6 sticky top-24">
                <h3 class="text-lg font-semibold text-gray-800 mb-5">Resumen del pedido</h3>

                <div class="space-y-3 mb-5">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Precio por persona</span>
                    <span class="font-medium">{{ offer.price }} {{ offer.currency }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Participantes</span>
                    <span class="font-medium">× {{ form.value.participants || 1 }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Subtotal</span>
                    <span class="font-medium">{{ subtotal | number:'1.2-2' }} {{ offer.currency }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Tasas (5%)</span>
                    <span class="font-medium">{{ fees | number:'1.2-2' }} {{ offer.currency }}</span>
                  </div>
                  <hr class="border-gray-200" />
                  <div class="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span class="text-ocean-600">{{ total | number:'1.2-2' }} {{ offer.currency }}</span>
                  </div>
                </div>

                <div class="bg-ocean-50 rounded-lg p-3 space-y-2 text-xs text-gray-600 mb-5">
                  <div class="flex items-center gap-2">
                    <i class="bi bi-shield-check text-ocean-600"></i>
                    <span>Reserva garantizada</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="bi bi-arrow-counterclockwise text-ocean-600"></i>
                    <span>Cancelación gratuita hasta 48h antes</span>
                  </div>
                  @if (offer.centerVerified) {
                    <div class="flex items-center gap-2">
                      <i class="bi bi-patch-check-fill text-ocean-600"></i>
                      <span>Centro verificado por SubMerso</span>
                    </div>
                  }
                </div>

                @if (form.value.date) {
                  <div class="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 mb-5">
                    <p class="font-medium text-gray-800 mb-1">Fecha seleccionada</p>
                    <p>{{ form.value.date }}</p>
                  </div>
                }

                <p class="text-xs text-gray-400 text-center">
                  Al confirmar aceptas los <a href="#" class="text-ocean-600 hover:underline">términos y condiciones</a> de SubMerso.
                </p>
              </div>
            </div>

          </div>
        }
      </div>
    </div>
  `
})
export class BookingComponent implements OnInit {

  offer: OfferDetail | null = null;
  loading = true;
  error = false;
  confirmed = false;
  submitting = false;
  submitError = '';

  form: FormGroup;
  minDate = new Date().toISOString().split('T')[0];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private marketplaceService: MarketplaceService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      participants: [1, [Validators.required, Validators.min(1)]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = true;
      this.loading = false;
      return;
    }
    this.marketplaceService.getOfferById(id).subscribe({
      next: (offer) => {
        this.offer = offer;
        this.loading = false;
        this.form.get('participants')?.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(offer.maxParticipants)
        ]);
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  get participantsOptions(): number[] {
    const max = this.offer?.maxParticipants ?? 10;
    return Array.from({ length: max }, (_, i) => i + 1);
  }

  get subtotal(): number {
    return (this.offer?.price ?? 0) * (this.form.value.participants || 1);
  }

  get fees(): number {
    return Math.round(this.subtotal * 0.05 * 100) / 100;
  }

  get total(): number {
    return Math.round((this.subtotal + this.fees) * 100) / 100;
  }

  submit(): void {
    if (this.form.invalid || !this.offer) return;

    this.submitting = true;
    this.submitError = '';

    const { date, participants, notes } = this.form.value;

    this.marketplaceService.createBooking({
      offerId: this.offer.id,
      offerTitle: this.offer.title,
      date,
      participants,
      totalPrice: this.total,
      notes: notes || undefined
    }).subscribe({
      next: () => {
        this.submitting = false;
        this.confirmed = true;
      },
      error: () => {
        this.submitting = false;
        this.submitError = 'No se pudo completar la reserva. Inténtalo de nuevo.';
      }
    });
  }

  formatDuration(minutes: number): string {
    if (!minutes) return '';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? (m > 0 ? `${h}h ${m}min` : `${h}h`) : `${m}min`;
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src = 'imgs/Experiencia1.jpg';
  }
}
