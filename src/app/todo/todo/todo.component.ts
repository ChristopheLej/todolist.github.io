import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';
import * as fromAction from '@store/actions/todo.actions';
import * as fromSelector from '@store/selectors/todo.selectors';
import { Observable } from 'rxjs';
import { Todo } from '@models';
import { UpdateEventTodo } from '../utils';
import { Actions, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  isLoading$: Observable<boolean>;
  todos$: Observable<Todo[]>;

  constructor(
    private store: Store<ApplicationState>,
    private actions$: Actions,
    private snackBar: MatSnackBar
  ) {
    this.todos$ = store.pipe(select(fromSelector.selectTodos));
    this.isLoading$ = this.store.pipe(select(fromSelector.isLoading));

    this.actions$.pipe(ofType(fromAction.ActionTypes.ErrorUpdateTodo)).subscribe(action => {
      const response = (action as any).payload as HttpErrorResponse;
      this.snackBar.open(response.error, 'Error', {
        duration: 2000,
        verticalPosition: 'top'
      });
      this.store.dispatch(fromAction.loadTodos());
    });
  }

  ngOnInit(): void {
    this.store.dispatch(fromAction.loadTodos());
  }

  updateTodo(event: UpdateEventTodo) {
    this.store.dispatch(
      fromAction.updateTodo({ id: event.id, changes: { completed: event.completed } })
    );
  }

  removeTodo(event: { id: number }) {
    this.store.dispatch(fromAction.removeTodo({ id: event.id }));
  }
}
