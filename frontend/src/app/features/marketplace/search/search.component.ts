import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { RouterModule }                 from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { HttpClientModule }             from '@angular/common/http';
import { ActivatedRoute, Router }       from '@angular/router';
import { Subject }                      from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';

import { MarketplaceService, OfferSummary, OfferFilters, PagedResponse } from '../marketplace.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  template: `
    <div class="min-h-screen bg-gray-50">

      <!-- ─── Hero Search ─── -->
      <div class="gradient-ocean py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl font-bold text-white mb-4">Encuentra tu próxima aventura</h1>
          <p class="text-ocean-100 mb-8">Descubre centros de buceo y experiencias únicas en todo el mundo</p>

          <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-2 flex gap-2">
            <div class="flex-1 relative">
              <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                [formControl]="searchControl"
                placeholder="Buscar destinos, centros o experiencias..."
                class="w-full pl-12 pr-10 py-3 rounded-lg focus:outline-none"
              />
              @if (searchControl.value) {
                <button
                  (click)="clearSearch()"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i class="bi bi-x-lg text-sm"></i>
                </button>
              }
            </div>
            <button class="btn-ocean px-8" (click)="triggerSearch()">Buscar</button>
          </div>
        </div>
      </div>

      <!-- ─── RESULTS VIEW ─── -->
      @if (showResults) {
        <div class="container mx-auto px-4 py-8">

          <!-- Filter bar -->
          <div class="flex flex-wrap items-center gap-3 mb-6">

            <!-- Category chips -->
            @for (cat of categories; track cat.name) {
              <button
                (click)="toggleCategory(cat.name)"
                class="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-all"
                [class]="activeCategory === cat.name
                  ? 'bg-ocean-600 text-white border-ocean-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-ocean-400'"
              >
                <span>{{ cat.emoji }}</span>
                <span>{{ cat.name }}</span>
              </button>
            }

            <!-- Max Price -->
            <div class="relative">
              <select
                [(ngModel)]="activeMaxPrice"
                (ngModelChange)="onFilterChange()"
                class="pl-3 pr-8 py-1.5 rounded-full text-sm border border-gray-200 bg-white text-gray-600 focus:outline-none focus:border-ocean-400 appearance-none cursor-pointer"
              >
                <option [ngValue]="null">Precio: cualquiera</option>
                <option [ngValue]="50">Hasta 50 €</option>
                <option [ngValue]="100">Hasta 100 €</option>
                <option [ngValue]="200">Hasta 200 €</option>
                <option [ngValue]="500">Hasta 500 €</option>
              </select>
              <i class="bi bi-chevron-down absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none"></i>
            </div>

            <!-- Min Rating -->
            <div class="relative">
              <select
                [(ngModel)]="activeMinRating"
                (ngModelChange)="onFilterChange()"
                class="pl-3 pr-8 py-1.5 rounded-full text-sm border border-gray-200 bg-white text-gray-600 focus:outline-none focus:border-ocean-400 appearance-none cursor-pointer"
              >
                <option [ngValue]="null">Valoración: todas</option>
                <option [ngValue]="3">★★★ 3+</option>
                <option [ngValue]="4">★★★★ 4+</option>
                <option [ngValue]="4.5">★★★★½ 4.5+</option>
              </select>
              <i class="bi bi-chevron-down absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none"></i>
            </div>

            <!-- Verified toggle -->
            <label class="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white cursor-pointer text-sm text-gray-600 hover:border-ocean-400 select-none">
              <input
                type="checkbox"
                [(ngModel)]="verifiedOnly"
                (ngModelChange)="onFilterChange()"
                class="accent-ocean-600"
              />
              <i class="bi bi-patch-check-fill text-ocean-500 text-xs"></i>
              Verificados
            </label>

            <!-- Sort -->
            <div class="relative ml-auto">
              <select
                [(ngModel)]="currentSort"
                (ngModelChange)="onFilterChange()"
                class="pl-3 pr-8 py-1.5 rounded-full text-sm border border-gray-200 bg-white text-gray-600 focus:outline-none focus:border-ocean-400 appearance-none cursor-pointer"
              >
                <option value="newest">Más recientes</option>
                <option value="rating">Mejor valorados</option>
                <option value="price_asc">Precio: menor a mayor</option>
                <option value="price_desc">Precio: mayor a menor</option>
              </select>
              <i class="bi bi-chevron-down absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none"></i>
            </div>
          </div>

          <!-- Active filter chips -->
          @if (hasActiveFilters) {
            <div class="flex flex-wrap items-center gap-2 mb-5">
              @if (searchControl.value?.trim()) {
                <span class="chip-active">
                  "{{ searchControl.value }}"
                  <button (click)="clearSearch()" class="ml-1 hover:text-white/80"><i class="bi bi-x"></i></button>
                </span>
              }
              @if (activeCategory) {
                <span class="chip-active">
                  {{ activeCategory }}
                  <button (click)="toggleCategory(activeCategory)" class="ml-1 hover:text-white/80"><i class="bi bi-x"></i></button>
                </span>
              }
              @if (activeMaxPrice) {
                <span class="chip-active">
                  Hasta {{ activeMaxPrice }} €
                  <button (click)="activeMaxPrice = null; onFilterChange()" class="ml-1 hover:text-white/80"><i class="bi bi-x"></i></button>
                </span>
              }
              @if (activeMinRating) {
                <span class="chip-active">
                  ★ {{ activeMinRating }}+
                  <button (click)="activeMinRating = null; onFilterChange()" class="ml-1 hover:text-white/80"><i class="bi bi-x"></i></button>
                </span>
              }
              @if (verifiedOnly) {
                <span class="chip-active">
                  Verificados
                  <button (click)="verifiedOnly = false; onFilterChange()" class="ml-1 hover:text-white/80"><i class="bi bi-x"></i></button>
                </span>
              }
              <button (click)="clearAllFilters()" class="text-xs text-gray-400 hover:text-gray-600 underline ml-1">
                Limpiar todo
              </button>
            </div>
          }

          <!-- Result count -->
          @if (!loading && !error) {
            <p class="text-sm text-gray-500 mb-6">
              {{ totalElements }} resultado{{ totalElements !== 1 ? 's' : '' }} encontrado{{ totalElements !== 1 ? 's' : '' }}
            </p>
          }

          <!-- Loading skeleton -->
          @if (loading) {
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              @for (s of [1,2,3,4,5,6]; track s) {
                <div class="card-ocean overflow-hidden animate-pulse">
                  <div class="h-48 bg-gray-200"></div>
                  <div class="p-5 space-y-3">
                    <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div class="h-3 bg-gray-100 rounded w-1/2"></div>
                    <div class="h-3 bg-gray-100 rounded w-1/3"></div>
                  </div>
                </div>
              }
            </div>
          }

          <!-- Error state -->
          @if (error && !loading) {
            <div class="text-center py-16">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="bi bi-wifi-off text-2xl text-red-500"></i>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Error al cargar ofertas</h3>
              <p class="text-gray-500 mb-4">Comprueba tu conexión e inténtalo de nuevo.</p>
              <button (click)="loadOffers()" class="btn-ocean px-6 py-2">Reintentar</button>
            </div>
          }

          <!-- Results grid -->
          @if (!loading && !error) {
            @if (results.length === 0) {
              <!-- Empty state -->
              <div class="text-center py-16">
                <div class="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="bi bi-search text-2xl text-ocean-600"></i>
                </div>
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Sin resultados</h3>
                <p class="text-gray-500 mb-4">Prueba con otros términos o amplía los filtros.</p>
                <button (click)="clearAllFilters()" class="btn-ocean px-6 py-2">Ver todas las ofertas</button>
              </div>
            } @else {
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                @for (offer of results; track offer.id) {
                  <div class="card-ocean overflow-hidden hover:shadow-xl transition-all cursor-pointer group">

                    <!-- Image -->
                    <div class="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        [src]="offer.imageUrl"
                        [alt]="offer.title"
                        class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        (error)="onImgError($event)"
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                      <!-- Category badge -->
                      <span class="absolute top-3 left-3 text-xs bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                        {{ offer.category }}
                      </span>

                      <!-- Rating badge -->
                      <div class="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1">
                        <i class="bi bi-star-fill text-yellow-400 text-xs"></i>
                        <span class="text-white text-xs font-semibold">{{ offer.rating }}</span>
                        <span class="text-white/70 text-xs">({{ offer.reviewCount }})</span>
                      </div>
                    </div>

                    <!-- Body -->
                    <div class="p-5">
                      <h3 class="font-semibold text-gray-800 leading-snug mb-1 line-clamp-2">{{ offer.title }}</h3>

                      <p class="text-sm text-gray-500 flex items-center gap-1 mb-1">
                        <i class="bi bi-geo-alt text-ocean-500"></i>{{ offer.city }}, {{ offer.country }}
                      </p>

                      <div class="flex items-center gap-2 text-xs text-gray-400 mb-3">
                        <span><i class="bi bi-clock me-1"></i>{{ formatDuration(offer.durationMinutes) }}</span>
                        <span class="text-gray-200">|</span>
                        <span>
                          <i class="bi bi-building me-1"></i>{{ offer.centerName }}
                          @if (offer.centerVerified) {
                            <i class="bi bi-patch-check-fill text-ocean-500 ms-1"></i>
                          }
                        </span>
                      </div>

                      <div class="flex items-center justify-between">
                        <div>
                          <span class="text-xl font-bold text-ocean-600">{{ offer.price }} €</span>
                          <span class="text-xs text-gray-400 ml-1">/ persona</span>
                        </div>
                        <button
                          [routerLink]="['/marketplace/booking', offer.id]"
                          class="btn-ocean text-sm py-2 px-4"
                        >
                          Reservar
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>

              <!-- Pagination -->
              @if (totalPages > 1) {
                <div class="flex items-center justify-center gap-2 pb-8">
                  <button
                    (click)="goToPage(currentPage - 1)"
                    [disabled]="currentPage === 0"
                    class="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-ocean-400 hover:text-ocean-600 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <i class="bi bi-chevron-left text-xs"></i>
                  </button>

                  @for (p of pageArray(totalPages); track p) {
                    <button
                      (click)="goToPage(p)"
                      class="w-9 h-9 rounded-full border text-sm transition-all"
                      [class]="p === currentPage
                        ? 'bg-ocean-600 text-white border-ocean-600'
                        : 'border-gray-200 text-gray-600 hover:border-ocean-400'"
                    >{{ p + 1 }}</button>
                  }

                  <button
                    (click)="goToPage(currentPage + 1)"
                    [disabled]="currentPage >= totalPages - 1"
                    class="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-ocean-400 hover:text-ocean-600 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <i class="bi bi-chevron-right text-xs"></i>
                  </button>
                </div>
              }
            }
          }
        </div>
      }

      <!-- ─── LANDING VIEW ─── -->
      @if (!showResults) {
        <div class="container mx-auto px-4 py-12">

          <!-- Categories Carousel -->
          <div class="mb-12">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Categorías Populares</h2>
            <div class="relative flex items-center">
              <button
                (click)="prevCategories()"
                class="absolute left-0 z-10 -translate-x-5 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-all"
              >
                <i class="bi bi-chevron-left text-ocean-600"></i>
              </button>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mx-8">
                @for (category of visibleCategories; track category.name) {
                  <div
                    (click)="selectCategoryFromLanding(category.name)"
                    class="card-ocean p-6 text-center hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div class="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span class="text-2xl">{{ category.emoji }}</span>
                    </div>
                    <h3 class="font-semibold text-gray-800">{{ category.name }}</h3>
                    <p class="text-sm text-gray-500 mt-1">{{ category.description }}</p>
                  </div>
                }
              </div>

              <button
                (click)="nextCategories()"
                class="absolute right-0 z-10 translate-x-5 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-all"
              >
                <i class="bi bi-chevron-right text-ocean-600"></i>
              </button>
            </div>
            <div class="flex justify-center gap-2 mt-5">
              @for (p of pageArray(totalCatPages); track p) {
                <span
                  (click)="categoriesPage = p"
                  class="h-2 rounded-full transition-all duration-300 cursor-pointer"
                  [class]="p === categoriesPage ? 'bg-ocean-600 w-6' : 'bg-gray-300 w-2 hover:bg-gray-400'"
                ></span>
              }
            </div>
          </div>

          <!-- Featured Experiences Carousel -->
          <div class="mb-12">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-800">Experiencias Destacadas</h2>
              <button (click)="searchControl.setValue(''); showAllResults()" class="text-ocean-600 hover:text-ocean-700">Ver todas</button>
            </div>

            <div class="relative flex items-center">
              <button
                (click)="prevExperiences()"
                class="absolute left-0 z-10 -translate-x-5 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-all"
              >
                <i class="bi bi-chevron-left text-ocean-600"></i>
              </button>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mx-8">
                @for (exp of visibleExperiences; track exp.title) {
                  <div class="relative rounded-xl overflow-hidden h-64 group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                    <img [src]="exp.image" [alt]="exp.title" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div class="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <i class="bi bi-star-fill text-yellow-400 text-xs"></i>
                      <span class="text-white text-xs font-semibold">{{ exp.rating }}</span>
                      <span class="text-white/70 text-xs">({{ exp.reviews }})</span>
                    </div>
                    <div class="absolute bottom-4 left-4 right-4 text-white">
                      <h3 class="font-semibold text-base leading-tight">{{ exp.title }}</h3>
                      <p class="text-xs text-white/80 mt-1">{{ exp.description }}</p>
                    </div>
                  </div>
                }
              </div>

              <button
                (click)="nextExperiences()"
                class="absolute right-0 z-10 translate-x-5 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-all"
              >
                <i class="bi bi-chevron-right text-ocean-600"></i>
              </button>
            </div>
            <div class="flex justify-center gap-2 mt-5">
              @for (p of pageArray(totalExpPages); track p) {
                <span
                  (click)="experiencesPage = p"
                  class="h-2 rounded-full transition-all duration-300 cursor-pointer"
                  [class]="p === experiencesPage ? 'bg-ocean-600 w-6' : 'bg-gray-300 w-2 hover:bg-gray-400'"
                ></span>
              }
            </div>
          </div>

          <!-- Popular Destinations Carousel -->
          <div class="mb-12">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-800">Destinos Populares</h2>
              <a href="#" class="text-ocean-600 hover:text-ocean-700">Ver todas</a>
            </div>

            <div class="relative flex items-center">
              <button
                (click)="prevDestinations()"
                class="absolute left-0 z-10 -translate-x-5 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-all"
              >
                <i class="bi bi-chevron-left text-ocean-600"></i>
              </button>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mx-8">
                @for (dest of visibleDestinations; track dest.name) {
                  <div
                    (click)="searchByDestination(dest.name)"
                    class="relative rounded-xl overflow-hidden h-40 group cursor-pointer shadow-md hover:shadow-xl transition-shadow"
                  >
                    <img [src]="dest.image" [alt]="dest.name" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div class="absolute bottom-4 left-4 text-white">
                      <h3 class="font-semibold">{{ dest.name }}</h3>
                    </div>
                  </div>
                }
              </div>

              <button
                (click)="nextDestinations()"
                class="absolute right-0 z-10 translate-x-5 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-all"
              >
                <i class="bi bi-chevron-right text-ocean-600"></i>
              </button>
            </div>
            <div class="flex justify-center gap-2 mt-5">
              @for (p of pageArray(totalDestPages); track p) {
                <span
                  (click)="destinationsPage = p"
                  class="h-2 rounded-full transition-all duration-300 cursor-pointer"
                  [class]="p === destinationsPage ? 'bg-ocean-600 w-6' : 'bg-gray-300 w-2 hover:bg-gray-400'"
                ></span>
              }
            </div>
          </div>

          <!-- Featured Dive Centers -->
          <div class="mb-12">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-800">Centros Destacados</h2>
              <a href="#" class="text-ocean-600 hover:text-ocean-700">Ver todos</a>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              @for (center of diveCenters; track center.name) {
                <div class="card-ocean overflow-hidden hover:shadow-xl transition-all cursor-pointer">
                  <div class="h-40 relative overflow-hidden">
                    <img [src]="center.image" [alt]="center.name" class="absolute inset-0 w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                  <div class="p-5">
                    <div class="flex justify-between items-start mb-2">
                      <h3 class="font-semibold text-gray-800 leading-tight">{{ center.name }}</h3>
                      <div class="flex items-center gap-1 ml-2 flex-shrink-0">
                        <i class="bi bi-star-fill text-yellow-400 text-sm"></i>
                        <span class="text-sm font-semibold text-gray-700">{{ center.rating }}</span>
                      </div>
                    </div>
                    <p class="text-sm text-gray-500 mb-3 flex items-center gap-1">
                      <i class="bi bi-geo-alt text-ocean-500"></i>{{ center.location }}
                    </p>
                    <p class="text-xs text-gray-500 mb-3">{{ center.reviews }} reseñas verificadas</p>
                    <div class="flex gap-2 flex-wrap mb-4">
                      @for (tag of center.tags; track tag) {
                        <span class="text-xs bg-ocean-50 text-ocean-700 px-2 py-1 rounded-full border border-ocean-100">{{ tag }}</span>
                      }
                    </div>
                    <button class="w-full btn-ocean text-sm py-2">Ver centro</button>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Trust Section -->
          <div class="bg-white rounded-2xl p-8 mb-12 shadow-sm">
            <h2 class="text-2xl font-bold text-gray-800 text-center mb-8">¿Por qué SubMerso?</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              @for (trust of trustItems; track trust.title) {
                <div
                  class="text-center"
                  [class.cursor-pointer]="trust.link"
                  (click)="trust.link && router.navigate([trust.link])"
                >
                  <div class="w-14 h-14 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="bi {{ trust.icon }} text-2xl text-ocean-600"></i>
                  </div>
                  <h3 class="font-semibold text-gray-800 mb-2">
                    {{ trust.title }}
                    @if (trust.link) {
                      <i class="bi bi-arrow-right text-ocean-500 text-xs ms-1"></i>
                    }
                  </h3>
                  <p class="text-sm text-gray-500 leading-relaxed">{{ trust.description }}</p>
                </div>
              }
            </div>
          </div>

        </div>
      }
    </div>
  `,
  styles: [`
    .chip-active {
      display: inline-flex;
      align-items: center;
      background-color: #0369a1;
      color: white;
      font-size: 0.75rem;
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
    }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class SearchComponent implements OnInit, OnDestroy {

  searchControl   = new FormControl('');
  activeCategory: string | null = null;
  activeMaxPrice: number | null = null;
  activeMinRating: number | null = null;
  verifiedOnly    = false;
  currentSort     = 'newest';
  currentPage     = 0;

  results: OfferSummary[] = [];
  totalElements   = 0;
  totalPages      = 0;
  loading         = false;
  error           = false;

  private destroy$ = new Subject<void>();
  private _forceShowResults = false;

  get showResults(): boolean {
    return this._forceShowResults
      || !!(this.searchControl.value?.trim())
      || !!this.activeCategory
      || !!this.activeMaxPrice
      || !!this.activeMinRating
      || this.verifiedOnly;
  }

  get hasActiveFilters(): boolean {
    return !!(this.searchControl.value?.trim())
      || !!this.activeCategory
      || !!this.activeMaxPrice
      || !!this.activeMinRating
      || this.verifiedOnly;
  }

  categories = [
    { name: 'Bautismo',             emoji: '✨', description: 'Tu primera inmersión guiada en aguas seguras.' },
    { name: 'Open Water',           emoji: '🌊', description: 'Curso de certificación internacional reconocida.' },
    { name: 'Naufragios',           emoji: '🚢', description: 'Explora barcos y aviones hundidos en el fondo marino.' },
    { name: 'Nocturno',             emoji: '🌙', description: 'Descubre la vida marina que despierta al anochecer.' },
    { name: 'Fotografía Submarina', emoji: '📸', description: 'Inmersiones ideales para capturar imágenes únicas.' },
    { name: 'Vida Marina',          emoji: '🐠', description: 'Encuentros con tortugas, mantarrayas y grandes especies.' },
    { name: 'Volcanes Submarinos',  emoji: '🌋', description: 'Inmersiones en zonas geológicamente activas.' },
    { name: 'Islas',                emoji: '🏝️', description: 'Destinos insulares con puntos de buceo exclusivos.' }
  ];

  destinations = [
    { name: 'Islas Canarias', image: 'imgs/IslasCanarias.jpg' },
    { name: 'Costa Brava',    image: 'imgs/CostaBrava.jpg'    },
    { name: 'Baleares',       image: 'imgs/Baleares.png'      },
    { name: 'Caribe',         image: 'imgs/Caribe.png'        },
    { name: 'Maldivas',       image: 'imgs/Maldivas.png'      },
    { name: 'Mar Rojo',       image: 'imgs/MarRojo.png'       },
    { name: 'Azores',         image: 'imgs/RajaAmpat.png'     },
    { name: 'Filipinas',      image: 'imgs/Filipinas.png'     }
  ];

  experiences = [
    { title: 'Bautismo en Playa del Carmen',  description: 'Primera experiencia en arrecife caribeño',              image: 'imgs/Experiencia1.jpg', rating: 4.9, reviews: 214 },
    { title: 'Agujero Azul en Belice',        description: 'Una de las inmersiones más famosas del mundo',          image: 'imgs/Experiencia2.jpg', rating: 4.8, reviews: 389 },
    { title: 'Pecio Umbria en Sudán',         description: 'Historia bajo el mar',                                  image: 'imgs/Experiencia3.jpg', rating: 4.7, reviews: 97  },
    { title: 'Tiburones en Bahamas',          description: 'Encuentro cercano con grandes depredadores del océano', image: 'imgs/Experiencia4.jpg', rating: 4.9, reviews: 156 },
    { title: 'Cenotes en Tulum',              description: 'Rayos de luz y agua cristalina en cavernas únicas',     image: 'imgs/Experiencia5.jpg', rating: 4.8, reviews: 302 },
    { title: 'Manta Raya Nocturna en México', description: 'Un espectáculo natural iluminado bajo las estrellas',   image: 'imgs/Experiencia6.jpg', rating: 5.0, reviews: 88  }
  ];

  trustItems = [
    { icon: 'bi-patch-check-fill',      title: 'Centros verificados',  description: 'Todos los centros pasan un proceso de verificación de calidad.', link: null },
    { icon: 'bi-shield-lock-fill',      title: 'Reserva segura',       description: 'Pagos protegidos con cifrado SSL y respaldo Stripe.',                link: null },
    { icon: 'bi-journal-bookmark-fill', title: 'Logbook integrado',    description: 'Cada inmersión queda registrada y certificada automáticamente.',    link: '/logbook' },
    { icon: 'bi-headset',               title: 'Soporte 24/7',         description: 'Equipo disponible para ayudarte antes, durante y después.',          link: '/deepblue' }
  ];

  diveCenters = [
    { name: 'Blue Abyss Dive Center', location: 'Playa del Carmen, México', rating: 4.9, reviews: 312, tags: ['Arrecife', 'Cenotes', 'Bautismo'],       image: 'imgs/PlayadelCarmen.png' },
    { name: 'Red Sea Explorers',      location: 'Dahab, Egipto',            rating: 4.7, reviews: 198, tags: ['Naufragios', 'Open Water', 'Avanzado'],   image: 'imgs/dahab.png'          },
    { name: 'Azul Infinito',          location: 'Ibiza, España',            rating: 4.8, reviews: 145, tags: ['Mediterráneo', 'Fotografía', 'Nocturno'], image: 'imgs/AzulInfinito.png'   }
  ];

  categoriesPage  = 0;
  experiencesPage = 0;
  destinationsPage = 0;

  readonly catPerPage  = 4;
  readonly expPerPage  = 3;
  readonly destPerPage = 4;

  private busy = false;

  constructor(
    private marketplaceService: MarketplaceService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    if (params['q'])            this.searchControl.setValue(params['q']);
    if (params['category'])     this.activeCategory  = params['category'];
    if (params['maxPrice'])     this.activeMaxPrice  = +params['maxPrice'];
    if (params['minRating'])    this.activeMinRating = +params['minRating'];
    if (params['verifiedOnly']) this.verifiedOnly    = params['verifiedOnly'] === 'true';
    if (params['sort'])         this.currentSort     = params['sort'];
    if (params['page'])         this.currentPage     = +params['page'];

    if (this.showResults) this.loadOffers();

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.currentPage = 0;
      if (this.showResults) {
        this.loadOffers();
      } else {
        this.results = [];
        this.syncUrlParams();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  triggerSearch(): void {
    this.currentPage = 0;
    if (this.showResults) this.loadOffers();
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }

  showAllResults(): void {
    this._forceShowResults = true;
    this.loadOffers();
  }

  selectCategoryFromLanding(name: string): void {
    this.activeCategory = name;
    this.loadOffers();
  }

  searchByDestination(dest: string): void {
    this.searchControl.setValue(dest);
  }

  toggleCategory(name: string): void {
    this.activeCategory = this.activeCategory === name ? null : name;
    this.currentPage = 0;
    this.onFilterChange();
  }

  onFilterChange(): void {
    this.currentPage = 0;
    this.loadOffers();
  }

  clearAllFilters(): void {
    this._forceShowResults = false;
    this.searchControl.setValue('', { emitEvent: false });
    this.activeCategory  = null;
    this.activeMaxPrice  = null;
    this.activeMinRating = null;
    this.verifiedOnly    = false;
    this.currentSort     = 'newest';
    this.currentPage     = 0;
    this.results         = [];
    this.totalElements   = 0;
    this.totalPages      = 0;
    this.syncUrlParams();
  }

  goToPage(p: number): void {
    if (p < 0 || p >= this.totalPages) return;
    this.currentPage = p;
    this.loadOffers();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadOffers(): void {
    this.loading = true;
    this.error   = false;

    const filters: OfferFilters = {
      q:           this.searchControl.value || undefined,
      category:    this.activeCategory     || undefined,
      maxPrice:    this.activeMaxPrice,
      minRating:   this.activeMinRating,
      verifiedOnly: this.verifiedOnly || undefined,
      sort:        this.currentSort,
      page:        this.currentPage,
      size:        12
    };

    this.syncUrlParams();

    this.marketplaceService.searchOffers(filters).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (res: PagedResponse<OfferSummary>) => {
        this.results       = res.content;
        this.totalElements = res.totalElements;
        this.totalPages    = res.totalPages;
        this.loading       = false;
      },
      error: () => {
        this.error   = true;
        this.loading = false;
      }
    });
  }

  private syncUrlParams(): void {
    const qp: Record<string, string | number | boolean | null> = {};
    if (this.searchControl.value?.trim()) qp['q']           = this.searchControl.value.trim();
    if (this.activeCategory)              qp['category']    = this.activeCategory;
    if (this.activeMaxPrice  != null)     qp['maxPrice']    = this.activeMaxPrice;
    if (this.activeMinRating != null)     qp['minRating']   = this.activeMinRating;
    if (this.verifiedOnly)                qp['verifiedOnly'] = true;
    if (this.currentSort !== 'newest')    qp['sort']        = this.currentSort;
    if (this.currentPage  > 0)           qp['page']        = this.currentPage;

    this.router.navigate([], { queryParams: qp, replaceUrl: true });
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

  pageArray(n: number): number[] { return Array.from({ length: n }, (_, i) => i); }

  private go(fn: () => void) {
    if (this.busy) return;
    this.busy = true;
    fn();
    setTimeout(() => this.busy = false, 300);
  }

  get totalCatPages()   { return Math.ceil(this.categories.length   / this.catPerPage); }
  get totalExpPages()   { return Math.ceil(this.experiences.length   / this.expPerPage); }
  get totalDestPages()  { return Math.ceil(this.destinations.length  / this.destPerPage); }

  get visibleCategories()  { const s = this.categoriesPage  * this.catPerPage;  return this.categories.slice(s, s  + this.catPerPage); }
  get visibleExperiences() { const s = this.experiencesPage * this.expPerPage;  return this.experiences.slice(s, s + this.expPerPage); }
  get visibleDestinations(){ const s = this.destinationsPage* this.destPerPage; return this.destinations.slice(s,s + this.destPerPage); }

  prevCategories()   { this.go(() => this.categoriesPage   = (this.categoriesPage   - 1 + this.totalCatPages)  % this.totalCatPages); }
  nextCategories()   { this.go(() => this.categoriesPage   = (this.categoriesPage   + 1) % this.totalCatPages); }
  prevExperiences()  { this.go(() => this.experiencesPage  = (this.experiencesPage  - 1 + this.totalExpPages)  % this.totalExpPages); }
  nextExperiences()  { this.go(() => this.experiencesPage  = (this.experiencesPage  + 1) % this.totalExpPages); }
  prevDestinations() { this.go(() => this.destinationsPage = (this.destinationsPage - 1 + this.totalDestPages) % this.totalDestPages); }
  nextDestinations() { this.go(() => this.destinationsPage = (this.destinationsPage + 1) % this.totalDestPages); }
}
