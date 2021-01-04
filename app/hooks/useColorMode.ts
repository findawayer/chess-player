import { useMutation } from '@apollo/client';
import type { ColorMode } from '@prisma/client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { CURRENT_USER_QUERY, UPDATE_COLOR_MODE_MUTATION } from '~app/graphql';

/** Default color mode of global site theme. */
export const DEFAULT_COLOR_MODE = 'LIGHT' as ColorMode;
/** Cache key. */
export const COLOR_MODE_CACHE_KEY = 'ColorMode';

/**
 * Get user preferred color mode from operating system.
 * Type guard on `window` is required for backend operation.
 */
const getUserPreferredScheme = (): ColorMode | undefined =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'DARK'
    : undefined;

/**
 * Restore the color mode of user's choice.
 * 1. Restore cached color mode from cookie.
 * 2. Get the user's preferred color mode from operating system.
 * 3. Fallback to default color mode.
 */
const restoreColorMode = (): ColorMode =>
  (Cookies.get(COLOR_MODE_CACHE_KEY) as ColorMode | undefined) ||
  getUserPreferredScheme() ||
  DEFAULT_COLOR_MODE;

/**
 * Create local React state reflecting user selected color mode of the app.
 *
 * @returns Array containing:
 * - colorMode: Current color mode of the theme.
 * - toggleColorMode: Toggle the color mode.
 */
export const useColorMode = (databaseValue?: ColorMode) => {
  // Merged state of app's color mode + user interaction status.
  const [colorMode, setColorMode] = useState(
    databaseValue || restoreColorMode(),
  );
  // GraphQL: Save user's color mode choice to the database.
  const [updateColorModeToDatabase] = useMutation(UPDATE_COLOR_MODE_MUTATION);

  /** Update color mode. */
  const updateColorMode = (colorMode: ColorMode) => {
    // Update local state
    setColorMode(colorMode);
    // Save to the database if user is logged in.
    if (databaseValue) {
      updateColorModeToDatabase({
        variables: { colorMode },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
      });
    }
    // Cache in the `localStorage` — this can fail if access to the
    // `localStorage` is blocked by the user's privacy settings.
    Cookies.set(COLOR_MODE_CACHE_KEY, colorMode, { path: '/' });
  };

  // Reflect color mode preferences from user data in database.
  useEffect(() => {
    if (databaseValue && databaseValue !== colorMode) {
      setColorMode(databaseValue);
    }
  }, [databaseValue, colorMode]);

  return [colorMode, updateColorMode] as const;
};
