import { Injectable } from '@angular/core';
import { TodoService } from '@services';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Todo } from '@models';
import { map, switchMap, catchError, withLatestFrom, mergeMap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromAction from '../actions/todo.actions';
import * as fromSelector from '../selectors/todo.selectors';
import * as fromReducer from '../reducers/todo.reducer';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';

@Injectable()
export class TodoEffects {
  constructor(
    private service: TodoService,
    private actions$: Actions,
    private store: Store<ApplicationState>
  ) {}

  loadAllTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.loadTodos),
      withLatestFrom(this.store.pipe(select(fromSelector.selectTodos))),
      switchMap(() =>
        this.service.getTodos().pipe(
          map((todos: Todo[]) => fromAction.successLoadTodos({ todos })),
          catchError(err => of(fromAction.errorLoadTodos({ payload: err })))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.updateTodo),
      exhaustMap(action =>
        this.service.updateTodo(action.id, action.changes).pipe(
          map((todo: Todo) => fromAction.successUpdateTodo({ todo })),
          catchError(err => of(fromAction.errorUpdateTodo({ payload: err })))
        )
      )
    )
  );

  saveTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.saveTodo),
      exhaustMap(action =>
        this.service.saveTodo(action.todo).pipe(
          map((todo: Todo) => {
            return fromAction.successSaveTodo({ todo });
          }),
          catchError(err => of(fromAction.errorSaveTodo({ payload: err })))
        )
      )
    )
  );

  removeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAction.removeTodo),
      exhaustMap(action =>
        this.service.deleteTodo(action.id).pipe(
          map(() => fromAction.successRemoveTodo({ id: action.id })),
          catchError(err => of(fromAction.errorRemoveTodo({ payload: err })))
        )
      )
    )
  );
}
