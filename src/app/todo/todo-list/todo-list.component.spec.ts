import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { TODOS } from '@stubs/todos.stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TodoListComponent } from './todo-list.component';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [MaterialModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    component.todos = TODOS;
    fixture.detectChanges();
  });

  it('should have all todos visible in list', () => {
    const todos = fixture.debugElement.queryAll(By.css('app-todo-item'));
    expect(todos.length).toEqual(TODOS.length);
  });

  it('should change filter todos', () => {
    component.updateFilter('Active');
    fixture.detectChanges();

    const todos = fixture.debugElement.queryAll(By.css('app-todo-item'));

    expect(todos.length).toEqual(TODOS.filter(t => !t.completed).length);
  });
});
