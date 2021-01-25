import { Container, Grid } from '@material-ui/core';
import chunk from 'lodash/chunk';
import times from 'lodash/times';
import type { FunctionComponent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useDispatch, useSelector } from 'react-redux';

import Board from '~app/features/chess/components/Board';
import GameControl from '~app/features/chess/components/GameControl';
import GameOverDialog from '~app/features/chess/components/GameOverDialog';
import MoveList from '~app/features/chess/components/MoveList';
import Player from '~app/features/chess/components/Player';
import SettingsDialog from '~app/features/chess/components/SettingsDialog';
import { STOCKFISH_FILE_PATH } from '~app/features/chess/constants';
import {
  useChessClock,
  useChessSettings,
  useChessValidator,
  useStockfish,
} from '~app/features/chess/hooks';
import { createBackendOptions } from '~app/features/chess/react-dnd';
import type { ChessState } from '~app/features/chess/redux';
import { chessActions } from '~app/features/chess/redux/slice';
import { ChessResultType } from '~app/features/chess/types';
import { getRecentMovePath, invertPieceColor } from '~app/features/chess/utils';
import { useUser } from '~app/hooks';
import type { AppDispatch, AppState } from '~app/vendors/redux';

type ChessGameState = Pick<
  ChessState,
  | 'duration'
  | 'engineLevel'
  | 'increment'
  | 'isFlipped'
  | 'isFrozen'
  | 'moves'
  | 'pieces'
  | 'playerColor'
  | 'players'
  | 'result'
  | 'turn'
>;

const ChessGame: FunctionComponent = () => {
  /** Authenticated user paylaod extracted from React Context. */
  const me = useUser();

  // ---------- From Redux ---------- //
  // Extract chess-related state from Redux store.
  const {
    duration,
    engineLevel,
    increment,
    isFlipped,
    isFrozen,
    moves,
    pieces,
    playerColor,
    players,
    result,
    turn,
  } = useSelector<AppState, ChessGameState>(state => ({
    duration: state.chess.duration,
    engineLevel: state.chess.engineLevel,
    increment: state.chess.increment,
    isFlipped: state.chess.isFlipped,
    isFrozen: state.chess.isFrozen,
    moves: state.chess.moves,
    pieces: state.chess.pieces,
    playerColor: state.chess.playerColor,
    players: state.chess.players,
    result: state.chess.result,
    turn: state.chess.turn,
  }));
  /** Action dispatcher to Redux store. */
  const dispatch = useDispatch<AppDispatch>();
  /** List of played moves splitted by their fullmove count. */
  const moveList = useMemo(() => chunk(moves, 2), [moves]);

  // ---------- React local state ---------- //
  // Local state: Update clock for active player side until one of their time runs out.
  const {
    time,
    startClock,
    pauseClock,
    setClockSide,
    resetClock,
  } = useChessClock({ duration, increment });
  // Local state: Use Stockfish as chess move generator & evaluator.
  const { move: engineMove, findMove } = useStockfish({
    duration,
    increment,
    skillLevel: engineLevel,
    filepath: STOCKFISH_FILE_PATH,
  });
  // Chess settings from currently authenticated user.
  const [settings, changeSetting] = useChessSettings(me);
  // Visibility of chess settings dialog.
  const [settingsOpen, setSettingsOpen] = useState(false);
  /** Board element that we want to monitor the size with `react-resize-detector. */
  const boardRef = useRef<HTMLDivElement>(null);
  /** Whether the current turn is the user's turn. */
  const isPlayerTurn = turn === playerColor;
  /**
   * Figure out whether to allow the player to resign the game.
   * 1. The player should be human.
   * 2. The game is not over yet.
   * 3. At least the first move has to be played.
   */
  const canResign = Boolean(playerColor) && !result && moves.length > 0;
  /**
   * Figure out whether to allow the player to request a take back of move.
   * 1. The player should be human.
   * 2. The game is not over yet.
   * 3. The player should have played at least 1 move.
   */
  const canTakeBack =
    Boolean(playerColor) &&
    !result &&
    moves.length > (playerColor === 'w' ? 1 : 0);
  /** Flag to boost AI's performance when < 1 minute left. */
  const isShortInTime = time[turn] < 60 * 1000;
  /** Player color for the top user box */
  const topPlayerColor = isFlipped ? 'w' : 'b';
  /** Player color for the bottom user box */
  const bottomPlayerColor = isFlipped ? 'b' : 'w';
  /** The source & target squares of the recently played move. */
  const recentMovePath = useMemo(() => getRecentMovePath(moves), [moves]);

  // ---------- For other libraries ---------- //
  const validator = useChessValidator();
  /** React DnD: Create backend options asynchronously to work with SSR. */
  const backendOptions = useMemo(() => createBackendOptions(), []);

  // ---------- Callbacks ---------- //
  /** Flip the board direction vertically. */
  const handleFlipBoard = () => dispatch(chessActions.flipBoard());
  /** Request a take back to the opponent. */
  const handleTakeBack = useCallback(() => {
    const length = isPlayerTurn ? 2 : 1;
    // Undo move(s) through the validator first.
    times(length, () => validator.undo());
    // Undo move(s) from redux state and restore the board.
    dispatch(chessActions.undoMove({ fen: validator.fen(), length }));
  }, [dispatch, isPlayerTurn, validator]);
  /** Reset the game data. Swap piece colors when `alternate` is set to true. */
  const rematch = useCallback(() => {
    validator.reset();
    resetClock();
    dispatch(chessActions.resetGame());
  }, [dispatch, resetClock, validator]);
  /** Concede the game. */
  const handleResign = useCallback(() => {
    if (playerColor) {
      dispatch(
        chessActions.setGameOver({
          type: ChessResultType.Resignation,
          winner: invertPieceColor(playerColor),
        }),
      );
    }
  }, [dispatch, playerColor]);
  /** Close the game settings dialog */
  const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);

  // Reset the game data on unmount
  useEffect(() => {
    return () => {
      validator.reset();
      resetClock();
    };
  }, [resetClock, validator]);

  // Run the clock once both player has played a move.
  useEffect(() => {
    if (moves.length === 2) {
      startClock();
    }
  }, [moves, startClock]);

  // Toggle clock's side after a turn change.
  useEffect(() => {
    setClockSide(turn);
  }, [setClockSide, turn]);

  // Stop the clock when the game is over.
  useEffect(() => {
    if (result) {
      pauseClock();
    }
  }, [result, pauseClock]);

  // The game is over by timeout.
  useEffect(() => {
    if (!result) {
      if (time.w === 0) {
        dispatch(
          chessActions.setGameOver({
            type: ChessResultType.Timeout,
            winner: 'b',
          }),
        );
      } else if (time.b === 0) {
        dispatch(
          chessActions.setGameOver({
            type: ChessResultType.Timeout,
            winner: 'w',
          }),
        );
      }
    }
  }, [dispatch, result, time]);

  // The game is over by checkmate.
  useEffect(() => {
    if (!result && validator.in_checkmate()) {
      dispatch(
        chessActions.setGameOver({
          type: ChessResultType.Checkmate,
          winner: invertPieceColor(turn),
        }),
      );
    }
  }, [dispatch, result, turn, validator]);

  // The game is drawn.
  useEffect(() => {
    if (!result) {
      // Drawn by stalemate.
      if (validator.in_stalemate()) {
        dispatch(
          chessActions.setGameOver({
            type: ChessResultType.Stalemate,
          }),
        );
      }
      // Drawn by insufficient material.
      else if (validator.insufficient_material()) {
        dispatch(
          chessActions.setGameOver({
            type: ChessResultType.NotEnoughMaterial,
          }),
        );
      }
      // Drawn by repetition.
      else if (validator.in_threefold_repetition()) {
        dispatch(
          chessActions.setGameOver({
            type: ChessResultType.Repetition,
          }),
        );
      }
    }
  }, [dispatch, result, turn, validator]);

  // When the game is over.
  useEffect(() => {
    if (!result && !isPlayerTurn) {
      findMove({
        history: validator.history({ verbose: true }),
        accelerate: isShortInTime,
      });
    }
  }, [findMove, result, isPlayerTurn, isShortInTime, validator]);

  // Reflect the engine's move to the board.
  useEffect(() => {
    if (engineMove) {
      // validate the move first.
      const move = validator.move(engineMove);
      if (move) dispatch(chessActions.playMove(move));
    }
  }, [dispatch, engineMove, validator]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={9}>
          <DndProvider backend={TouchBackend} options={backendOptions}>
            <Player
              player={players[topPlayerColor]}
              time={time[topPlayerColor]}
            />
            <Board
              targetRef={boardRef}
              pieces={pieces}
              recentMovePath={recentMovePath}
              isFlipped={isFlipped}
              isFrozen={isFrozen}
              isGameOver={Boolean(result)}
              settings={settings}
            />
            <Player
              player={players[bottomPlayerColor]}
              time={time[bottomPlayerColor]}
            />
            <GameOverDialog
              result={result}
              playerColor={playerColor}
              rematch={rematch}
            />
          </DndProvider>
        </Grid>
        <Grid item xs={12} md={3}>
          <GameControl
            canResign={canResign}
            canTakeBack={canTakeBack}
            flipBoard={handleFlipBoard}
            resign={handleResign}
            takeBack={handleTakeBack}
            openSettings={openSettings}
          />
          <MoveList moveList={moveList} />
          <SettingsDialog
            isOpen={settingsOpen}
            settings={settings}
            changeSetting={changeSetting}
            closeSettings={closeSettings}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChessGame;
