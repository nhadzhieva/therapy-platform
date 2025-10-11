import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { SessionNotesService } from '../../core/services/session-notes.service';
import * as SessionNotesActions from './session-notes.actions';

@Injectable()
export class SessionNotesEffects {
  private actions$ = inject(Actions);
  private sessionNotesService = inject(SessionNotesService);

  // Load all session notes
  loadSessionNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionNotesActions.loadSessionNotes),
      switchMap(() =>
        this.sessionNotesService.getSessionNotes().pipe(
          map((sessionNotes) =>
            SessionNotesActions.loadSessionNotesSuccess({ sessionNotes })
          ),
          catchError((error) =>
            of(SessionNotesActions.loadSessionNotesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Load session notes by patient
  loadSessionNotesByPatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionNotesActions.loadSessionNotesByPatient),
      switchMap(({ patientId }) =>
        this.sessionNotesService.getSessionNotesByPatient(patientId).pipe(
          map((sessionNotes) =>
            SessionNotesActions.loadSessionNotesSuccess({ sessionNotes })
          ),
          catchError((error) =>
            of(SessionNotesActions.loadSessionNotesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Load session notes by therapist
  loadSessionNotesByTherapist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionNotesActions.loadSessionNotesByTherapist),
      switchMap(({ therapistId }) =>
        this.sessionNotesService.getSessionNotesByTherapist(therapistId).pipe(
          map((sessionNotes) =>
            SessionNotesActions.loadSessionNotesSuccess({ sessionNotes })
          ),
          catchError((error) =>
            of(SessionNotesActions.loadSessionNotesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Create session note
  createSessionNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionNotesActions.createSessionNote),
      switchMap(({ sessionNote }) =>
        this.sessionNotesService.createSessionNote(sessionNote).pipe(
          map((sessionNote) =>
            SessionNotesActions.createSessionNoteSuccess({ sessionNote })
          ),
          catchError((error) =>
            of(SessionNotesActions.createSessionNoteFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Update session note
  updateSessionNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionNotesActions.updateSessionNote),
      switchMap(({ sessionNote }) =>
        this.sessionNotesService.updateSessionNote(sessionNote).pipe(
          map((sessionNote) =>
            SessionNotesActions.updateSessionNoteSuccess({ sessionNote })
          ),
          catchError((error) =>
            of(SessionNotesActions.updateSessionNoteFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Delete session note
  deleteSessionNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionNotesActions.deleteSessionNote),
      switchMap(({ id }) =>
        this.sessionNotesService.deleteSessionNote(id).pipe(
          map(() =>
            SessionNotesActions.deleteSessionNoteSuccess({ id })
          ),
          catchError((error) =>
            of(SessionNotesActions.deleteSessionNoteFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
