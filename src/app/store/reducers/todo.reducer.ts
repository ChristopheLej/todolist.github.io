import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as TodoActions from '../actions/todo.actions';
import { Todo } from '@models';

export const todosFeatureKey = 'todo';

export interface State extends EntityState<Todo> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  // selectId: todo => todo.id
});

export const initialState: State = adapter.getInitialState({
  todo: [],
  loading: false,
  loaded: false
});

export const reducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, (state, action) => ({ ...state, loading: true })),
  on(TodoActions.successLoadTodos, (state, action) => {
    return adapter.upsertMany(action.todos, { ...state, loading: false, loaded: true });
  }),
  on(TodoActions.errorLoadTodos, (state, action) => {
    return { ...state, loading: false };
  }),
  on(TodoActions.successUpdateTodo, (state, action) => {
    return adapter.upsertOne(action.todo, state);
  }),
  on(TodoActions.successSaveTodo, (state, action) => {
    return adapter.addOne(action.todo, state);
  }),
  on(TodoActions.successRemoveTodo, (state, action) => {
    return adapter.removeOne(action.id, state);
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
