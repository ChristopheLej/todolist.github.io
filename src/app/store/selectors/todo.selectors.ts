import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from '../reducers/todo.reducer';

export const selectTodoState = createFeatureSelector<fromReducer.State>(
  fromReducer.todosFeatureKey
);

export const selectTodos = createSelector(selectTodoState, fromReducer.selectAll);

export const isLoading = createSelector(selectTodoState, state => state.loading);

export const selectTodoById = (id: number) =>
  createSelector(selectTodoState, todoState => todoState.entities[id]);
