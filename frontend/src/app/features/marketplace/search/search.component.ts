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
                <div class="card-ocean p-6 text-center hover:shadow-lg transition-all cursor-pointer">
                  <div class="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    @if (category.emoji) {
                      <span class="text-2xl">{{ category.emoji }}</span>
                    } @else {
                      <i class="bi {{ category.icon }} text-2xl text-ocean-600"></i>
                    }
                  </div>
                  <h3 class="font-semibold text-gray-800">{{ category.name }}</h3>
                  <p class="text-sm text-gray-500 mt-1">{{ category.description }}</p>
                  <p class="text-xs text-ocean-600 font-medium mt-2">{{ category.count }} opciones</p>
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
            <a href="#" class="text-ocean-600 hover:text-ocean-700">Ver todas</a>
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
                <div class="relative rounded-xl overflow-hidden h-40 group cursor-pointer shadow-md hover:shadow-xl transition-shadow">
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
                  <img [src]="center.image" [alt]="center.name" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
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
              <div class="text-center">
                <div class="w-14 h-14 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="bi {{ trust.icon }} text-2xl text-ocean-600"></i>
                </div>
                <h3 class="font-semibold text-gray-800 mb-2">{{ trust.title }}</h3>
                <p class="text-sm text-gray-500 leading-relaxed">{{ trust.description }}</p>
              </div>
            }
          </div>
        </div>

      </div>
    </div>
  `
})
export class SearchComponent {
  categories = [
    { name: 'Bautismo',              icon: '',  count: 45,  description: 'Tu primera inmersión guiada en aguas seguras.',                  emoji: '✨' },
    { name: 'Open Water',            icon: '',  count: 120, description: 'Curso de certificación internacional reconocida.',                emoji: '🌊' },
    { name: 'Naufragios',            icon: '',  count: 38,  description: 'Explora barcos y aviones hundidos en el fondo marino.',           emoji: '🚢' },
    { name: 'Nocturno',              icon: '',  count: 25,  description: 'Descubre la vida marina que despierta al anochecer.',             emoji: '🌙' },
    { name: 'Fotografía Submarina',  icon: '',  count: 21,  description: 'Inmersiones ideales para capturar imágenes únicas bajo el agua.', emoji: '📸' },
    { name: 'Vida Marina',           icon: '',  count: 58,  description: 'Encuentros con tortugas, mantarrayas y grandes especies.',        emoji: '🐠' },
    { name: 'Volcanes Submarinos',   icon: '',  count: 9,   description: 'Inmersiones en zonas geológicamente activas.',                   emoji: '🌋' },
    { name: 'Islas',                 icon: '',  count: 46,  description: 'Destinos insulares con puntos de buceo exclusivos.',             emoji: '🏝️' }
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
    { title: 'Bautismo en Playa del Carmen',  description: 'Primera experiencia en arrecife caribeño',                    image: 'imgs/Experiencia1.jpg', rating: 4.9, reviews: 214 },
    { title: 'Agujero Azul en Belice',        description: 'Una de las inmersiones más famosas del mundo',                image: 'imgs/Experiencia2.jpg', rating: 4.8, reviews: 389 },
    { title: 'Pecio Umbria en Sudán',         description: 'Historia bajo el mar',                                        image: 'imgs/Experiencia3.jpg', rating: 4.7, reviews: 97  },
    { title: 'Tiburones en Bahamas',          description: 'Encuentro cercano con grandes depredadores del océano',       image: 'imgs/Experiencia4.jpg', rating: 4.9, reviews: 156 },
    { title: 'Cenotes en Tulum',              description: 'Rayos de luz y agua cristalina en cavernas únicas',           image: 'imgs/Experiencia5.jpg', rating: 4.8, reviews: 302 },
    { title: 'Manta Raya Nocturna en México', description: 'Un espectáculo natural iluminado bajo las estrellas',         image: 'imgs/Experiencia6.jpg', rating: 5.0, reviews: 88  }
  ];

  filters = [
    { label: 'Principiante', emoji: '🌱', active: false },
    { label: 'Intermedio',   emoji: '🤿', active: false },
    { label: 'Avanzado',     emoji: '🏆', active: false },
    { label: '< 1 hora',     emoji: '⏱️',  active: false },
    { label: 'Medio día',    emoji: '🌅', active: false },
    { label: 'Día completo', emoji: '🗓️', active: false },
    { label: 'Sin cert.',    emoji: '✅', active: false },
    { label: 'Open Water+',  emoji: '📜', active: false }
  ];

  trustItems = [
    { icon: 'bi-patch-check-fill', title: 'Centros verificados',  description: 'Todos los centros pasan un proceso de verificación de calidad.' },
    { icon: 'bi-shield-lock-fill', title: 'Reserva segura',       description: 'Pagos protegidos con cifrado SSL y respaldo Stripe.' },
    { icon: 'bi-journal-bookmark-fill', title: 'Logbook integrado', description: 'Cada inmersión queda registrada y certificada automáticamente.' },
    { icon: 'bi-headset',          title: 'Soporte 24/7',         description: 'Equipo disponible para ayudarte antes, durante y después.' }
  ];

  diveCenters = [
    { name: 'Blue Abyss Dive Center', location: 'Playa del Carmen, México', rating: 4.9, reviews: 312, tags: ['Arrecife', 'Cenotes', 'Bautismo'],       image: 'imgs/PlayadelCarmen.png' },
    { name: 'Red Sea Explorers',      location: 'Dahab, Egipto',            rating: 4.7, reviews: 198, tags: ['Naufragios', 'Open Water', 'Avanzado'],   image: 'imgs/dahab.png'          },
    { name: 'Azul Infinito',          location: 'Ibiza, España',            rating: 4.8, reviews: 145, tags: ['Mediterráneo', 'Fotografía', 'Nocturno'], image: 'imgs/AzulInfinito.png'   }
  ];

  categoriesPage = 0;
  experiencesPage = 0;
  destinationsPage = 0;

  readonly catPerPage = 4;
  readonly expPerPage = 3;
  readonly destPerPage = 4;

  private busy = false;

  private go(fn: () => void) {
    if (this.busy) return;
    this.busy = true;
    fn();
    setTimeout(() => this.busy = false, 300);
  }

  get totalCatPages()  { return Math.ceil(this.categories.length  / this.catPerPage); }
  get totalExpPages()  { return Math.ceil(this.experiences.length  / this.expPerPage); }
  get totalDestPages() { return Math.ceil(this.destinations.length / this.destPerPage); }

  pageArray(n: number) { return Array.from({ length: n }, (_, i) => i); }

  get visibleCategories() {
    const s = this.categoriesPage * this.catPerPage;
    return this.categories.slice(s, s + this.catPerPage);
  }
  prevCategories() { this.go(() => this.categoriesPage = (this.categoriesPage - 1 + this.totalCatPages) % this.totalCatPages); }
  nextCategories() { this.go(() => this.categoriesPage = (this.categoriesPage + 1) % this.totalCatPages); }

  get visibleExperiences() {
    const s = this.experiencesPage * this.expPerPage;
    return this.experiences.slice(s, s + this.expPerPage);
  }
  prevExperiences() { this.go(() => this.experiencesPage = (this.experiencesPage - 1 + this.totalExpPages) % this.totalExpPages); }
  nextExperiences() { this.go(() => this.experiencesPage = (this.experiencesPage + 1) % this.totalExpPages); }

  get visibleDestinations() {
    const s = this.destinationsPage * this.destPerPage;
    return this.destinations.slice(s, s + this.destPerPage);
  }
  prevDestinations() { this.go(() => this.destinationsPage = (this.destinationsPage - 1 + this.totalDestPages) % this.totalDestPages); }
  nextDestinations() { this.go(() => this.destinationsPage = (this.destinationsPage + 1) % this.totalDestPages); }

  get hasActiveFilters() { return this.filters.some(f => f.active); }
  toggleFilter(f: { label: string; emoji: string; active: boolean }) { f.active = !f.active; }
  clearFilters() { this.filters.forEach(f => f.active = false); }
}
