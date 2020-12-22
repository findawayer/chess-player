import chunk from 'lodash/chunk';
import times from 'lodash/times';
import React, { memo, useCallback, useContext, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChessControl from '@/components/ChessControl';
import ChessMoveList from '@/components/ChessMoveList';
import ChessSettingsDialog from '@/components/ChessSettingsDialog';
import { ChessValidatorContext } from '@/contexts';
import { ApplyChessSettings } from '@/hooks';
import { ChessState, flipBoard, resign, undoMove } from '@/slices/chess';
import { ChessSettings } from '@/types';
import { AppState } from '@/vendors/redux';

type ChessSidebarState = Pick<
  ChessState,
  'gameOver' | 'moves' | 'playerColor' | 'turn'
>;

interface ChessSidebarProps {
  settings: ChessSettings;
  applySettings: ApplyChessSettings;
}

const ChessSidebar: React.FC<ChessSidebarProps> = ({
  settings,
  applySettings,
}) => {
  /** chess game validator. */
  const validator = useContext(ChessValidatorContext);
  // Fetch state from Redux store.
  const { gameOver, moves, playerColor, turn } = useSelector<
    AppState,
    ChessSidebarState
  >(state => ({
    gameOver: state.chess.gameOver,
    moves: state.chess.moves,
    playerColor: state.chess.playerColor,
    turn: state.chess.turn,
  }));
  /** Action dispatcher to Redux store. */
  const dispatch = useDispatch();
  // Local state: Settings dialog's visibility.
  const [settingsVisibility, setSettingsVisibilty] = useState(false);
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
  /** Close the game settings dialog */
  const openSettings = useCallback(() => {
    setSettingsVisibilty(true);
  }, []);
  const closeSettings = useCallback(() => {
    setSettingsVisibilty(false);
  }, []);

  return (
    <>
      <ChessControl
        canResign={canResign}
        canTakeBack={canTakeBack}
        flipBoard={handleFlipBoard}
        resign={handleResign}
        takeBack={handleTakeBack}
        openSettings={openSettings}
      />
      <ChessMoveList moveList={moveList} />
      <ChessSettingsDialog
        isOpen={settingsVisibility}
        settings={settings}
        applySettings={applySettings}
        closeSettings={closeSettings}
      />
    </>
  );
};

// Using memoization because `chunk` process can be costly.
export default memo(ChessSidebar);
