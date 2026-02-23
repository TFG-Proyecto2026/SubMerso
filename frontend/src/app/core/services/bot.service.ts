import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: number;
  userId: number;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface DiveRecommendation {
  id: number;
  type: 'destination' | 'center' | 'experience' | 'equipment';
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  matchScore: number;
  reasons: string[];
}

@Injectable({
  providedIn: 'root'
})
export class BotService {
  private readonly API_URL = `${environment.apiUrl}/bot`;

  constructor(private http: HttpClient) {}

  sendMessage(message: string, sessionId?: number): Observable<ChatMessage | null> {
    return of(null);
  }

  getChatHistory(): Observable<ChatSession[]> {
    return of([]);
  }

  getSession(sessionId: number): Observable<ChatSession | null> {
    return of(null);
  }

  createSession(): Observable<ChatSession | null> {
    return of(null);
  }

  deleteSession(sessionId: number): Observable<void> {
    return of(undefined);
  }

  getRecommendations(): Observable<DiveRecommendation[]> {
    return of([]);
  }

  getPersonalizedRecommendations(preferences: any): Observable<DiveRecommendation[]> {
    return of([]);
  }
}
