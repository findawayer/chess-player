import defaultsDeep from 'lodash/defaultsDeep';
import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

import { ColorMode } from '@types';
import { baseTheme } from './base-theme';
import { darkTheme } from './dark-theme';
import { lightTheme } from './light-theme';

export const getTheme = (colorMode: ColorMode): ThemeOptions =>
  createMuiTheme(
    defaultsDeep(
      {},
      baseTheme,
      colorMode === ColorMode.Dark ? darkTheme : lightTheme,
    ),
  );
