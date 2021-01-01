import { useMutation } from '@apollo/client';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';

import { CURRENT_USER_QUERY } from '~/graphql';
import { useUser } from '~/hooks';
import {
  DEFAULT_AUTO_QUEEN,
  DEFAULT_BOARD_COLOR,
  DEFAULT_SHOW_LEGAL,
  DEFAULT_SHOW_RECENT,
} from '../constants';
import { UPDATE_CHESS_SETTINGS_MUTATION } from '../graphql';

type ChessPreferences = Pick<
  User,
  'chessAutoQueen' | 'chessBoardColor' | 'chessShowLegal' | 'chessShowRecent'
>;

const mapPreferences = ({
  chessAutoQueen,
  chessBoardColor,
  chessShowLegal,
  chessShowRecent,
}: ChessPreferences) => ({
  autoQueen: chessAutoQueen,
  boardColor: chessBoardColor,
  showLegal: chessShowLegal,
  showRecent: chessShowRecent,
});

/**
 * This hook provides user preferences over chess game settings with fallbacks.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useChessSettings = () => {
  // Require the authenticated user.
  const me = useUser();
  // Create default settings.
  const [settings, setSettings] = useState({
    autoQueen: DEFAULT_AUTO_QUEEN,
    boardColor: DEFAULT_BOARD_COLOR,
    showLegal: DEFAULT_SHOW_LEGAL,
    showRecent: DEFAULT_SHOW_RECENT,
  });
  // Update chess settings.
  const [updateSettings] = useMutation(UPDATE_CHESS_SETTINGS_MUTATION, {
    variables: {
      id: me?.id,
      chessAutoQueen: settings.autoQueen,
      chessBoardColor: settings.boardColor,
      chessShowLegal: settings.showLegal,
      chessShowRecent: settings.showRecent,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  // Reflect user preferences to the settings.
  useEffect(() => {
    if (me) setSettings(mapPreferences(me));
  }, [me]);

  return [settings, updateSettings] as const;
};
