import { createReducer, on } from '@ngrx/store';
import { AppointmentsState, initialAppointmentsState, appointmentsAdapter } from './appointments.state';
import * as AppointmentsActions from './appointments.actions';

export const appointmentsReducer = createReducer(
  initialAppointmentsState,

  // Load appointments
  on(AppointmentsActions.loadAppointments, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AppointmentsActions.loadAppointmentsSuccess, (state, { appointments }) =>
    appointmentsAdapter.setAll(appointments, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(AppointmentsActions.loadAppointmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create appointment
  on(AppointmentsActions.createAppointment, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AppointmentsActions.createAppointmentSuccess, (state, { appointment }) =>
    appointmentsAdapter.addOne(appointment, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(AppointmentsActions.createAppointmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update appointment
  on(AppointmentsActions.updateAppointment, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AppointmentsActions.updateAppointmentSuccess, (state, { appointment }) =>
    appointmentsAdapter.upsertOne(appointment, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(AppointmentsActions.updateAppointmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Cancel appointment
  on(AppointmentsActions.cancelAppointment, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AppointmentsActions.cancelAppointmentSuccess, (state, { appointment }) =>
    appointmentsAdapter.upsertOne(appointment, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(AppointmentsActions.cancelAppointmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Confirm appointment
  on(AppointmentsActions.confirmAppointment, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AppointmentsActions.confirmAppointmentSuccess, (state, { appointment }) =>
    appointmentsAdapter.upsertOne(appointment, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(AppointmentsActions.confirmAppointmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
