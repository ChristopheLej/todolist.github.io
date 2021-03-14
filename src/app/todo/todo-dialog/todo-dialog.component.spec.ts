import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TODOS } from '@stubs/todos.stub';

import { TodoDialogComponent } from './todo-dialog.component';

const TODO = TODOS[6];

class MatDialogRefMock {
  close(value?: any) {}
}

describe('TodoDialogComponent', () => {
  let component: TodoDialogComponent;
  let fixture: ComponentFixture<TodoDialogComponent>;
  let dialogRef: MatDialogRefMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoDialogComponent],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: '',
            description: '',
            completed: false
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDialogComponent);
    dialogRef = TestBed.inject(MatDialogRef);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input elements', () => {
    const title = fixture.debugElement.nativeElement.querySelector('input');
    expect(title).toBeTruthy();

    const description = fixture.debugElement.nativeElement.querySelector('textarea');
    expect(description).toBeTruthy();
  });

  it('should test form validity', () => {
    const form = component.form;
    const titleInput = form.controls.title;
    const descriptionInput = form.controls.description;
    const completedInput = form.controls.completed;

    expect(form.valid).toBeFalsy();

    descriptionInput.setValue('Description 01');
    expect(form.valid).toBeFalsy();

    completedInput.setValue(true);
    expect(form.valid).toBeFalsy();

    titleInput.setValue('Task01');
    expect(form.valid).toBeTruthy();
  });

  it('should test input validity', () => {
    const titleInput = component.form.controls.title;
    const descriptionInput = component.form.controls.description;
    const completedInput = component.form.controls.completed;

    expect(titleInput.valid).toBeFalsy();
    expect(descriptionInput.valid).toBeTruthy();
    expect(completedInput.valid).toBeTruthy();

    titleInput.setValue('Task 01');
    expect(titleInput.valid).toBeTruthy();
  });

  it('should test input title errors', () => {
    const titleInput = component.form.controls.title;
    expect(titleInput.errors.required).toBeTruthy();

    titleInput.setValue('Task 01');
    expect(titleInput.errors).toBeNull();
  });

  it('should cancel dialog', () => {
    spyOn(dialogRef, 'close').and.callThrough();
    const titleInput = component.form.controls.title;
    const descriptionInput = component.form.controls.description;
    const completedInput = component.form.controls.completed;

    titleInput.setValue(TODO.title);
    descriptionInput.setValue(TODO.description);
    completedInput.setValue(TODO.completed);

    component.cancel();

    expect(dialogRef.close).toHaveBeenCalledWith();
  });

  it('should close dialog with task', () => {
    spyOn(dialogRef, 'close').and.callThrough();
    const titleInput = component.form.controls.title;
    const descriptionInput = component.form.controls.description;
    const completedInput = component.form.controls.completed;

    titleInput.setValue(TODO.title);
    descriptionInput.setValue(TODO.description);
    completedInput.setValue(TODO.completed);

    component.save();

    expect(dialogRef.close).toHaveBeenCalledWith({
      title: TODO.title,
      description: TODO.description,
      completed: TODO.completed
    });
  });
});
