import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { CancelAppointmentDialog } from '../../../shared/components/cancel-appointment-dialog/cancel-appointment-dialog';
import { firstValueFrom } from 'rxjs';  

import {
  logout,
  selectCurrentUser,
  loadAppointments,
  cancelAppointment,
  selectUpcomingAppointments,
  selectPastAppointments,
  selectPendingAppointments,
  selectAppointmentsLoading,
  selectCancellingIds,
  selectOperationErrors
} from '../../../store';
import { Appointment, AppointmentStatus } from '../../../shared/models';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTabsModule
],
  templateUrl: './appointments.html',
  styleUrls: ['./appointments.scss']
})
export class AppointmentsComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly matDialog = inject(MatDialog);

  readonly user = toSignal(this.store.select(selectCurrentUser));
  readonly loading = toSignal(this.store.select(selectAppointmentsLoading), { initialValue: false });
  readonly cancellingIds = toSignal(this.store.select(selectCancellingIds), {initialValue: []});
  readonly operationErrors = toSignal(this.store.select(selectOperationErrors), { initialValue: {} as {[key: string]: string | null} });

  readonly AppointmentStatus = AppointmentStatus;

  // Use NgRx selectors directly
  readonly upcomingAppointments = toSignal(
    this.store.select(selectUpcomingAppointments),
    { initialValue: [] }
  );

  readonly pendingAppointments = toSignal(
    this.store.select(selectPendingAppointments),
    { initialValue: [] }
  );

  readonly pastAppointments = toSignal(
    this.store.select(selectPastAppointments),
    { initialValue: [] }
  );

  readonly cancelledAppointments = computed(() => {
    return this.pastAppointments().filter(
      apt => apt.status === AppointmentStatus.CANCELLED
    );
  });

  constructor() {
    // Load appointments when component initializes
    this.store.dispatch(loadAppointments());
  }

  goBack(): void {
    this.router.navigate(['/patient/dashboard']);
  }

  logout(): void {
    this.store.dispatch(logout());
  }

  async cancelAppointment(appointment: Appointment): Promise<void> {
    const dialogRef = this.matDialog.open(CancelAppointmentDialog, {
      data: {appointment},
      disableClose: true,      
    });

    const result = await firstValueFrom(dialogRef.afterClosed());
    if(result === true) {
      this.store.dispatch(cancelAppointment({ id: appointment.id }));
    }
  }

  getStatusColor(status: AppointmentStatus): string {
    switch (status) {
      case AppointmentStatus.CONFIRMED:
        return 'primary';
      case AppointmentStatus.PENDING:
        return 'accent';
      case AppointmentStatus.CANCELLED:
        return 'warn';
      case AppointmentStatus.COMPLETED:
        return '';
      default:
        return '';
    }
  }

  getStatusIcon(status: AppointmentStatus): string {
    switch (status) {
      case AppointmentStatus.CONFIRMED:
        return 'check_circle';
      case AppointmentStatus.PENDING:
        return 'schedule';
      case AppointmentStatus.CANCELLED:
        return 'cancel';
      case AppointmentStatus.COMPLETED:
        return 'done_all';
      default:
        return 'help';
    }
  }

  canCancel(appointment: Appointment): boolean {
    return appointment.status === AppointmentStatus.PENDING ||
           appointment.status === AppointmentStatus.CONFIRMED;
  }

  isAppointmentCanceling(appointment: Appointment): boolean {
    return this.cancellingIds().includes(appointment.id);
  }

  getAppointmentCancelError(appointmentId: string): string | null {
    return this.operationErrors()[appointmentId] || null;
  }
}
