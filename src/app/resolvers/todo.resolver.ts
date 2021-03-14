import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Todo } from '@models';
import { select, Store } from '@ngrx/store';
import { loadTodos } from '@store/actions/todo.actions';
import { selectTodoById } from '@store/selectors/todo.selectors';
import { ApplicationState } from '@storeConfig';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoResolver implements Resolve<Todo> {
  constructor(private store: Store<ApplicationState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Todo> {
    const id = route.params['id'];

    return this.store.pipe(
      select(selectTodoById(id)),
      tap(todo => {
        if (!todo) {
          this.store.dispatch(loadTodos());
        }
      }),
      filter(todo => !!todo),
      first()
    );
  }
}
