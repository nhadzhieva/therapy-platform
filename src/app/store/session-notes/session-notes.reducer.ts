import { createReducer, on } from '@ngrx/store';
import { SessionNotesState, initialSessionNotesState, sessionNotesAdapter } from './session-notes.state';
import * as SessionNotesActions from './session-notes.actions';

export const sessionNotesReducer = createReducer(
  initialSessionNotesState,

  // Load session notes
  on(SessionNotesActions.loadSessionNotes, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SessionNotesActions.loadSessionNotesByPatient, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SessionNotesActions.loadSessionNotesByTherapist, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SessionNotesActions.loadSessionNotesSuccess, (state, { sessionNotes }) =>
    sessionNotesAdapter.setAll(sessionNotes, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(SessionNotesActions.loadSessionNotesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create session note
  on(SessionNotesActions.createSessionNote, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SessionNotesActions.createSessionNoteSuccess, (state, { sessionNote }) =>
    sessionNotesAdapter.addOne(sessionNote, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(SessionNotesActions.createSessionNoteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update session note
  on(SessionNotesActions.updateSessionNote, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SessionNotesActions.updateSessionNoteSuccess, (state, { sessionNote }) =>
    sessionNotesAdapter.upsertOne(sessionNote, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(SessionNotesActions.updateSessionNoteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete session note
  on(SessionNotesActions.deleteSessionNote, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SessionNotesActions.deleteSessionNoteSuccess, (state, { id }) =>
    sessionNotesAdapter.removeOne(id, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(SessionNotesActions.deleteSessionNoteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
