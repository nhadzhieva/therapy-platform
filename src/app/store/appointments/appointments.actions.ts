import { createAction, props } from '@ngrx/store';
import { Appointment } from '../../shared/models';

// Load appointments
export const loadAppointments = createAction('[Appointments] Load Appointments');

export const loadAppointmentsSuccess = createAction(
  '[Appointments] Load Appointments Success',
  props<{ appointments: Appointment[] }>()
);

export const loadAppointmentsFailure = createAction(
  '[Appointments] Load Appointments Failure',
  props<{ error: string }>()
);

// Create appointment
export const createAppointment = createAction(
  '[Appointments] Create Appointment',
  props<{ appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'> }>()
);

export const createAppointmentSuccess = createAction(
  '[Appointments] Create Appointment Success',
  props<{ appointment: Appointment }>()
);

export const createAppointmentFailure = createAction(
  '[Appointments] Create Appointment Failure',
  props<{ error: string }>()
);

// Update appointment
export const updateAppointment = createAction(
  '[Appointments] Update Appointment',
  props<{ appointment: Partial<Appointment> & { id: string } }>()
);

export const updateAppointmentSuccess = createAction(
  '[Appointments] Update Appointment Success',
  props<{ appointment: Appointment }>()
);

export const updateAppointmentFailure = createAction(
  '[Appointments] Update Appointment Failure',
  props<{ error: string }>()
);

// Cancel appointment
export const cancelAppointment = createAction(
  '[Appointments] Cancel Appointment',
  props<{ id: string }>()
);

export const cancelAppointmentSuccess = createAction(
  '[Appointments] Cancel Appointment Success',
  props<{ appointment: Appointment }>()
);

export const cancelAppointmentFailure = createAction(
  '[Appointments] Cancel Appointment Failure',
  props<{ error: string }>()
);

// Confirm appointment (therapist only)
export const confirmAppointment = createAction(
  '[Appointments] Confirm Appointment',
  props<{ id: string }>()
);

export const confirmAppointmentSuccess = createAction(
  '[Appointments] Confirm Appointment Success',
  props<{ appointment: Appointment }>()
);

export const confirmAppointmentFailure = createAction(
  '[Appointments] Confirm Appointment Failure',
  props<{ error: string }>()
);
