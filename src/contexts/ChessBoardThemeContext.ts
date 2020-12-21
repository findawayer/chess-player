import { createContext } from 'react';

import { ChessBoardTheme, defaultChessBoardTheme } from '@themes';

/**
 * Context to provide the chess board theme of user's choice
 * deep into the React component tree.
 */
export const ChessBoardThemeContext = createContext<ChessBoardTheme>(
  defaultChessBoardTheme,
);
