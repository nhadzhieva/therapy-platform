import { createReducer, on } from '@ngrx/store';
import { TherapistsState, initialTherapistsState, therapistsAdapter } from './therapists.state';
import * as TherapistsActions from './therapists.actions';

export const therapistsReducer = createReducer(
  initialTherapistsState,

  // Load therapists
  on(TherapistsActions.loadTherapists, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TherapistsActions.loadTherapistsSuccess, (state, { therapists }) =>
    therapistsAdapter.setAll(therapists, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(TherapistsActions.loadTherapistsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load single therapist
  on(TherapistsActions.loadTherapist, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TherapistsActions.loadTherapistSuccess, (state, { therapist }) =>
    therapistsAdapter.upsertOne(therapist, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(TherapistsActions.loadTherapistFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update therapist
  on(TherapistsActions.updateTherapist, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TherapistsActions.updateTherapistSuccess, (state, { therapist }) =>
    therapistsAdapter.upsertOne(therapist, {
      ...state,
      loading: false,
      error: null
    })
  ),

  on(TherapistsActions.updateTherapistFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Search and filter
  on(TherapistsActions.setSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query
  })),

  on(TherapistsActions.setFilters, (state, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters }
  })),

  on(TherapistsActions.selectTherapist, (state, { id }) => ({
    ...state,
    selectedTherapistId: id
  }))
);
