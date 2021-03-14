import { ApplicationState } from '@storeConfig';
import { THEMES } from '@stubs/themes.stub';

import * as fromLayout from './layout.selector';

describe('LayoutSelectors', () => {
  const index = 1;
  const initialState: ApplicationState = {
    layout: {
      theme: THEMES[index]
    },
    todo: null
  };

  it('should select the theme', () => {
    const result = fromLayout.getActiveTheme.projector(initialState.layout);
    expect(result).toEqual(THEMES[index]);
  });
});
