import { TestBed } from '@angular/core/testing';
import { Todo } from '@models';
import { provideMockActions } from '@ngrx/effects/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoService } from '@services';
import * as fromAction from '@store/actions/todo.actions';
import * as fromTodo from '@store/selectors/todo.selectors';
import { ApplicationState } from '@storeConfig';
import { TODOS } from '@stubs/todos.stub';
import { of } from 'rxjs';

import { TodoEffects } from './todo.effect';

describe('TodoEffect', () => {
  let store: MockStore;
  let mockSelectTodosSelector: MemoizedSelector<ApplicationState, Todo[]>;
  let todoService: jasmine.SpyObj<TodoService> = jasmine.createSpyObj('TodoService', [
    'getTodos',
    'updateTodo',
    'saveTodo',
    'deleteTodo'
  ]);

  const createEffects = actions$ => {
    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: TodoService, useValue: todoService }
      ]
    });
    store = TestBed.inject(MockStore);
    mockSelectTodosSelector = store.overrideSelector(fromTodo.selectTodos, TODOS);
    return TestBed.inject(TodoEffects);
  };

  it('should be created', () => {
    const effects = createEffects(of(undefined));

    expect(effects).toBeTruthy();
  });

  describe('with success effect', () => {
    it('should fire with all todos', done => {
      todoService.getTodos.and.returnValue(of(TODOS));

      const actions$ = of(fromAction.loadTodos);
      const expectedAction = fromAction.successLoadTodos({ todos: TODOS });

      const effects = createEffects(actions$);

      effects.loadAllTodos$.subscribe(res => {
        expect(res).toEqual(expectedAction);
        done();
      });
    });

    it('should fire with update todo', done => {
      const index = 3;
      const todo = TODOS[index];
      todoService.updateTodo.and.returnValue(of(todo));

      const actions$ = of(
        fromAction.updateTodo({
          id: index,
          changes: { completed: !TODOS[index].completed }
        })
      );
      const expectedAction = fromAction.successUpdateTodo({ todo });

      const effects = createEffects(actions$);

      effects.updateTodo$.subscribe(res => {
        expect(res).toEqual(expectedAction);
        done();
      });
    });

    it('should fire with save todo', done => {
      const index = 5;
      const todo = TODOS[index];
      todoService.saveTodo.and.returnValue(of(todo));

      const actions$ = of(fromAction.saveTodo({ todo }));
      const expectedAction = fromAction.successSaveTodo({ todo });

      const effects = createEffects(actions$);

      effects.saveTodo$.subscribe(res => {
        expect(res).toEqual(expectedAction);
        done();
      });
    });

    it('should fire with remove todo', done => {
      const index = 4;
      const todo = TODOS[index];
      todoService.deleteTodo.and.returnValue(of({}));

      const actions$ = of(fromAction.removeTodo({ id: todo.id }));
      const expectedAction = fromAction.successRemoveTodo({ id: todo.id });

      const effects = createEffects(actions$);

      effects.removeTodo$.subscribe(res => {
        expect(res).toEqual(expectedAction);
        done();
      });
    });
  });
});
