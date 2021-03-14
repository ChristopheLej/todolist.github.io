import * as fromActions from '../actions/layout.actions';
import { Theme } from '@models';
import { createReducer, on } from '@ngrx/store';

export const layoutFeatureKey = 'layout';

export interface State {
  theme: Theme;
}

export const initialState: State = {
  theme: { class: 'pink-theme', name: 'pink theme' }
};

export const reducer = createReducer(
  initialState,
  on(fromActions.setActiveTheme, (state, action) => ({ ...state, theme: action.payload }))
);
