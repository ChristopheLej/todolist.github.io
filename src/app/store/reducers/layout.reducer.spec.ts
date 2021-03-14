import { Theme } from '@models';
import { THEMES } from '@stubs/themes.stub';
import * as fromAction from '@store/actions/layout.actions';
import * as fromLayout from '@store/selectors/layout.selector';

import * as fromReducer from './layout.reducer';

describe('LayoutReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'NOOP'
      };
      const state = fromReducer.reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('retrieved Layout theme actions', () => {
    it('should retrieve none todo and update the state for LoadTodos', () => {
      const index = 2;
      const { initialState } = fromReducer;
      const action = fromAction.setActiveTheme({ payload: THEMES[index] });
      const state = fromReducer.reducer(initialState, action);

      expect(initialState).not.toEqual(state);
      expect(state).toEqual({ theme: THEMES[index] });
    });
  });
});
