import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { ActivatedRoute } from '@angular/router';
import { TODOS } from '@stubs/todos.stub';

import { TodoDetailComponent } from './todo-detail.component';

const TODO = TODOS[6];

const activatedRouteMock = {
  snapshot: { data: { todo: TODO } }
};

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoDetailComponent],
      imports: [MaterialModule],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contains correct informations', () => {
    const title = fixture.debugElement.nativeElement.querySelector('.mat-card-title');
    expect(title.textContent).toContain(TODO.title);

    const content = fixture.debugElement.nativeElement.querySelector('.mat-card-content');
    expect(content.textContent).toContain(TODO.description);

    const checkbox = fixture.debugElement.nativeElement.querySelector('.mat-checkbox-input');
    expect(checkbox.checked).toEqual(TODO.completed);
  });
});
