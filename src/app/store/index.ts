import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { therapistsReducer } from './therapists/therapists.reducer';
import { appointmentsReducer } from './appointments/appointments.reducer';
import { sessionNotesReducer } from './session-notes/session-notes.reducer';
import { AuthState } from './auth/auth.state';
import { TherapistsState } from './therapists/therapists.state';
import { AppointmentsState } from './appointments/appointments.state';
import { SessionNotesState } from './session-notes/session-notes.state';

export interface AppState {
  auth: AuthState;
  therapists: TherapistsState;
  appointments: AppointmentsState;
  sessionNotes: SessionNotesState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  therapists: therapistsReducer,
  appointments: appointmentsReducer,
  sessionNotes: sessionNotesReducer
};

// Re-export all actions
export * from './auth/auth.actions';
export * from './therapists/therapists.actions';
export * from './appointments/appointments.actions';
export * from './session-notes/session-notes.actions';

// Re-export all selectors
export * from './auth/auth.selectors';
export * from './therapists/therapists.selectors';
export * from './appointments/appointments.selectors';
export * from './session-notes/session-notes.selectors';
