import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Dive {
  id: number;
  userId: number;
  location: string;
  diveSite: string;
  date: string;
  entryTime: string;
  exitTime: string;
  maxDepth: number;
  avgDepth: number;
  duration: number;
  waterTemp: number;
  visibility: number;
  airStart: number;
  airEnd: number;
  weight: number;
  suit: string;
  notes: string;
  buddy?: string;
  validated: boolean;
  qrCode?: string;
  images?: string[];
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class DiveService {
  private readonly API_URL = `${environment.apiUrl}/dives`;

  constructor(private http: HttpClient) {}

  getDives(): Observable<Dive[]> {
    return of([]);
  }

  getDive(id: number): Observable<Dive | null> {
    return of(null);
  }

  createDive(dive: Partial<Dive>): Observable<Dive | null> {
    return of(null);
  }

  updateDive(id: number, dive: Partial<Dive>): Observable<Dive | null> {
    return of(null);
  }

  deleteDive(id: number): Observable<void> {
    return of(undefined);
  }

  validateDive(qrCode: string): Observable<any> {
    return of(null);
  }

  getDiveStats(): Observable<any> {
    return of(null);
  }
}
