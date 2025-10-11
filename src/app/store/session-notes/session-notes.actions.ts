import { createAction, props } from '@ngrx/store';
import { SessionNote } from '../../shared/models';

// Load session notes
export const loadSessionNotes = createAction('[Session Notes] Load Session Notes');

export const loadSessionNotesSuccess = createAction(
  '[Session Notes] Load Session Notes Success',
  props<{ sessionNotes: SessionNote[] }>()
);

export const loadSessionNotesFailure = createAction(
  '[Session Notes] Load Session Notes Failure',
  props<{ error: string }>()
);

// Load session notes by patient
export const loadSessionNotesByPatient = createAction(
  '[Session Notes] Load Session Notes By Patient',
  props<{ patientId: string }>()
);

// Load session notes by therapist
export const loadSessionNotesByTherapist = createAction(
  '[Session Notes] Load Session Notes By Therapist',
  props<{ therapistId: string }>()
);

// Create session note
export const createSessionNote = createAction(
  '[Session Notes] Create Session Note',
  props<{ sessionNote: Omit<SessionNote, 'id' | 'createdAt' | 'updatedAt'> }>()
);

export const createSessionNoteSuccess = createAction(
  '[Session Notes] Create Session Note Success',
  props<{ sessionNote: SessionNote }>()
);

export const createSessionNoteFailure = createAction(
  '[Session Notes] Create Session Note Failure',
  props<{ error: string }>()
);

// Update session note
export const updateSessionNote = createAction(
  '[Session Notes] Update Session Note',
  props<{ sessionNote: Partial<SessionNote> & { id: string } }>()
);

export const updateSessionNoteSuccess = createAction(
  '[Session Notes] Update Session Note Success',
  props<{ sessionNote: SessionNote }>()
);

export const updateSessionNoteFailure = createAction(
  '[Session Notes] Update Session Note Failure',
  props<{ error: string }>()
);

// Delete session note
export const deleteSessionNote = createAction(
  '[Session Notes] Delete Session Note',
  props<{ id: string }>()
);

export const deleteSessionNoteSuccess = createAction(
  '[Session Notes] Delete Session Note Success',
  props<{ id: string }>()
);

export const deleteSessionNoteFailure = createAction(
  '[Session Notes] Delete Session Note Failure',
  props<{ error: string }>()
);
