import defaultsDeep from 'lodash/defaultsDeep';
import { useMemo } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { ColorMode, DEFAULT_COLOR_MODE } from '~/theme/hooks';
import { baseTheme, darkTheme, lightTheme } from './customizations';

const createGlobalTheme = (colorMode: ColorMode): Theme =>
  createMuiTheme(
    defaultsDeep({}, baseTheme, colorMode === 'dark' ? darkTheme : lightTheme),
  );

/** Get light or dark theme based on user selection. */
export const useGlobalTheme = (colorMode = DEFAULT_COLOR_MODE): Theme => {
  const theme = useMemo(() => createGlobalTheme(colorMode), [colorMode]);
  return theme;
};
