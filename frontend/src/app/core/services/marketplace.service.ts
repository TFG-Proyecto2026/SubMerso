import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DiveCenter {
  id: number;
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewsCount: number;
  priceRange: string;
  images: string[];
  services: string[];
  certifications: string[];
}

export interface DiveExperience {
  id: number;
  centerId: number;
  centerName: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  maxParticipants: number;
  difficulty: string;
  includes: string[];
  images: string[];
}

export interface Booking {
  id: number;
  experienceId: number;
  userId: number;
  date: string;
  participants: number;
  totalPrice: number;
  status: string;
  paymentStatus: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {
  private readonly API_URL = `${environment.apiUrl}/marketplace`;

  constructor(private http: HttpClient) {}

  searchCenters(query: string, location?: string): Observable<DiveCenter[]> {
    return of([]);
  }

  getCenterById(id: number): Observable<DiveCenter | null> {
    return of(null);
  }

  getExperiences(centerId?: number): Observable<DiveExperience[]> {
    return of([]);
  }

  getExperienceById(id: number): Observable<DiveExperience | null> {
    return of(null);
  }

  createBooking(booking: Partial<Booking>): Observable<Booking | null> {
    return of(null);
  }

  getMyBookings(): Observable<Booking[]> {
    return of([]);
  }

  cancelBooking(id: number): Observable<void> {
    return of(undefined);
  }

  processPayment(bookingId: number, paymentData: any): Observable<any> {
    return of(null);
  }
}
