import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Theme } from '@models';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { setActiveTheme } from '@store/actions/layout.actions';
import { getActiveTheme } from '@store/selectors/layout.selector';
import { ApplicationState } from '@storeConfig';
import { THEMES } from '@stubs/themes.stub';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let store: MockStore;
  let mockActiveThemeSelector: MemoizedSelector<ApplicationState, Theme>;
  const theme = THEMES[3];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    store = TestBed.inject(MockStore);
    mockActiveThemeSelector = store.overrideSelector(getActiveTheme, THEMES[0]);

    app = fixture.componentInstance;
    app.appThemes = THEMES;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Todo'`, () => {
    expect(app.title).toEqual('Todo');
  });

  it('should dispatch setActiveTheme', () => {
    spyOn(store, 'dispatch').and.callThrough();
    const expectedAction = setActiveTheme({ payload: theme });

    app.themeSelected(theme);

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
