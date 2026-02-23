import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { UserService, UserProfile, UserStats } from '../../../core/services/user.service';
import { AuthService, User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent implements OnInit {
  @Input() username: string = '';
  
  profile: UserProfile | null = null;
  stats: UserStats | null = null;
  currentUser: User | null = null;
  isLoading = true;
  error = '';
  activeTab: 'dives' | 'badges' | 'about' = 'dives';
  isFollowing = false;
  followLoading = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    this.route.params.subscribe(params => {
      this.username = params['username'] || this.username;
      this.loadProfile();
    });
  }

  loadProfile(): void {
    if (!this.username) return;

    this.isLoading = true;
    this.error = '';

    this.userService.getProfile(this.username).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.isFollowing = profile.isFollowing || false;
        this.loadStats();
      },
      error: (err) => {
        this.error = 'No se pudo cargar el perfil';
        this.isLoading = false;
      }
    });
  }

  loadStats(): void {
    this.userService.getUserStats(this.username).subscribe({
      next: (stats) => {
        this.stats = stats;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  toggleFollow(): void {
    if (!this.profile || this.followLoading) return;

    this.followLoading = true;

    const action = this.isFollowing 
      ? this.userService.unfollow(this.username)
      : this.userService.follow(this.username);

    action.subscribe({
      next: (response) => {
        this.isFollowing = response.isFollowing;
        if (this.profile) {
          this.profile.followers = response.followersCount;
        }
        this.followLoading = false;
      },
      error: () => {
        this.followLoading = false;
      }
    });
  }

  isOwnProfile(): boolean {
    return this.currentUser?.username === this.username;
  }

  setActiveTab(tab: 'dives' | 'badges' | 'about'): void {
    this.activeTab = tab;
  }
}
