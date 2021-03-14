import { Theme } from '@models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLayout from '../reducers/layout.reducer';

export const layoutState = createFeatureSelector<fromLayout.State>(fromLayout.layoutFeatureKey);

export const getActiveTheme = createSelector(layoutState, (state): Theme => state.theme);
