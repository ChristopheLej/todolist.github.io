import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TODOS } from '@stubs/todos.stub';

import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  const TODO = TODOS[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      imports: [MaterialModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = TODO;

    fixture.detectChanges();
  });

  it('should display title', () => {
    const button = fixture.nativeElement.querySelector("button[role='listitem']");
    expect(button.textContent).toContain(TODO.title);
  });

  it('should emit event when clicked completed', () => {
    spyOn(component.updateTodo, 'emit');
    const checkbox = fixture.debugElement.nativeElement.querySelector('.mat-checkbox-input');
    checkbox.click();

    expect(component.updateTodo.emit).toHaveBeenCalledWith({
      id: TODO.id,
      completed: !TODO.completed
    });
  });

  it('should emit event when clicked removed', () => {
    spyOn(component.removeTodo, 'emit');
    const button = fixture.nativeElement.querySelector("button[aria-label='Delete task']");
    button.click();

    expect(component.removeTodo.emit).toHaveBeenCalledWith({ id: TODO.id });
  });
});
