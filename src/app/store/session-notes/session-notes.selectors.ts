import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SessionNotesState, sessionNotesAdapter } from './session-notes.state';

export const selectSessionNotesState = createFeatureSelector<SessionNotesState>('sessionNotes');

const { selectAll, selectEntities } = sessionNotesAdapter.getSelectors();

export const selectAllSessionNotes = createSelector(
  selectSessionNotesState,
  selectAll
);

export const selectSessionNoteEntities = createSelector(
  selectSessionNotesState,
  selectEntities
);

export const selectSessionNotesLoading = createSelector(
  selectSessionNotesState,
  (state: SessionNotesState) => state.loading
);

export const selectSessionNotesError = createSelector(
  selectSessionNotesState,
  (state: SessionNotesState) => state.error
);

export const selectSessionNotesByPatient = (patientId: string) => createSelector(
  selectAllSessionNotes,
  (sessionNotes) => sessionNotes.filter(note => note.patientId === patientId)
);

export const selectSessionNotesByTherapist = (therapistId: string) => createSelector(
  selectAllSessionNotes,
  (sessionNotes) => sessionNotes.filter(note => note.therapistId === therapistId)
);

export const selectSessionNotesByAppointment = (appointmentId: string) => createSelector(
  selectAllSessionNotes,
  (sessionNotes) => sessionNotes.filter(note => note.appointmentId === appointmentId)
);

export const selectSessionNoteById = (id: string) => createSelector(
  selectSessionNoteEntities,
  (entities) => entities[id]
);
