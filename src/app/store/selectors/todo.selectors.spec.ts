import { ApplicationState } from '@storeConfig';
import { TODOS } from '@stubs/todos.stub';

import * as fromTodo from './todo.selectors';

describe('TodoSelectors', () => {
  const initialState: ApplicationState = {
    todo: {
      ids: TODOS.map(todo => todo.id),
      entities: TODOS.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {}),
      loading: true,
      loaded: false
    },
    layout: null
  };

  it('should select all todos', () => {
    const result = fromTodo.selectTodos.projector(initialState.todo);
    expect(result).toEqual(TODOS);
  });

  it('should select loading field', () => {
    const result = fromTodo.isLoading.projector(initialState.todo);
    expect(result).toBeTrue();
  });

  it('should select todo by id', () => {
    const index = 3;
    const todo = TODOS[index];

    const result = fromTodo.selectTodoById(todo.id).projector(initialState.todo);
    expect(result).toEqual(todo);
  });
});
