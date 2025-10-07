import { Component, inject } from '@angular/core';
import { Appointment } from '../../models';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-cancel-appointment-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './cancel-appointment-dialog.html',
  styleUrl: './cancel-appointment-dialog.scss'
})
export class CancelAppointmentDialog {
  readonly data = inject<{appointment: Appointment}>(MAT_DIALOG_DATA);
  readonly appointment = this.data.appointment;

}
