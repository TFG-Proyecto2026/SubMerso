import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService, User } from './auth.service';

export interface UserProfile extends User {
  isFollowing?: boolean;
  isOwnProfile?: boolean;
  recentDives?: DiveSummary[];
  badges?: Badge[];
}

export interface DiveSummary {
  id: number;
  location: string;
  date: string;
  maxDepth: number;
  duration: number;
}

export interface Badge {
  id: number;
  name: string;
  icon: string;
  description: string;
  earnedAt: string;
}

export interface UpdateProfileRequest {
  fullName?: string;
  bio?: string;
  location?: string;
  avatar?: string;
  certificationLevel?: string;
}

export interface FollowResponse {
  message: string;
  followersCount: number;
  isFollowing: boolean;
}

export interface UserStats {
  totalDives: number;
  totalTime: number;
  maxDepth: number;
  favoriteSpot: string;
  certificationsCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/users`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getProfile(username: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_URL}/profile/${username}`);
  }

  getMyProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_URL}/me`);
  }

  updateProfile(data: UpdateProfileRequest): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/me`, data).pipe(
      tap(updatedUser => this.authService.updateCurrentUser(updatedUser))
    );
  }

  uploadAvatar(file: File): Observable<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.post<{ avatarUrl: string }>(`${this.API_URL}/me/avatar`, formData);
  }

  follow(username: string): Observable<FollowResponse> {
    return this.http.post<FollowResponse>(`${this.API_URL}/${username}/follow`, {});
  }

  unfollow(username: string): Observable<FollowResponse> {
    return this.http.delete<FollowResponse>(`${this.API_URL}/${username}/follow`);
  }

  getFollowers(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/${username}/followers`);
  }

  getFollowing(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/${username}/following`);
  }

  getUserStats(username: string): Observable<UserStats> {
    return this.http.get<UserStats>(`${this.API_URL}/${username}/stats`);
  }

  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/search`, {
      params: { q: query }
    });
  }

  getSuggestedUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/suggested`);
  }
}
