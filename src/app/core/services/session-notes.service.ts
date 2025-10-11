import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { SessionNote } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class SessionNotesService {
  private apiService = inject(ApiService);

  getSessionNotes(): Observable<SessionNote[]> {
    return this.apiService.get<SessionNote[]>('sessionNotes');
  }

  getSessionNotesByPatient(patientId: string): Observable<SessionNote[]> {
    return this.apiService.get<SessionNote[]>(`sessionNotes?patientId=${patientId}`);
  }

  getSessionNotesByTherapist(therapistId: string): Observable<SessionNote[]> {
    return this.apiService.get<SessionNote[]>(`sessionNotes?therapistId=${therapistId}`);
  }

  getSessionNotesByAppointment(appointmentId: string): Observable<SessionNote[]> {
    return this.apiService.get<SessionNote[]>(`sessionNotes?appointmentId=${appointmentId}`);
  }

  getSessionNoteById(id: string): Observable<SessionNote> {
    return this.apiService.get<SessionNote>(`sessionNotes/${id}`);
  }

  createSessionNote(sessionNote: Omit<SessionNote, 'id' | 'createdAt' | 'updatedAt'>): Observable<SessionNote> {
    const newSessionNote: SessionNote = {
      ...sessionNote,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return this.apiService.post<SessionNote>('sessionNotes', newSessionNote);
  }

  updateSessionNote(sessionNote: Partial<SessionNote> & { id: string }): Observable<SessionNote> {
    return this.apiService.patch<SessionNote>(`sessionNotes/${sessionNote.id}`, {
      ...sessionNote,
      updatedAt: new Date().toISOString()
    });
  }

  deleteSessionNote(id: string): Observable<void> {
    return this.apiService.delete<void>(`sessionNotes/${id}`);
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}