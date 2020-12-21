import chunk from 'lodash/chunk';
import times from 'lodash/times';
import React, { memo, useCallback, useContext, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChessControl from '@components/ChessControl';
import ChessMoveList from '@components/ChessMoveList';
import ChessSettingsDialog from '@components/ChessSettingsDialog';
import { ChessValidatorContext } from '@contexts';
import { ChessState, flipBoard, resign, undoMove } from '@slices/chess';
import { PreferencesState, updateGameSettings } from '@slices/preferences';
import { AppState } from '@vendors/redux';

interface ChessSidebarState
  extends Pick<ChessState, 'gameOver' | 'moves' | 'playerColor' | 'turn'> {
  settings: PreferencesState;
}

const ChessSidebar: React.FC = () => {
  /** chess game validator. */
  const validator = useContext(ChessValidatorContext);
  // Fetch state from Redux store.
  const { settings, gameOver, moves, playerColor, turn } = useSelector<
    AppState,
    ChessSidebarState
  >(state => ({
    gameOver: state.chess.gameOver,
    moves: state.chess.moves,
    playerColor: state.chess.playerColor,
    settings: state.preferences,
    turn: state.chess.turn,
  }));
  /** Action dispatcher to Redux store. */
  const dispatch = useDispatch();
  // Local state: Settings dialog's visibility.
  const [openSettings, setOpenSettings] = useState(false);
  /** Whether the current turn is the user's turn. */
  const isPlayerTurn = turn === playerColor;
  /** List of played moves splitted by their fullmove count. */
  const moveList = useMemo(() => chunk(moves, 2), [moves]);
  /**
   * Figure out whether to allow the player to resign the game.
   * 1. The game should not be computer vs computer mode.
   * 2. The game is not over yet.
   * 3. At least the first move has to be played.
   */
  const canResign = useMemo(
    () => !!playerColor && !gameOver && moves.length > 0,
    [gameOver, playerColor, moves],
  );
  /**
   * Figure out whether to allow the player to request a take back of move.
   * 1. The game should not be computer vs computer mode.
   * 2. The game is not over yet.
   * 3. The player should have played at least 1 move.
   * 4. It should be the player's turn. (TODO: reconsider this behavior)
   */
  const canTakeBack = useMemo(
    () =>
      !!playerColor &&
      !gameOver &&
      moves.length > (playerColor === 'w' ? 1 : 0) &&
      turn === playerColor,
    [gameOver, moves, playerColor, turn],
  );

  /** Flip the board direction vertically. */
  const handleFlipBoard = useCallback(() => dispatch(flipBoard()), [dispatch]);
  /** Request a take back to the opponent. */
  const handleTakeBack = useCallback(() => {
    const length = isPlayerTurn ? 2 : 1;
    // Undo move(s) through the validator first.
    times(length, () => validator.undo());
    // Undo move(s) from redux state and restore the board.
    dispatch(undoMove({ length, board: validator.board() }));
  }, [dispatch, isPlayerTurn, validator]);
  /** Concede the game. */
  const handleResign = useCallback(() => dispatch(resign()), [dispatch]);
  const toggleSettings = (force?: boolean) => {
    setOpenSettings(previousOpenSettings =>
      typeof force === 'boolean' ? force : !previousOpenSettings,
    );
  };
  /** Update game settings */
  const updateSettings = useCallback(
    (update: Partial<PreferencesState>) => dispatch(updateGameSettings(update)),
    [dispatch],
  );

  return (
    <>
      <ChessControl
        canResign={canResign}
        canTakeBack={canTakeBack}
        flipBoard={handleFlipBoard}
        resign={handleResign}
        takeBack={handleTakeBack}
        toggleSettings={toggleSettings}
      />
      <ChessMoveList moveList={moveList} />
      <ChessSettingsDialog
        isOpen={openSettings}
        settings={settings}
        toggleSettings={toggleSettings}
        updateSettings={updateSettings}
      />
    </>
  );
};

// Using memoization because `chunk` process can be costly.
export default memo(ChessSidebar);
