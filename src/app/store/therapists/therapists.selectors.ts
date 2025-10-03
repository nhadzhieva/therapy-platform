import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TherapistsState, therapistsAdapter } from './therapists.state';

export const selectTherapistsState = createFeatureSelector<TherapistsState>('therapists');

const { selectAll, selectEntities } = therapistsAdapter.getSelectors();

export const selectAllTherapists = createSelector(
  selectTherapistsState,
  selectAll
);

export const selectTherapistEntities = createSelector(
  selectTherapistsState,
  selectEntities
);

export const selectTherapistsLoading = createSelector(
  selectTherapistsState,
  (state: TherapistsState) => state.loading
);

export const selectTherapistsError = createSelector(
  selectTherapistsState,
  (state: TherapistsState) => state.error
);

export const selectSearchQuery = createSelector(
  selectTherapistsState,
  (state: TherapistsState) => state.searchQuery
);

export const selectFilters = createSelector(
  selectTherapistsState,
  (state: TherapistsState) => state.filters
);

export const selectSelectedTherapistId = createSelector(
  selectTherapistsState,
  (state: TherapistsState) => state.selectedTherapistId
);

export const selectSelectedTherapist = createSelector(
  selectTherapistEntities,
  selectSelectedTherapistId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);

export const selectFilteredTherapists = createSelector(
  selectAllTherapists,
  selectSearchQuery,
  selectFilters,
  (therapists, searchQuery, filters) => {
    let filtered = [...therapists];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t =>
        t.firstName.toLowerCase().includes(query) ||
        t.lastName.toLowerCase().includes(query) ||
        t.specialization.some(s => s.toLowerCase().includes(query)) ||
        t.bio.toLowerCase().includes(query)
      );
    }

    // Apply specialization filter
    if (filters.specializations.length > 0) {
      filtered = filtered.filter(t =>
        filters.specializations.some(spec =>
          t.specialization.includes(spec)
        )
      );
    }

    // Apply rate filter
    if (filters.minRate !== undefined) {
      filtered = filtered.filter(t => t.hourlyRate >= filters.minRate!);
    }

    if (filters.maxRate !== undefined) {
      filtered = filtered.filter(t => t.hourlyRate <= filters.maxRate!);
    }

    return filtered;
  }
);
