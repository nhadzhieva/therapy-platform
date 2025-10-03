import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { UserRole } from './shared/models';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  },
  {
    path: 'patient',
    canActivate: [roleGuard([UserRole.PATIENT])],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/patient/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
      // TODO: Add more patient routes when components are implemented
      // { path: 'search', loadComponent: () => import('./features/patient/search-therapists/search-therapists.component').then(m => m.SearchTherapistsComponent) },
      // { path: 'appointments', loadComponent: () => import('./features/patient/appointments/appointments.component').then(m => m.AppointmentsComponent) },
      // { path: 'profile', loadComponent: () => import('./features/patient/profile/profile.component').then(m => m.ProfileComponent) }
    ]
  },
  {
    path: 'therapist',
    canActivate: [roleGuard([UserRole.THERAPIST])],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/therapist/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
      // TODO: Add more therapist routes when components are implemented
      // { path: 'profile', loadComponent: () => import('./features/therapist/profile/profile.component').then(m => m.ProfileComponent) },
      // { path: 'availability', loadComponent: () => import('./features/therapist/availability/availability.component').then(m => m.AvailabilityComponent) },
      // { path: 'appointments', loadComponent: () => import('./features/therapist/appointments/appointments.component').then(m => m.AppointmentsComponent) }
    ]
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
