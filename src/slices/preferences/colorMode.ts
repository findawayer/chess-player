import { DEFAULT_COLOR_MODE } from '@settings/preferences';
import { ColorMode } from '@types';

const encodeColorMode = (colorMode: ColorMode): string =>
  colorMode === ColorMode.Dark ? 'dark' : 'light';

/* Convert color mode string as enum values */
const decodeColorMode = (colorMode: unknown): ColorMode | null => {
  switch (colorMode) {
    case 'dark':
      return ColorMode.Dark;

    case 'light':
      return ColorMode.Light;

    default:
      return null;
  }
};

/* Find out if the user has set dark mode as preferred color scheme at the system-level. */
const userNormallyPrefersDarkMode = (): boolean =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;

/* Retreive user choice for color mode from `localStorage` */
const getCachedColorModeSelection = (): ColorMode | null =>
  decodeColorMode(window.localStorage.getItem('ColorMode'));

/* Cache user choice for color mode into `localStorage` */
export const cacheColorModeSelection = (colorMode: ColorMode): void => {
  window.localStorage.setItem('ColorMode', encodeColorMode(colorMode));
};

// Mode initializer.
// 1. Find track of user choice stored in `localStorage`
// 2. Find user preferred mode from the system settings.
export const getColorMode = (): ColorMode =>
  getCachedColorModeSelection() || userNormallyPrefersDarkMode()
    ? ColorMode.Dark
    : DEFAULT_COLOR_MODE;
