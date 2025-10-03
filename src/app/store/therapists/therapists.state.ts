import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Therapist } from '../../shared/models';

export interface TherapistsState extends EntityState<Therapist> {
  loading: boolean;
  error: string | null;
  selectedTherapistId: string | null;
  searchQuery: string;
  filters: {
    specializations: string[];
    minRate?: number;
    maxRate?: number;
  };
}

export const therapistsAdapter: EntityAdapter<Therapist> = createEntityAdapter<Therapist>({
  selectId: (therapist: Therapist) => therapist.id,
});

export const initialTherapistsState: TherapistsState = therapistsAdapter.getInitialState({
  loading: false,
  error: null,
  selectedTherapistId: null,
  searchQuery: '',
  filters: {
    specializations: [],
  }
});
