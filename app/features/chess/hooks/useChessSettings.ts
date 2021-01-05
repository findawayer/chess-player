import { ChessBoardColor } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';

import {
  DEFAULT_AUTO_QUEEN,
  DEFAULT_BOARD_COLOR,
  DEFAULT_SHOW_LEGAL,
  DEFAULT_SHOW_RECENT,
} from '~app/features/chess/constants';
import { CurrentUser } from '~app/graphql';

export interface ChessSettings {
  autoQueen: boolean;
  boardColor: ChessBoardColor;
  showLegal: boolean;
  showRecent: boolean;
}

/** Map user settings about chess gaming from the current auth user payload. */
export const createChessSettings = (me: CurrentUser | null): ChessSettings => ({
  autoQueen: me?.chessAutoQueen || DEFAULT_AUTO_QUEEN,
  boardColor: me?.chessBoardColor || DEFAULT_BOARD_COLOR,
  showLegal: me?.chessShowLegal || DEFAULT_SHOW_LEGAL,
  showRecent: me?.chessShowRecent || DEFAULT_SHOW_RECENT,
});

/** Convert chess settings to comply with database table keys. (preefix `chess-`) */
export const mapChessSettings = (settings: ChessSettings) => ({
  chessAutoQueen: settings.autoQueen,
  chessBoardColor: settings.boardColor,
  chessShowLegal: settings.showLegal,
  chessShowRecent: settings.showRecent,
});

export const useChessSettings = (me: CurrentUser | null) => {
  // Chess settings from currently authenticated user.
  const [settings, setSettings] = useState(createChessSettings(me));
  // This prevents refetching settings from server after submitting new data.
  const isHydrated = useRef(false);

  /** Change a single entry in settings object. */
  const changeSetting = (
    name: keyof ChessSettings,
    value: ChessSettings[keyof ChessSettings],
  ): void => {
    setSettings(previousSettings => ({
      ...previousSettings,
      [name]: value,
    }));
  };

  // Refresh chess settings when the user authentication status changes.
  useEffect(() => {
    // Prevent duplicate call.
    if (!isHydrated.current && me) {
      isHydrated.current = true;
      setSettings(createChessSettings(me));
    }
  }, [me]);

  return [settings, changeSetting] as const;
};
