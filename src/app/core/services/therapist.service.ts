import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Therapist, AvailabilitySlot } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class TherapistService {
  private apiService = inject(ApiService);

  getTherapists(): Observable<Therapist[]> {
    return this.apiService.get<Therapist[]>('users?role=therapist').pipe(
      switchMap(therapists => {
        // Fetch availability for all therapists
        const availabilityRequests = therapists.map(therapist =>
          this.apiService.get<AvailabilitySlot[]>(`availability?therapistId=${therapist.id}`).pipe(
            map(availability => ({ ...therapist, availability }))
          )
        );
        return forkJoin(availabilityRequests.length > 0 ? availabilityRequests : [therapists]);
      })
    );
  }

  getTherapist(id: string): Observable<Therapist> {
    return this.apiService.get<Therapist>(`users/${id}`).pipe(
      switchMap(therapist =>
        this.apiService.get<AvailabilitySlot[]>(`availability?therapistId=${id}`).pipe(
          map(availability => ({ ...therapist, availability }))
        )
      )
    );
  }

  updateTherapist(therapist: Partial<Therapist> & { id: string }): Observable<Therapist> {
    return this.apiService.patch<Therapist>(`users/${therapist.id}`, therapist);
  }
}
