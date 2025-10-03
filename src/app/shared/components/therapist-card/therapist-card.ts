import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Therapist } from '../../models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-therapist-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule
  ],
  templateUrl: './therapist-card.html',
  styleUrl: './therapist-card.scss'
})
export class TherapistCardComponent {
  therapist = input.required<Therapist>();
  viewProfile = output<Therapist>();

  onViewProfile(): void {
    this.viewProfile.emit(this.therapist());
  }
}
