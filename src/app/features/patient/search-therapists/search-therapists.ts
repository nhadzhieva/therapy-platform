import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Therapist } from '../../../shared/models';
import { logout, selectCurrentUser } from '../../../store';
import { TherapistService } from '../../../core/services/therapist.service';

@Component({
  selector: 'app-search-therapists',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './search-therapists.html',
  styleUrls: ['./search-therapists.scss']
})
export class SearchTherapistsComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly therapistService = inject(TherapistService);

  readonly user = toSignal(this.store.select(selectCurrentUser));
  readonly searchControl = new FormControl('');

  readonly allTherapists = signal<Therapist[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  // Convert search control changes to a signal
  private readonly searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ),
    { initialValue: '' }
  );

  readonly filteredTherapists = computed(() => {
    const search = this.searchTerm()?.toLowerCase() || '';
    const therapists = this.allTherapists();

    if (!search) {
      return therapists;
    }

    return therapists.filter(therapist =>
      therapist.firstName.toLowerCase().includes(search) ||
      therapist.lastName.toLowerCase().includes(search) ||
      therapist.specialization.some(spec => spec.toLowerCase().includes(search)) ||
      therapist.bio.toLowerCase().includes(search)
    );
  });

  constructor() {
    this.loadTherapists();
  }

  loadTherapists(): void {
    this.loading.set(true);
    this.error.set(null);

    this.therapistService.getTherapists().subscribe({
      next: (therapists) => {
        this.allTherapists.set(therapists);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load therapists. Please try again.');
        this.loading.set(false);
        console.error('Error loading therapists:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/patient/dashboard']);
  }

  logout(): void {
    this.store.dispatch(logout());
  }

  viewTherapistDetails(therapistId: string): void {
    this.router.navigate(['/patient/therapist', therapistId]);
  }

  bookAppointment(therapistId: string): void {
    this.router.navigate(['/patient/schedule-appointment', therapistId]);
  }
}
