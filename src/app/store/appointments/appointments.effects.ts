import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { AppointmentService } from '../../core/services/appointment.service';
import * as AppointmentsActions from './appointments.actions';

@Injectable()
export class AppointmentsEffects {
  private actions$ = inject(Actions);
  private appointmentService = inject(AppointmentService);

  // Load appointments
  loadAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentsActions.loadAppointments),
      switchMap(() =>
        this.appointmentService.getAppointments().pipe(
          map((appointments) =>
            AppointmentsActions.loadAppointmentsSuccess({ appointments })
          ),
          catchError((error) =>
            of(AppointmentsActions.loadAppointmentsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Create appointment
  createAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentsActions.createAppointment),
      switchMap(({ appointment }) =>
        this.appointmentService.createAppointment(appointment).pipe(
          map((appointment) =>
            AppointmentsActions.createAppointmentSuccess({ appointment })
          ),
          catchError((error) =>
            of(AppointmentsActions.createAppointmentFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Update appointment
  updateAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentsActions.updateAppointment),
      switchMap(({ appointment }) =>
        this.appointmentService.updateAppointment(appointment).pipe(
          map((appointment) =>
            AppointmentsActions.updateAppointmentSuccess({ appointment })
          ),
          catchError((error) =>
            of(AppointmentsActions.updateAppointmentFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Cancel appointment
  cancelAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentsActions.cancelAppointment),
      switchMap(({ id }) =>
        this.appointmentService.cancelAppointment(id).pipe(
          map((appointment) =>
            AppointmentsActions.cancelAppointmentSuccess({ appointment })
          ),
          catchError((error) =>
            of(AppointmentsActions.cancelAppointmentFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Confirm appointment
  confirmAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentsActions.confirmAppointment),
      switchMap(({ id }) =>
        this.appointmentService.confirmAppointment(id).pipe(
          map((appointment) =>
            AppointmentsActions.confirmAppointmentSuccess({ appointment })
          ),
          catchError((error) =>
            of(AppointmentsActions.confirmAppointmentFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
