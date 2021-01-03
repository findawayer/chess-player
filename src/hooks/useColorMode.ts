import { useMutation } from '@apollo/client';
import type { ColorMode } from '@prisma/client';
import { useEffect, useState } from 'react';
import CookieHandler from 'universal-cookie';

import { CURRENT_USER_QUERY, UPDATE_COLOR_MODE_MUTATION } from '~/graphql';

/** Default color mode of global site theme. */
export const DEFAULT_COLOR_MODE = 'LIGHT' as ColorMode;
/** Cache key. */
export const COLOR_MODE_CACHE_KEY = 'ColorMode';

/** Create cookie handler instance. */
const cookie = new CookieHandler();

/** Restore the color mode of user's choice. */
const restoreColorMode = (forcedValue?: ColorMode): ColorMode => {
  // 1. Restore the settings from database, if the user is authenticated.
  if (forcedValue) {
    return forcedValue;
  }
  // 2. From localStorage, if the user payload is not sent.
  const valueFromCookie = cookie.get(COLOR_MODE_CACHE_KEY);
  if (valueFromCookie) {
    return valueFromCookie;
  }
  // 3. From user's color mode preferences from system.
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'DARK';
  }
  // 4. Fallback to default color mode.
  return DEFAULT_COLOR_MODE;
};

// interface UseColorModeOptions {
//   initialValue?: ColorMode;
//   databaseValue?: ColorMode;
// }

/**
 * Create local React state reflecting user selected color mode of the app.
 *
 * @returns Array containing:
 * - colorMode: Current color mode of the theme.
 * - toggleColorMode: Toggle the color mode.
 */
export const useColorMode = (initialValue: ColorMode) => {
  // Merged state of app's color mode + user interaction status.
  const [colorMode, setColorMode] = useState(restoreColorMode(initialValue));
  // GraphQL: Save user's color mode choice to the database.
  const [updateColorModeToDatabase] = useMutation(UPDATE_COLOR_MODE_MUTATION);

  /** Update color mode. */
  const updateColorMode = (colorMode: ColorMode) => {
    // Update local state
    setColorMode(colorMode);
    // Save to the database if user is logged in.
    if (initialValue) {
      updateColorModeToDatabase({
        variables: { colorMode },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
      });
    }
    // Cache in the `localStorage` — this can fail if access to the
    // `localStorage` is blocked by the user's privacy settings.
    cookie.set(COLOR_MODE_CACHE_KEY, colorMode, { path: '/' });
  };

  // Reflect color mode preferences from user data in database.
  useEffect(() => {
    if (initialValue && initialValue !== colorMode) {
      setColorMode(initialValue);
    }
  }, [initialValue, colorMode]);

  return [colorMode, updateColorMode] as const;
};
