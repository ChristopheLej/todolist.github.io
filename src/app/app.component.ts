import { Component } from '@angular/core';
import { Theme } from '@models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { APP_THEMES } from './models/layout.model';
import * as fromReducer from '@store/reducers/layout.reducer';
import * as fromSelector from '@store/selectors/layout.selector';
import { setActiveTheme } from '@store/actions/layout.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Todo';
  appThemes = APP_THEMES;
  activeTheme$: Observable<Theme>;

  constructor(private store: Store<fromReducer.State>) {
    this.activeTheme$ = this.store.select(fromSelector.getActiveTheme);
  }

  public themeSelected(theme: Theme) {
    this.store.dispatch(setActiveTheme({ payload: theme }));
  }
}
