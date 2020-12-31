import { useCallback, useEffect, useState } from 'react';

import { getPersistedState, persistState } from '~/utils';

/**
 * App's color mode. String union is used instead of enums because
 * this value is going to be serialized and stored in user's `localStorage`.
 */
export type ColorMode = 'light' | 'dark';

/** Default color mode of global site theme. */
export const DEFAULT_COLOR_MODE = 'light' as ColorMode;

/** Key for localStorage cache. */
const COLOR_MODE_KEY = 'ColorMode';

/**
 * Create initial color mode state.
 * 1. Check if there is a previously cached user selection.
 * 2. Check if the user has set dark mode as their preferred color scheme at the system level.
 * 3. Fallback to default mode.
 */
const initializeColorMode = (): ColorMode =>
  getPersistedState<ColorMode>(COLOR_MODE_KEY) ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : DEFAULT_COLOR_MODE);

/**
 * Create local React state reflecting user selected color mode of the app,
 * and try to store them in user's local storage to be able to retrieve them later.
 *
 * @returns Array containing:
 * - colorMode: Current color mode of the theme.
 * - rehydrate: Retrieve cached color mode from `localStorage`.
 * - toggle: Toggle the color mode.
 * - canUseLocalStorage: Whether user allowed `localStorage` access.
 */
export const useColorMode = (): [
  ColorMode,
  () => void,
  () => void,
  boolean,
] => {
  // Merged state of app's color mode + user interaction status.
  const [{ colorMode, interacted }, setStatus] = useState({
    colorMode: DEFAULT_COLOR_MODE,
    interacted: false,
  });
  // Whether user allowed `localStorage` access.
  const [canUseLocalStorage, setCanUseLocalStorage] = useState(true);

  /** Re-initialize chess settings from the persisted state in `localStorage. */
  const rehydrate = useCallback(() => {
    setStatus(previousStatus => ({
      ...previousStatus,
      colorMode: initializeColorMode(),
    }));
  }, []);
  /** Toggle color mode. */
  const toggle = useCallback(() => {
    setStatus(previousStatus => ({
      colorMode: previousStatus.colorMode === 'dark' ? 'light' : 'dark',
      interacted: true,
    }));
  }, []);

  // Rewrite color mode cache in user's `localStorage` when it updates.
  useEffect(() => {
    if (canUseLocalStorage && interacted) {
      const success = persistState<ColorMode>(colorMode, COLOR_MODE_KEY);
      // If the use of localStorage is blocked by user's privacy settings,
      // do NOT try this process again.
      // TODO: send a notification to the user.
      if (!success) setCanUseLocalStorage(false);
    }
  }, [colorMode, canUseLocalStorage, interacted]);

  return [colorMode, rehydrate, toggle, canUseLocalStorage];
};
