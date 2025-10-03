import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Appointment, AppointmentStatus } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiService = inject(ApiService);

  getAppointments(): Observable<Appointment[]> {
    return this.apiService.get<Appointment[]>('appointments');
  }

  getAppointmentsByPatient(patientId: string): Observable<Appointment[]> {
    return this.apiService.get<Appointment[]>(`appointments?patientId=${patientId}`);
  }

  getAppointmentsByTherapist(therapistId: string): Observable<Appointment[]> {
    return this.apiService.get<Appointment[]>(`appointments?therapistId=${therapistId}`);
  }

  createAppointment(appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Observable<Appointment> {
    const newAppointment: Appointment = {
      ...appointment,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return this.apiService.post<Appointment>('appointments', newAppointment);
  }

  updateAppointment(appointment: Partial<Appointment> & { id: string }): Observable<Appointment> {
    return this.apiService.patch<Appointment>(`appointments/${appointment.id}`, {
      ...appointment,
      updatedAt: new Date()
    });
  }

  confirmAppointment(id: string): Observable<Appointment> {
    return this.updateAppointment({ id, status: AppointmentStatus.CONFIRMED });
  }

  cancelAppointment(id: string): Observable<Appointment> {
    return this.updateAppointment({ id, status: AppointmentStatus.CANCELLED });
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}
