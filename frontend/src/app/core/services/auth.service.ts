import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError, map, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  bio?: string;
  location?: string;
  certificationLevel?: string;
  totalDives?: number;
  followers?: number;
  following?: number;
  role: string;
  roles?: string[];
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

/** Respuesta del backend (dentro de ApiResponse.data) */
export interface AuthResponseBackend {
  accessToken: string;
  refreshToken?: string;
  userId: string;
  email: string;
  username: string;
  roles?: string[];
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

/** Wrapper de la API: { success, message, data } */
interface ApiWrapper<T> {
  data?: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'submerso_token';
  private readonly USER_KEY = 'submerso_user';

  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSignal = signal<boolean>(this.hasValidToken());
  isAuthenticated = computed(() => this.isAuthenticatedSignal());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkTokenExpiration();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<ApiWrapper<AuthResponseBackend>>(`${this.API_URL}/login`, credentials).pipe(
      map(res => this.normalizeAuthResponse(res)),
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => this.handleAuthError(error))
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<ApiWrapper<AuthResponseBackend>>(`${this.API_URL}/register`, userData).pipe(
      map(res => this.normalizeAuthResponse(res)),
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => this.handleAuthError(error))
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSignal.set(false);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateCurrentUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSignal();
  }

  /** True si el usuario actual tiene rol ROLE_ADMIN */
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return !!user?.roles?.includes('ROLE_ADMIN');
  }

  private normalizeAuthResponse(res: ApiWrapper<AuthResponseBackend>): AuthResponse {
    const data = res.data;
    if (data) {
      const user: User = {
        id: data.userId,
        username: data.username,
        email: data.email,
        fullName: data.username,
        role: data.roles?.[0] ?? 'ROLE_USER',
        roles: data.roles ?? ['ROLE_USER']
      };
      return { token: data.accessToken, user };
    }
    return { token: '', user: {} as User };
  }

  private handleAuthSuccess(response: AuthResponse): void {
    if (!response?.token || !response?.user) return;
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
    this.isAuthenticatedSignal.set(true);
  }

  private handleAuthError(error: any): Observable<never> {
    let errorMessage = 'Ha ocurrido un error. Inténtalo de nuevo.';
    const body = error.error;
    if (body?.message) {
      errorMessage = body.message;
    } else if (error.status === 401) {
      errorMessage = 'Credenciales inválidas';
    } else if (error.status === 409) {
      errorMessage = 'El usuario o email ya existe';
    } else if (error.status === 0) {
      errorMessage = 'No se puede conectar con el servidor';
    }
    return throwError(() => new Error(errorMessage));
  }

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        if (u && typeof u.id !== 'undefined') return u;
      } catch {
        return null;
      }
    }
    return null;
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000;
      return Date.now() < expiry;
    } catch {
      return false;
    }
  }

  private checkTokenExpiration(): void {
    const token = this.getToken();
    if (token && !this.hasValidToken()) {
      this.logout();
    }
  }
}
