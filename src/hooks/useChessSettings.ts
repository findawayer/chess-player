import update from 'immutability-helper';
import { useCallback, useEffect, useState } from 'react';

import { getPersistedState, persistState } from '@/helpers';
import { DEFAULT_CHESS_BOARD_THEME } from '@/settings/preferences';
import { ChessSettings } from '@/types';

export type ApplyChessSettings = (diff: Partial<ChessSettings>) => void;

/** Key for localStorage cache. */
const CHESS_SETTINGS_CACHE_KEY = 'ChessSettings';

/** Default chess game settings. Used in server-side rendering. */
export const defaultChessSettings: ChessSettings = {
  boardColor: DEFAULT_CHESS_BOARD_THEME,
  highlightMoves: true,
  showLegalMoves: true,
  autoPromoteToQueen: false,
};

/** Create initial game settings state */
const initializeChessSettings = () =>
  getPersistedState<ChessSettings>(CHESS_SETTINGS_CACHE_KEY) ||
  defaultChessSettings;

/**
 * Create local React state reflecting user preferences on the chess game settings,
 * and try to store them in user's local storage to be able to retrieve them later.
 *
 * @returns Array containing:
 * - settings: Current color mode of the theme.
 * - rehydrate: Retrieve cached color mode from `localStorage`.
 * - apply: Merge updated portion of the chess settings.
 * - canUseLocalStorage: Whether user allowed `localStorage` access.
 */
export const useChessSettings = (): [
  ChessSettings,
  () => void,
  ApplyChessSettings,
  boolean,
] => {
  // Merged state of chess game settings + user interaction status.
  const [{ chessSettings, interacted }, setStatus] = useState({
    chessSettings: defaultChessSettings,
    interacted: false,
  });
  // Whether user allowed `localStorage` access.
  const [canUseLocalStorage, setCanUseLocalStorage] = useState(true);

  /** Re-initialize chess settings from the persisted state in `localStorage. */
  const rehydrate = useCallback(() => {
    setStatus(previousStatus =>
      update(previousStatus, {
        chessSettings: { $set: initializeChessSettings() },
      }),
    );
  }, []);
  /** Merge updated portion of the chess settings. */
  const applySettings = useCallback<ApplyChessSettings>(diff => {
    setStatus(previousStatus =>
      update(previousStatus, {
        chessSettings: { $merge: diff },
        interacted: { $set: true },
      }),
    );
  }, []);

  // Rewrite game settings cache in user's `localStorage` when it updates.
  useEffect(() => {
    if (canUseLocalStorage && interacted) {
      const success = persistState<ChessSettings>(
        chessSettings,
        CHESS_SETTINGS_CACHE_KEY,
      );
      // If the use of localStorage is blocked by user's privacy settings,
      // do NOT try this process again.
      // TODO: send a notification to the user.
      if (!success) setCanUseLocalStorage(false);
    }
  }, [chessSettings, canUseLocalStorage, interacted]);

  return [chessSettings, rehydrate, applySettings, canUseLocalStorage];
};
