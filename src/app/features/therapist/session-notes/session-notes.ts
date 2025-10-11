import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {
  logout,
  selectCurrentUser,
  loadSessionNotes,
  selectAllSessionNotes,
  selectSessionNotesLoading,
  selectSessionNotesByTherapist,
  deleteSessionNote
} from '../../../store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { SessionNote } from '../../../shared/models';

@Component({
  selector: 'app-session-notes',
  imports: [MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    DatePipe],
  templateUrl: './session-notes.html',
  styleUrl: './session-notes.scss'
})
export class SessionNotes {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly user = toSignal(this.store.select(selectCurrentUser));
  readonly sessionNotes = toSignal(this.store.select(selectSessionNotesByTherapist(this.user()?.id || '')), { initialValue: [] })
  readonly loading = toSignal(this.store.select(selectSessionNotesLoading), { initialValue: false });

  constructor() {
    this.store.dispatch(loadSessionNotes());
  }

  goBack(): void {
    this.router.navigate(['/therapist/dashboard']);
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }

  onEditNote(note: SessionNote): void {
    // TODO: Navigate to edit form or open dialog
    console.log('Edit note:', note);
  }

  onDeleteNote(note: SessionNote): void {
    if (confirm(`Are you sure you want to delete this session note?`)) {
      this.store.dispatch(deleteSessionNote({ id: note.id }));
    }
  }
}
