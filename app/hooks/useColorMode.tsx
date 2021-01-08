import { useMutation } from '@apollo/client';
import type { ColorMode } from '@prisma/client';
import { createContext, useContext, useEffect, useState } from 'react';
import UniversalCookie from 'universal-cookie';

import { CURRENT_USER_QUERY, UPDATE_COLOR_MODE_MUTATION } from '~app/graphql';
import { noop } from '~app/utils';
import { useUser } from './useUser';

// ---------- Configurations ---------- //

/** Default color mode of global site theme. */
export const DEFAULT_COLOR_MODE: ColorMode = 'LIGHT';

/** Name of the cookie for color mode cache. */
export const COLOR_MODE_CACHE_KEY = 'ColorMode';

// ---------- Context ---------- //

type ColorModeApi = {
  colorMode: ColorMode;
  toggleColorMode(): void;
  // isProcessing: boolean;
  // serverError: ApolloError | null;
};

/** React context */
const ColorModeApiContext = createContext<ColorModeApi>({
  colorMode: DEFAULT_COLOR_MODE,
  toggleColorMode: noop,
  // isProcessing: null,
  // serverError: null,
});

export const ColorModeApiProvider = ColorModeApiContext.Provider;

// ---------- Hook ---------- //

/** React context provider */
export const useColorMode = (): ColorModeApi => {
  // Get authenticated user data.
  const user = useUser();
  // Create color mode state from
  // 1. User data in database.
  // 2. From cookie cache (also available to anonymous users)
  // 3. From user's operating system settings.
  // 4. Fallback to `DEFAULT_COLOR_MODE`.
  const [colorMode, setColorMode] = useState(
    user?.colorMode ?? restoreColorMode(),
  );
  // Check accessibility of cookie.
  const [canUseCookie, setCanUseCookie] = useState(true);
  // Update user's color mode choice to the database.
  const [updateColorMode] = useMutation(UPDATE_COLOR_MODE_MUTATION);
  /** Toggle color mode. */
  const toggleColorMode = () =>
    setColorMode(previousColorMode => invertColorMode(previousColorMode));

  // Cache the new color mode in cookie.
  useEffect(() => {
    // Don't retry if previous attempt has failed.
    if (canUseCookie) {
      // Use try/catch to handle errors when the use of cookies is blocked by
      // the user's privacy settings.
      try {
        const cookie = new UniversalCookie();
        cookie.set(COLOR_MODE_CACHE_KEY, colorMode, { path: '/' });
      } catch (error) {
        setCanUseCookie(false);
        // console.error(error.message);
      }
    }
  }, [colorMode, canUseCookie]);

  // Reflect color mode changes to the user database.
  useEffect(() => {
    // 1. User is logged in
    // 2. Current color mode is different than the value in database.
    if (user && colorMode !== user.colorMode) {
      updateColorMode({
        variables: { colorMode },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
      });
    }
  }, [colorMode, updateColorMode, user]);

  return {
    colorMode,
    toggleColorMode,
    // isProcessing: called && loading,
    // serverError: error ?? null,
  };
};

/** Get the color mode API provided through React context. */
export const useColorModeApi = () => {
  const colorModeApi = useContext(ColorModeApiContext);
  return colorModeApi;
};

// ---------- Utils ---------- //

/**
 * Restore the color mode of user's choice.
 * 1. Restore cached color mode from cookie.
 * 2. Get the user's preferred color mode from operating system.
 * 3. Fallback to default color mode.
 */
function restoreColorMode(): ColorMode {
  const cookie = new UniversalCookie();
  return (
    cookie.get(COLOR_MODE_CACHE_KEY) ??
    getUserPreferredScheme() ??
    DEFAULT_COLOR_MODE
  );
}

/**
 * Get user preferred color mode from operating system.
 * Type guard on `window` is required for backend operation.
 */
function getUserPreferredScheme(): ColorMode | undefined {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)')?.matches
    ? 'DARK'
    : undefined;
}

function invertColorMode(colorMode: ColorMode): ColorMode {
  return colorMode === 'DARK' ? 'LIGHT' : 'DARK';
}
