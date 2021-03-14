import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Theme } from '@models';
import { MemoizedSelector } from '@ngrx/store';
import * as fromLayout from '@store/selectors/layout.selector';
import { ApplicationState } from '@storeConfig';
import { THEMES } from '@stubs/themes.stub';
import { TODOS } from '@stubs/todos.stub';
import { of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { saveTodo } from '@store/actions/todo.actions';

import { TodoFooterComponent } from './todo-footer.component';

const TODO = TODOS[3];

class MatDialogMock {
  open<T, D = any, R = any>(component: ComponentType<T>, config?: MatDialogConfig<D>) {
    return {
      afterClosed: () => of(TODO)
    };
  }
}

describe('TodoFooterComponent', () => {
  let component: TodoFooterComponent;
  let fixture: ComponentFixture<TodoFooterComponent>;
  let store: MockStore;
  let mockThemeSelector: MemoizedSelector<ApplicationState, Theme>;
  let dialog: MatDialogMock;

  const filters = [{ label: 'Active' }, { label: 'Completed' }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoFooterComponent],
      imports: [MaterialModule],
      providers: [
        provideMockStore(),
        {
          provide: MatDialog,
          useClass: MatDialogMock
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFooterComponent);
    store = TestBed.inject(MockStore);
    mockThemeSelector = store.overrideSelector(fromLayout.getActiveTheme, THEMES[0]);
    dialog = TestBed.inject(MatDialog);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  filters.forEach(test => {
    it(`should raise event when selecting ${test.label} filter`, async () => {
      spyOn(component.updateFilter, 'emit');

      const groupToggle: HTMLElement = fixture.debugElement.nativeElement.querySelector(
        '.mat-button-toggle-group'
      );
      const buttonToggles = Array.from(groupToggle.getElementsByTagName('mat-button-toggle'));
      const buttonToggle = buttonToggles.filter(
        buttonToggle => buttonToggle.getAttribute('ng-reflect-value') === test.label
      );
      const button = buttonToggle[0].querySelector('button');
      button.click();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.updateFilter.emit).toHaveBeenCalledWith(test.label);
      });
    });
  });

  it('should display dialog modal when clicking Add Todo and dispatch action', () => {
    const expectedAction = saveTodo({ todo: TODO });
    spyOn(dialog, 'open').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();

    const button = fixture.debugElement.nativeElement.querySelector('.mat-button');
    button.click();

    expect(dialog.open).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
