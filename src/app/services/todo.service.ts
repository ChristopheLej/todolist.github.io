import { Injectable } from '@angular/core';
import { Todo } from '@models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('/api/todos').pipe(map(res => res['payload']));
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`/api/todos/${id}`).pipe(map(res => res['payload']));
  }

  updateTodo(id: number, changes: Partial<Todo>): Observable<Todo> {
    return this.http.put(`/api/todos/${id}`, changes).pipe(map(res => res['payload']));
  }

  saveTodo(todo: Todo): Observable<Todo> {
    return this.http.put('/api/todos', todo).pipe(map(res => res['payload']));
  }

  deleteTodo(id: number) {
    return this.http.delete(`/api/todos/${id}`);
  }
}
