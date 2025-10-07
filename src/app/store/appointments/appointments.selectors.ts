import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppointmentsState, appointmentsAdapter } from './appointments.state';
import { AppointmentStatus } from '../../shared/models';

export const selectAppointmentsState = createFeatureSelector<AppointmentsState>('appointments');

const { selectAll, selectEntities } = appointmentsAdapter.getSelectors();

export const selectAllAppointments = createSelector(
  selectAppointmentsState,
  selectAll
);

export const selectAppointmentEntities = createSelector(
  selectAppointmentsState,
  selectEntities
);

export const selectAppointmentsLoading = createSelector(
  selectAppointmentsState,
  (state: AppointmentsState) => state.loading
);

export const selectAppointmentsError = createSelector(
  selectAppointmentsState,
  (state: AppointmentsState) => state.error
);

export const selectUpcomingAppointments = createSelector(
  selectAllAppointments,
  (appointments) => {
    const now = new Date();
    return appointments.filter(apt => {
      const aptDate = new Date(`${apt.date}T${apt.startTime}`);
      return aptDate >= now && apt.status !== AppointmentStatus.CANCELLED;
    });
  }
);

export const selectPastAppointments = createSelector(
  selectAllAppointments,
  (appointments) => {
    const now = new Date();
    return appointments.filter(apt => {
      const aptDate = new Date(`${apt.date}T${apt.startTime}`);
      return aptDate < now || apt.status === AppointmentStatus.COMPLETED;
    });
  }
);

export const selectAppointmentsByPatient = (patientId: string) => createSelector(
  selectAllAppointments,
  (appointments) => appointments.filter(apt => apt.patientId === patientId)
);

export const selectAppointmentsByTherapist = (therapistId: string) => createSelector(
  selectAllAppointments,
  (appointments) => appointments.filter(apt => apt.therapistId === therapistId)
);

export const selectPendingAppointments = createSelector(
  selectAllAppointments,
  (appointments) => appointments.filter(apt => apt.status === AppointmentStatus.PENDING)
);

// Per-appointment operation state selectors
export const selectCancellingIds = createSelector(
  selectAppointmentsState,
  (state: AppointmentsState) => state.cancellingIds
);

export const selectConfirmingIds = createSelector(
  selectAppointmentsState,
  (state: AppointmentsState) => state.confirmingIds
);

export const selectUpdatingIds = createSelector(
  selectAppointmentsState,
  (state: AppointmentsState) => state.updatingIds
);

export const selectOperationErrors = createSelector(
  selectAppointmentsState,
  (state: AppointmentsState) => state.operationErrors
);

// Check if specific appointment is being cancelled
export const isAppointmentCancelling = (appointmentId: string) => createSelector(
  selectCancellingIds,
  (cancellingIds) => cancellingIds.includes(appointmentId)
);

// Check if specific appointment is being confirmed
export const isAppointmentConfirming = (appointmentId: string) => createSelector(
  selectConfirmingIds,
  (confirmingIds) => confirmingIds.includes(appointmentId)
);

// Check if specific appointment is being updated
export const isAppointmentUpdating = (appointmentId: string) => createSelector(
  selectUpdatingIds,
  (updatingIds) => updatingIds.includes(appointmentId)
);

// Get error for specific appointment
export const selectAppointmentError = (appointmentId: string) => createSelector(
  selectOperationErrors,
  (errors) => errors[appointmentId] || null
);

// Check if any operation is in progress for appointment
export const isAppointmentBusy = (appointmentId: string) => createSelector(
  selectCancellingIds,
  selectConfirmingIds,
  selectUpdatingIds,
  (cancellingIds, confirmingIds, updatingIds) =>
    cancellingIds.includes(appointmentId) ||
    confirmingIds.includes(appointmentId) ||
    updatingIds.includes(appointmentId)
);
