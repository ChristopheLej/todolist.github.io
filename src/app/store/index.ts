import { ActionReducerMap, createAction, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '@environment/environment';
import * as fromTodo from './reducers/todo.reducer';
import * as fromLayout from './reducers/layout.reducer';

export interface ApplicationState {
  todo: fromTodo.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  todo: fromTodo.reducer,
  layout: fromLayout.reducer
};

export const metaReducers: MetaReducer<ApplicationState>[] = !environment.production
  ? [storeFreeze]
  : [];
