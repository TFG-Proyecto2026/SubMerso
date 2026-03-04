import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Dive {
  id?: string;
  userId?: string;
  diveNumber?: number;
  diveDate?: string;
  location?: string;
  depthMax?: number;
  durationMinutes?: number;
  rnt?: number;
  abt?: number;
  tbt?: number;
  visibility?: number;
  visibilityUnit?: string;
  tempAir?: number;
  tempSurface?: number;
  tempBottom?: number;
  weight?: number;
  weightUnit?: string;
  exposureProtection?: string[];
  conditions?: string[];
  diveType?: string;
  pressureStart?: number;
  pressureEnd?: number;
  timeIn?: string;
  timeOut?: string;
  gasMixPercent?: string;
  comments?: string;
  bottomTimeToDate?: number;
  bottomTimeThisDive?: number;
  cumulativeTime?: number;
  verified?: boolean;
  verificationSignature?: string;
  certificationNo?: string;
  createdAt?: string;
}

interface ApiResponse<T> {
  data?: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DiveService {
  private readonly API_URL = `${environment.apiUrl}/logbook`;

  constructor(private http: HttpClient) {}

  getDives(): Observable<Dive[]> {
    return this.http
      .get<ApiResponse<Dive[]>>(`${this.API_URL}/dives`)
      .pipe(map(res => res?.data ?? []));
  }

  getDive(id: string): Observable<Dive | null> {
    return this.http
      .get<ApiResponse<Dive>>(`${this.API_URL}/dives/${id}`)
      .pipe(map(res => res?.data ?? null));
  }

  createDive(dive: Partial<Dive>): Observable<Dive | null> {
    return this.http
      .post<ApiResponse<Dive>>(`${this.API_URL}/dives`, dive)
      .pipe(map(res => res?.data ?? null));
  }

  updateDive(id: string, dive: Partial<Dive>): Observable<Dive | null> {
    return this.http
      .put<ApiResponse<Dive>>(`${this.API_URL}/dives/${id}`, dive)
      .pipe(map(res => res?.data ?? null));
  }

  deleteDive(id: string): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.API_URL}/dives/${id}`)
      .pipe(map(() => undefined));
  }
}
