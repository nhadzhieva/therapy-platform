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
