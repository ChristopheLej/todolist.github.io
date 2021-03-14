import { HttpClient, HttpHandler } from '@angular/common/http';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TODOS } from '@stubs/todos.stub';
import { of } from 'rxjs';

import { TodoService } from './todo.service';
import { Todo } from '@models';

describe('TodoService', () => {
  let httpTestingController: HttpTestingController;
  let service: TodoService;
  const apiUrl = '/api/todos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get all todos from API', fakeAsync(() => {
    let todos: Todo[];

    service.getTodos().subscribe(todos => expect(todos).toEqual(TODOS));

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush({
      payload: TODOS
    });
  }));

  it('should get todo by ID from API', fakeAsync(() => {
    let id = 5;

    service.getTodoById(id).subscribe(todo => expect(todo).toEqual(TODOS[id]));

    const req = httpTestingController.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('GET');

    req.flush({
      payload: TODOS[id]
    });
  }));

  it('should update todo from API', fakeAsync(() => {
    let id = 6;

    service
      .updateTodo(id, { completed: !TODOS[id].completed })
      .subscribe(todo => expect(todo).toEqual(TODOS[id]));

    const req = httpTestingController.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ completed: !TODOS[id].completed });

    req.flush({
      payload: TODOS[id]
    });
  }));

  it('should save new todo from API', fakeAsync(() => {
    const newTodo = { title: 'Task01', description: 'Description 01', completed: true };

    service
      .saveTodo(newTodo as Todo)
      .subscribe(todo => expect(todo).toEqual({ ...newTodo, id: 47 }));

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(newTodo);

    req.flush({
      payload: { ...newTodo, id: 47 }
    });
  }));

  it('should delete todo from API', fakeAsync(() => {
    let id = 3;

    service.deleteTodo(id).subscribe(result => expect(result).toEqual({}));

    const req = httpTestingController.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({});
  }));
});
