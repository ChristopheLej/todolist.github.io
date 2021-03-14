import { Todo } from '@models';
import { createAction, props } from '@ngrx/store';

export enum ActionTypes {
  LoadTodos = '[Todo] Load Todos',
  SuccessLoadTodos = '[Todo] Success load Todos',
  ErrorLoadTodos = '[Todo] Error load Todos',

  UpdateTodo = '[Todo] Update Todo',
  SuccessUpdateTodo = '[Todo] Success update Todo',
  ErrorUpdateTodo = '[Todo] Error update Todo',

  SaveTodo = '[Todo] Save Todo',
  SuccessSaveTodo = '[Todo] Success save Todo',
  ErrorSaveTodo = '[Todo] Error save Todo',

  RemoveTodo = '[Todo] Remove Todo',
  SuccessRemoveTodo = '[Todo] Success remove Todo',
  ErrorRemoveTodo = '[Todo] Error remove Todo'
}

export const loadTodos = createAction(ActionTypes.LoadTodos);

export const successLoadTodos = createAction(
  ActionTypes.SuccessLoadTodos,
  props<{ todos: Todo[] }>()
);

export const errorLoadTodos = createAction(ActionTypes.ErrorLoadTodos, props<{ payload: any }>());

export const updateTodo = createAction(
  ActionTypes.UpdateTodo,
  props<{ id: number; changes: Partial<Todo> }>()
);

export const successUpdateTodo = createAction(
  ActionTypes.SuccessUpdateTodo,
  props<{ todo: Todo }>()
);

export const errorUpdateTodo = createAction(ActionTypes.ErrorUpdateTodo, props<{ payload: any }>());

export const saveTodo = createAction(ActionTypes.SaveTodo, props<{ todo: Todo }>());

export const successSaveTodo = createAction(ActionTypes.SuccessSaveTodo, props<{ todo: Todo }>());

export const errorSaveTodo = createAction(ActionTypes.ErrorSaveTodo, props<{ payload: any }>());

export const removeTodo = createAction(ActionTypes.RemoveTodo, props<{ id: number }>());

export const successRemoveTodo = createAction(
  ActionTypes.SuccessRemoveTodo,
  props<{ id: number }>()
);

export const errorRemoveTodo = createAction(ActionTypes.ErrorRemoveTodo, props<{ payload: any }>());

export type TodoActions =
  | typeof loadTodos
  | typeof successLoadTodos
  | typeof errorLoadTodos
  | typeof updateTodo
  | typeof successUpdateTodo
  | typeof errorUpdateTodo
  | typeof saveTodo
  | typeof errorSaveTodo
  | typeof removeTodo
  | typeof successRemoveTodo
  | typeof errorRemoveTodo;
