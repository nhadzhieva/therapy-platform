import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppointmentItemComponent } from '../../../shared/components/appointment-item/appointment-item.component';

import {
  logout,
  selectCurrentUser,
  loadAppointments,
  selectUpcomingAppointments,
  selectPendingAppointments,
  selectAppointmentsLoading
} from '../../../store';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    AppointmentItemComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly user = toSignal(this.store.select(selectCurrentUser));
  readonly upcomingAppointments = toSignal(
    this.store.select(selectUpcomingAppointments),
    { initialValue: [] }
  );
  readonly pendingAppointments = toSignal(
    this.store.select(selectPendingAppointments),
    { initialValue: [] }
  );
  readonly loading = toSignal(
    this.store.select(selectAppointmentsLoading),
    { initialValue: false }
  );

  readonly upcomingCount = computed(() => this.upcomingAppointments().length);
  readonly pendingCount = computed(() => this.pendingAppointments().length);
  readonly hasAppointments = computed(() => this.upcomingCount() > 0);

  constructor() {
    this.store.dispatch(loadAppointments());
  }

  logout(): void {
    this.store.dispatch(logout());
  }

  findTherapists(): void {
    this.router.navigate(['/patient/search-therapists']);
  }

  viewAppointments(): void {
    this.router.navigate(['/patient/appointments']);
  }

  viewProfile(): void {
    this.router.navigate(['/patient/profile']);
  }
}
