import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SessionNote } from '../../shared/models';

export interface SessionNotesState extends EntityState<SessionNote> {
  loading: boolean;
  error: string | null;
}

export const sessionNotesAdapter: EntityAdapter<SessionNote> = createEntityAdapter<SessionNote>({
  selectId: (note: SessionNote) => note.id,
  sortComparer: (a: SessionNote, b: SessionNote) => {
    const dateA = new Date(a.createdAt || new Date());
    const dateB = new Date(b.createdAt || new Date());
    return dateB.getTime() - dateA.getTime();
  }
});

export const initialSessionNotesState: SessionNotesState = sessionNotesAdapter.getInitialState({
  loading: false,
  error: null
});
