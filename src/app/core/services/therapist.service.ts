import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Therapist } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class TherapistService {
  private apiService = inject(ApiService);

  getTherapists(): Observable<Therapist[]> {
    return this.apiService.get<Therapist[]>('users?role=therapist');
  }

  getTherapist(id: string): Observable<Therapist> {
    return this.apiService.get<Therapist>(`users/${id}`);
  }

  updateTherapist(therapist: Partial<Therapist> & { id: string }): Observable<Therapist> {
    return this.apiService.patch<Therapist>(`users/${therapist.id}`, therapist);
  }
}
