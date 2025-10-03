import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../../shared/models';

export const roleGuard = (allowedRoles: UserRole[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const currentUser = authService.getCurrentUser();

    if (!currentUser) {
      router.navigate(['/auth/login']);
      return false;
    }

    if (allowedRoles.includes(currentUser.role)) {
      return true;
    }

    // Redirect to appropriate dashboard based on role
    if (currentUser.role === UserRole.PATIENT) {
      router.navigate(['/patient/dashboard']);
    } else if (currentUser.role === UserRole.THERAPIST) {
      router.navigate(['/therapist/dashboard']);
    }

    return false;
  };
};
