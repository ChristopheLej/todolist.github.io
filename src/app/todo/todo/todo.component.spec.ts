import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Action, MemoizedSelector } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromTodo from '@store/selectors/todo.selectors';
import { TODOS } from '@stubs/todos.stub';
import { ApplicationState } from '@storeConfig';
import { Todo } from '@models';
import { loadTodos, removeTodo, updateTodo } from '@store/actions/todo.actions';

import { TodoComponent } from './todo.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let store: MockStore;
  let actions$ = new Observable<Action>();
  let mockIsLoadingSelector: MemoizedSelector<ApplicationState, boolean>;
  let mockSelectTodosSelector: MemoizedSelector<ApplicationState, Todo[]>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [MaterialModule],
      providers: [provideMockStore(), provideMockActions(() => actions$)],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    store = TestBed.inject(MockStore);
    mockIsLoadingSelector = store.overrideSelector(fromTodo.isLoading, true);
    mockSelectTodosSelector = store.overrideSelector(fromTodo.selectTodos, TODOS);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading$.subscribe(result => expect(result).toBeTrue());
    component.todos$.subscribe(result => expect(result).toEqual(TODOS));
  });

  it('should dispatch LoadTodos', () => {
    const expectedAction = loadTodos();
    spyOn(store, 'dispatch').and.callThrough();

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should change LoadTodos', () => {
    mockIsLoadingSelector.setResult(false);
    mockSelectTodosSelector.setResult([]);
    store.refreshState();
    fixture.detectChanges();

    component.isLoading$.subscribe(result => expect(result).toBeFalse());
    component.todos$.subscribe(result => expect(result).toEqual([]));
  });

  it('should emit event when receive UpdateEventTodo', () => {
    const event = { id: TODOS[0].id, changes: { completed: !TODOS[0].completed } };
    const expectedAction = updateTodo(event);
    spyOn(store, 'dispatch').and.callThrough();

    component.updateTodo({ id: TODOS[0].id, completed: !TODOS[0].completed });

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should emit event when receive removeTodo', () => {
    const event = { id: TODOS[0].id };
    const expectedAction = removeTodo(event);
    spyOn(store, 'dispatch').and.callThrough();

    component.removeTodo(event);

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
