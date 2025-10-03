import { Component, inject, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, filter, take } from 'rxjs/operators';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  selectSelectedTherapist,
  selectCurrentUser,
  createAppointment,
  createAppointmentSuccess,
  loadTherapist,
  selectTherapist,
  logout
} from '../../../store';
import { AppointmentStatus } from '../../../shared/models';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-schedule-appointment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './schedule-appointment.html',
  styleUrls: ['./schedule-appointment.scss']
})
export class ScheduleAppointmentComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  private readonly actions$ = inject(Actions);

  readonly user = toSignal(this.store.select(selectCurrentUser));
  readonly therapist = toSignal(this.store.select(selectSelectedTherapist));

  readonly therapistId = toSignal(
    this.route.params.pipe(map(params => params['id']))
  );

  readonly fullName = computed(() => {
    const t = this.therapist();
    return t ? `Dr. ${t.firstName} ${t.lastName}` : '';
  });

  dateFormGroup: FormGroup;
  timeFormGroup: FormGroup;
  detailsFormGroup: FormGroup;

  selectedDate = signal<Date | null>(null);
  selectedTimeSlot = signal<{ start: string; end: string } | null>(null);

  availableTimeSlots = computed(() => {
    const date = this.selectedDate();
    const therapist = this.therapist();

    if (!date || !therapist?.availability) {
      return [];
    }

    const dayOfWeek = date.getDay();
    const availability = therapist.availability.filter(
      slot => slot.dayOfWeek === dayOfWeek && slot.isAvailable
    );

    const slots: { start: string; end: string; display: string }[] = [];
    availability.forEach(avail => {
      const [startHour] = avail.startTime.split(':').map(Number);
      const [endHour] = avail.endTime.split(':').map(Number);

      for (let hour = startHour; hour < endHour; hour++) {
        const start = `${hour.toString().padStart(2, '0')}:00`;
        const end = `${(hour + 1).toString().padStart(2, '0')}:00`;
        const display = `${start} - ${end}`;
        slots.push({ start, end, display });
      }
    });

    return slots;
  });

  availableDaysOfWeek = computed(() => {
    const therapist = this.therapist();
    if (!therapist?.availability) {
      return new Set<number>();
    }
    return new Set(
      therapist.availability
        .filter(slot => slot.isAvailable)
        .map(slot => slot.dayOfWeek)
    );
  });

  minDate = new Date();

  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    const dayOfWeek = date.getDay();
    return this.availableDaysOfWeek().has(dayOfWeek);
  };

  // Date class function to add custom classes to calendar dates
  dateClass = (date: Date): string => {
    const dayOfWeek = date.getDay();
    return this.availableDaysOfWeek().has(dayOfWeek) ? 'available-date' : '';
  };

  constructor() {
    this.dateFormGroup = this.fb.group({
      date: [null, Validators.required]
    });

    this.timeFormGroup = this.fb.group({
      timeSlot: [null, Validators.required]
    });

    this.detailsFormGroup = this.fb.group({
      reason: ['', [Validators.required, Validators.minLength(10)]],
      notes: ['']
    });

    effect(() => {
      const therapistId = this.therapistId();
      if (therapistId) {
        this.store.dispatch(selectTherapist({ id: therapistId }));
        this.store.dispatch(loadTherapist({ id: therapistId }));
      }
    });
  }

  onDateSelected(date: Date | null): void {
    this.selectedDate.set(date);
  }

  onTimeSlotSelected(slot: { start: string; end: string }): void {
    this.selectedTimeSlot.set(slot);
    this.timeFormGroup.patchValue({ timeSlot: slot });
  }

  viewProfile(): void {
    const therapistId = this.therapistId();
    if (therapistId) {
      this.router.navigate(['/patient/therapist', therapistId]);
    }
  }

  goBack(): void {
    const therapistId = this.therapistId();
    if (therapistId) {
      this.router.navigate(['/patient/therapist', therapistId]);
    } else {
      this.router.navigate(['/patient/search-therapists']);
    }
  }

  logout(): void {
    this.store.dispatch(logout());
  }

  submitAppointment(): void {
    if (this.dateFormGroup.valid && this.timeFormGroup.valid && this.detailsFormGroup.valid) {
      const user = this.user();
      const therapistId = this.therapistId();
      const date = this.selectedDate();
      const timeSlot = this.selectedTimeSlot();
      const details = this.detailsFormGroup.value;

      if (!user || !therapistId || !date || !timeSlot) {
        return;
      }

      const appointment = {
        patientId: user.id,
        therapistId,
        date: date.toISOString().split('T')[0],
        startTime: timeSlot.start,
        endTime: timeSlot.end,
        status: AppointmentStatus.PENDING,
        reason: details.reason,
        notes: details.notes || undefined
      };

      this.store.dispatch(createAppointment({ appointment }));

      setTimeout(() => {
        this.snackBar.open('Appointment requested successfully! Waiting for therapist confirmation.', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.router.navigate(['/patient/appointments']);
      }, 500);
    }
  }
}
