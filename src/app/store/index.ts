import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { therapistsReducer } from './therapists/therapists.reducer';
import { appointmentsReducer } from './appointments/appointments.reducer';
import { AuthState } from './auth/auth.state';
import { TherapistsState } from './therapists/therapists.state';
import { AppointmentsState } from './appointments/appointments.state';

export interface AppState {
  auth: AuthState;
  therapists: TherapistsState;
  appointments: AppointmentsState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  therapists: therapistsReducer,
  appointments: appointmentsReducer
};

// Re-export all actions
export * from './auth/auth.actions';
export * from './therapists/therapists.actions';
export * from './appointments/appointments.actions';

// Re-export all selectors
export * from './auth/auth.selectors';
export * from './therapists/therapists.selectors';
export * from './appointments/appointments.selectors';
