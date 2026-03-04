import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'profile/:username',
    loadComponent: () => import('./features/profile/profile-view/profile-view.component').then(m => m.ProfileViewComponent)
  },
  {
    path: 'profile/edit',
    loadComponent: () => import('./features/profile/profile-edit/profile-edit.component').then(m => m.ProfileEditComponent),
    canActivate: [authGuard]
  },
  {
    path: 'feed',
    loadComponent: () => import('./features/social/feed/feed.component').then(m => m.FeedComponent),
    canActivate: [authGuard]
  },
  {
    path: 'followers',
    loadComponent: () => import('./features/social/followers/followers.component').then(m => m.FollowersComponent),
    canActivate: [authGuard]
  },
  {
    path: 'marketplace',
    loadComponent: () => import('./features/marketplace/search/search.component').then(m => m.SearchComponent)
  },
  {
    path: 'marketplace/booking/:id',
    loadComponent: () => import('./features/marketplace/booking/booking.component').then(m => m.BookingComponent),
    canActivate: [authGuard]
  },
  {
    path: 'marketplace/payment',
    loadComponent: () => import('./features/marketplace/payment/payment.component').then(m => m.PaymentComponent),
    canActivate: [authGuard]
  },
  {
    path: 'logbook',
    loadComponent: () => import('./features/logbook/dive-list/dive-list.component').then(m => m.DiveListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'logbook/nueva',
    loadComponent: () => import('./features/logbook/dive-create/dive-create.component').then(m => m.DiveCreateComponent),
    canActivate: [authGuard]
  },
  {
    path: 'logbook/editar/:id',
    loadComponent: () => import('./features/logbook/dive-edit/dive-edit.component').then(m => m.DiveEditComponent),
    canActivate: [authGuard]
  },
  {
    path: 'logbook/:id',
    loadComponent: () => import('./features/logbook/dive-detail/dive-detail.component').then(m => m.DiveDetailComponent),
    canActivate: [authGuard]
  },
  {
    path: 'logbook/validate/:qr',
    loadComponent: () => import('./features/logbook/qr-validation/qr-validation.component').then(m => m.QrValidationComponent)
  },
  {
    path: 'deepblue',
    loadComponent: () => import('./features/deepblue-bot/chat/chat.component').then(m => m.ChatComponent),
    canActivate: [authGuard]
  },
  {
    path: 'recommendations',
    loadComponent: () => import('./features/deepblue-bot/recommendation/recommendation.component').then(m => m.RecommendationComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [adminGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
