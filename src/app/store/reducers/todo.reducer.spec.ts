import { Todo } from '@models';
import { TODOS } from '@stubs/todos.stub';
import * as fromAction from '@store/actions/todo.actions';
import * as fromTodo from '@store/selectors/todo.selectors';

import * as fromReducer from './todo.reducer';

describe('TodoReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'NOOP'
      };
      const state = fromReducer.reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('retrieved Todo load actions', () => {
    it('should retrieve none todo and update the state for LoadTodos', () => {
      const index = 0;
      const { initialState } = fromReducer;
      const action = fromAction.loadTodos();
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: true,
        loaded: false
      });
    });

    it('should retrieve all todos and update the state in an immutable way', () => {
      const index = 0;
      const { initialState } = fromReducer;
      const newState = TODOS[0];
      const action = fromAction.successLoadTodos({ todos: [newState] });
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        entities: {
          [newState.id]: newState
        },
        ids: [newState.id],
        loading: false,
        loaded: true
      });

      expect(state).not.toBe({
        ...initialState,
        entities: {
          [newState.id]: newState
        },
        ids: [newState.id],
        loading: false,
        loaded: true
      });
    });

    it('should retrieve none todos and update the state for ErrorLoadTodos', () => {
      const { initialState } = fromReducer;
      const action = fromAction.errorLoadTodos({ payload: 'error load todos' });
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        loading: false,
        loaded: false
      });
    });
  });

  describe('retrieved Todo update actions', () => {
    it('should retrieve all todos for UpdateTodo and state does not change', () => {
      const index = 3;
      const { initialState } = fromReducer;

      const loadAction = fromAction.successLoadTodos({ todos: TODOS });
      const state = fromReducer.reducer(initialState, loadAction);

      const action = fromAction.updateTodo({
        id: TODOS[index].id,
        changes: { completed: !TODOS[index].completed }
      });
      const updateState = fromReducer.reducer(state, action);
      expect(updateState).toEqual(state);
      expect(updateState).toBe(state);
    });

    it('should retrieve all todos and update the state in an immutable way', () => {
      const index = 5;
      const { initialState } = fromReducer;

      const loadAction = fromAction.successLoadTodos({ todos: TODOS });
      const state = fromReducer.reducer(initialState, loadAction);

      const action = fromAction.successUpdateTodo({ todo: TODOS[index] });
      const updateState = fromReducer.reducer(state, action);
      expect(updateState).toEqual(state);
      expect(updateState).not.toBe(state);
    });

    it('should retrieve all todos for ErrorUpdateTodo and state does not change', () => {
      const { initialState } = fromReducer;

      const loadAction = fromAction.successLoadTodos({ todos: TODOS });
      const state = fromReducer.reducer(initialState, loadAction);

      const action = fromAction.errorUpdateTodo({ payload: 'error update todo' });
      const updateState = fromReducer.reducer(state, action);
      expect(updateState).toEqual(state);
      expect(updateState).toBe(state);
    });
  });

  describe('retrieved Todo save actions', () => {
    it('should retrieve all todos for SaveTodo and state does not change', () => {
      const newTodo: Todo = {
        id: 45,
        title: 'Task 01',
        description: 'Description 01',
        completed: false
      };
      const { initialState } = fromReducer;

      const loadAction = fromAction.successLoadTodos({ todos: TODOS });
      const state = fromReducer.reducer(initialState, loadAction);

      const action = fromAction.saveTodo({ todo: newTodo });
      const updateState = fromReducer.reducer(state, action);
      expect(updateState).toEqual(state);
      expect(updateState).toBe(state);
    });

    it('should retrieve all todos and update the state in an immutable way', () => {
      const newTodo: Todo = {
        id: 45,
        title: 'Task 01',
        description: 'Description 01',
        completed: false
      };
      const { initialState } = fromReducer;

      const loadAction = fromAction.successLoadTodos({ todos: TODOS });
      const state = fromReducer.reducer(initialState, loadAction);

      const action = fromAction.successSaveTodo({ todo: newTodo });
      const updateState = fromReducer.reducer(state, action);
      expect(updateState).not.toEqual(state);
      expect(updateState).not.toBe(state);
    });

    it('should retrieve all todos for ErrorSaveTodo and state does not change', () => {
      const { initialState } = fromReducer;

      const loadAction = fromAction.successLoadTodos({ todos: TODOS });
      const state = fromReducer.reducer(initialState, loadAction);

      const action = fromAction.errorSaveTodo({ payload: 'error update todo' });
      const updateState = fromReducer.reducer(state, action);
      expect(updateState).toEqual(state);
      expect(updateState).toBe(state);
    });
  });

  describe('retrieved Todo remove actions', () => {
    it('should retrieve all todos for RemoveTodo and state does not change', () => {
      const index = 3;
      const { initialState } = fromReducer;

      const loadAction = fromAction.successLoadTodos({ todos: TODOS });
      const state = fromReducer.reducer(initialState, loadAction);

      const action = fromAction.removeTodo({ id: TODOS[index].id });
      const updateState = fromReducer.reducer(state, action);
      expect(updateState).toEqual(state);
      expect(updateState).toBe(state);
    });

    it('should retrieve todos and update the state in an immutable way', () => {
      const index = 3;
      const { initialState } = fromReducer;

      const loadAction = fromAction.successLoadTodos({ todos: TODOS });
      const state = fromReducer.reducer(initialState, loadAction);

      const action = fromAction.successRemoveTodo({ id: TODOS[index].id });
      const updateState = fromReducer.reducer(state, action);
      expect(updateState).not.toEqual(state);
      expect(updateState).not.toBe(state);

      expect(updateState.ids.includes(TODOS[index].id as never)).toBeFalse();
      expect(updateState.entities[TODOS[index].id]).toBeUndefined();
    });

    it('should retrieve all todos for ErrorRemoveTodo and state does not change', () => {
      const { initialState } = fromReducer;

      const loadAction = fromAction.successLoadTodos({ todos: TODOS });
      const state = fromReducer.reducer(initialState, loadAction);

      const action = fromAction.errorRemoveTodo({ payload: 'error remove todo' });
      const updateState = fromReducer.reducer(state, action);
      expect(updateState).toEqual(state);
      expect(updateState).toBe(state);
    });
  });
});
