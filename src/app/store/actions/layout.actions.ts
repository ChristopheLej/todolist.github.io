import { Action, createAction, props } from '@ngrx/store';
import { Theme } from '@models';

export enum LayoutActionTypes {
  SetTheme = '[App] Set Theme'
}

export const setActiveTheme = createAction(LayoutActionTypes.SetTheme, props<{ payload: Theme }>());

export type LayoutActions = typeof setActiveTheme;
