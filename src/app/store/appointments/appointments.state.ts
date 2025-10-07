import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Appointment } from '../../shared/models';

export interface AppointmentsState extends EntityState<Appointment> {
  loading: boolean;  // Global loading for fetching all appointments
  error: string | null;

  // Per-appointment operation tracking
  cancellingIds: string[];  // IDs of appointments being cancelled
  confirmingIds: string[];  // IDs of appointments being confirmed
  updatingIds: string[];    // IDs of appointments being updated

  // Per-appointment errors
  operationErrors: { [appointmentId: string]: string | null };
}

export const appointmentsAdapter: EntityAdapter<Appointment> = createEntityAdapter<Appointment>({
  selectId: (appointment: Appointment) => appointment.id,
  sortComparer: (a: Appointment, b: Appointment) => {
    const dateA = new Date(`${a.date}T${a.startTime}`);
    const dateB = new Date(`${b.date}T${b.startTime}`);
    return dateB.getTime() - dateA.getTime();
  }
});

export const initialAppointmentsState: AppointmentsState = appointmentsAdapter.getInitialState({
  loading: false,
  error: null,
  cancellingIds: [],
  confirmingIds: [],
  updatingIds: [],
  operationErrors: {}
});
