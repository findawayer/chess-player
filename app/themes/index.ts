import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { ColorMode } from '@prisma/client';
import defaultsDeep from 'lodash/defaultsDeep';
import { useMemo } from 'react';

import { baseTheme } from './base-theme';
import { darkTheme } from './dark-theme';
import { lightTheme } from './light-theme';

/** Default color mode of global site theme. */
export const DEFAULT_COLOR_MODE = 'LIGHT' as const;

export const createTheme = (colorMode: ColorMode): Theme =>
  createMuiTheme(
    defaultsDeep(
      {},
      baseTheme,
      colorMode === ColorMode.DARK ? darkTheme : lightTheme,
    ),
  );

/** Get light or dark theme based on user selection. */
export const useMuiTheme = (
  colorMode: ColorMode = DEFAULT_COLOR_MODE,
): Theme => {
  const theme = useMemo(() => createTheme(colorMode), [colorMode]);
  return theme;
};
