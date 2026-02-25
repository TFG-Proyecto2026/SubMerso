import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = route.data['roles'] as string[];
  const currentUser = authService.getCurrentUser();

  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  if (requiredRoles && requiredRoles.length > 0) {
    const hasRole = currentUser.roles?.some(r => requiredRoles.includes(r)) ?? requiredRoles.includes(currentUser.role);
    if (hasRole) return true;
    router.navigate(['/']);
    return false;
  }

  return true;
};
