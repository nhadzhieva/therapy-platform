import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { logout, selectCurrentUser } from '../../../store';

@Component({
  selector: 'app-therapist-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  user = toSignal(this.store.select(selectCurrentUser));

  onLogout(): void {
    this.store.dispatch(logout());
  }

  viewSessionNotes(): void {
    this.router.navigate(['/therapist/session-notes']);
  }
}
