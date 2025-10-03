import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { TherapistService } from '../../core/services/therapist.service';
import * as TherapistsActions from './therapists.actions';

@Injectable()
export class TherapistsEffects {
  private actions$ = inject(Actions);
  private therapistService = inject(TherapistService);

  loadTherapists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TherapistsActions.loadTherapists),
      switchMap(() =>
        this.therapistService.getTherapists().pipe(
          map(therapists => TherapistsActions.loadTherapistsSuccess({ therapists })),
          catchError(error =>
            of(TherapistsActions.loadTherapistsFailure({
              error: error.message || 'Failed to load therapists'
            }))
          )
        )
      )
    )
  );

  loadTherapist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TherapistsActions.loadTherapist),
      switchMap(({ id }) =>
        this.therapistService.getTherapist(id).pipe(
          map(therapist => TherapistsActions.loadTherapistSuccess({ therapist })),
          catchError(error =>
            of(TherapistsActions.loadTherapistFailure({
              error: error.message || 'Failed to load therapist'
            }))
          )
        )
      )
    )
  );

  updateTherapist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TherapistsActions.updateTherapist),
      switchMap(({ therapist }) =>
        this.therapistService.updateTherapist(therapist).pipe(
          map(updatedTherapist => TherapistsActions.updateTherapistSuccess({ therapist: updatedTherapist })),
          catchError(error =>
            of(TherapistsActions.updateTherapistFailure({
              error: error.message || 'Failed to update therapist'
            }))
          )
        )
      )
    )
  );
}
