import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-appointment-item',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './appointment-item.component.html',
  styleUrl: './appointment-item.component.scss'
})
export class AppointmentItemComponent {
  appointment = input.required<Appointment>();
}
