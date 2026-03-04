import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface OfferSummary {
  id: string;
  title: string;
  category: string;
  price: number;
  currency: string;
  city: string;
  country: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  centerName: string;
  centerVerified: boolean;
  durationMinutes: number;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface OfferFilters {
  q?: string;
  category?: string;
  city?: string;
  maxPrice?: number | null;
  minRating?: number | null;
  verifiedOnly?: boolean;
  sort?: string;
  page?: number;
  size?: number;
}

@Injectable({ providedIn: 'root' })
export class MarketplaceService {

  private readonly API = 'http://localhost:8085/api/marketplace';

  constructor(private http: HttpClient) {}

  searchOffers(filters: OfferFilters): Observable<PagedResponse<OfferSummary>> {
    let params = new HttpParams();

    if (filters.q?.trim())             params = params.set('q',           filters.q.trim());
    if (filters.category)              params = params.set('category',    filters.category);
    if (filters.city?.trim())          params = params.set('city',        filters.city.trim());
    if (filters.maxPrice  != null)     params = params.set('maxPrice',    filters.maxPrice);
    if (filters.minRating != null)     params = params.set('minRating',   filters.minRating);
    if (filters.verifiedOnly)          params = params.set('verifiedOnly', true);
    if (filters.sort)                  params = params.set('sort',        filters.sort);

    params = params.set('page', filters.page ?? 0);
    params = params.set('size', filters.size ?? 12);

    return this.http
      .get<{ success: boolean; data: PagedResponse<OfferSummary> }>(`${this.API}/offers`, { params })
      .pipe(map(res => res.data));
  }
}
