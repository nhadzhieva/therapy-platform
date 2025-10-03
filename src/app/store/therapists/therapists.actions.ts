import { createAction, props } from '@ngrx/store';
import { Therapist } from '../../shared/models';

// Load therapists
export const loadTherapists = createAction('[Therapists] Load Therapists');

export const loadTherapistsSuccess = createAction(
  '[Therapists] Load Therapists Success',
  props<{ therapists: Therapist[] }>()
);

export const loadTherapistsFailure = createAction(
  '[Therapists] Load Therapists Failure',
  props<{ error: string }>()
);

// Load single therapist
export const loadTherapist = createAction(
  '[Therapists] Load Therapist',
  props<{ id: string }>()
);

export const loadTherapistSuccess = createAction(
  '[Therapists] Load Therapist Success',
  props<{ therapist: Therapist }>()
);

export const loadTherapistFailure = createAction(
  '[Therapists] Load Therapist Failure',
  props<{ error: string }>()
);

// Update therapist
export const updateTherapist = createAction(
  '[Therapists] Update Therapist',
  props<{ therapist: Partial<Therapist> & { id: string } }>()
);

export const updateTherapistSuccess = createAction(
  '[Therapists] Update Therapist Success',
  props<{ therapist: Therapist }>()
);

export const updateTherapistFailure = createAction(
  '[Therapists] Update Therapist Failure',
  props<{ error: string }>()
);

// Search and filter
export const setSearchQuery = createAction(
  '[Therapists] Set Search Query',
  props<{ query: string }>()
);

export const setFilters = createAction(
  '[Therapists] Set Filters',
  props<{ filters: { specializations?: string[]; minRate?: number; maxRate?: number } }>()
);

export const selectTherapist = createAction(
  '[Therapists] Select Therapist',
  props<{ id: string }>()
);
