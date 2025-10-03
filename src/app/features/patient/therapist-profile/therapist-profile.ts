import { Component, inject, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { map } from 'rxjs/operators';

import {
  logout,
  selectCurrentUser,
  loadTherapist,
  selectSelectedTherapist,
  selectTherapistsLoading,
  selectTherapistsError,
  selectTherapist
} from '../../../store';

@Component({
  selector: 'app-therapist-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  templateUrl: './therapist-profile.html',
  styleUrls: ['./therapist-profile.scss']
})
export class TherapistProfileComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly user = toSignal(this.store.select(selectCurrentUser));

  // Get therapist ID from route params as a signal
  readonly therapistId = toSignal(
    this.route.params.pipe(map(params => params['id']))
  );

  // Select therapist from store
  readonly therapist = toSignal(this.store.select(selectSelectedTherapist));

  // Loading and error states from store
  readonly loading = toSignal(this.store.select(selectTherapistsLoading), { initialValue: false });
  readonly error = toSignal(this.store.select(selectTherapistsError), { initialValue: null });

  // Computed values for better template readability
  readonly fullName = computed(() => {
    const t = this.therapist();
    return t ? `Dr. ${t.firstName} ${t.lastName}` : '';
  });

  readonly isDataLoaded = computed(() => !!this.therapist());

  constructor() {
    // Load therapist when ID changes
    effect(() => {
      const id = this.therapistId();
      if (id) {
        this.store.dispatch(selectTherapist({ id }));
        this.store.dispatch(loadTherapist({ id }));
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/patient/search-therapists']);
  }

  logout(): void {
    this.store.dispatch(logout());
  }

  bookAppointment(): void {
    const therapistId = this.therapist()?.id;
    if (therapistId) {
      this.router.navigate(['/patient/schedule-appointment', therapistId]);
    }
  }

  contactTherapist(): void {
    const therapist = this.therapist();
    if (therapist?.email) {
      window.location.href = `mailto:${therapist.email}`;
    }
  }

  getDayName(dayOfWeek: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek] || '';
  }
}
