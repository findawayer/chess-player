import { Box, Container } from '@material-ui/core';
import chunk from 'lodash/chunk';
import times from 'lodash/times';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useDispatch, useSelector } from 'react-redux';

import ChessBoard from '~/features/chess/components/ChessBoard';
import ChessControl from '~/features/chess/components/ChessControl';
import ChessGameOverDialog from '~/features/chess/components/ChessGameOverDialog';
import ChessMoveList from '~/features/chess/components/ChessMoveList';
import ChessPlayer from '~/features/chess/components/ChessPlayer';
import ChessSettingsDialog from '~/features/chess/components/ChessSettingsDialog';
import { STOCKFISH_FILE_PATH } from '~/features/chess/constants';
import { ChessValidatorContext } from '~/features/chess/contexts';
import {
  useChessClock,
  useChessSettings,
  useStockfish,
} from '~/features/chess/hooks';
import { createBackendOptions } from '~/features/chess/react-dnd';
import {
  checkmate,
  flipBoard,
  notEnoughMaterial,
  playMove,
  repetition,
  resetGame,
  resign,
  setPieces,
  setPlayers,
  stalemate,
  timeout,
  undoMove,
} from '~/features/chess/slice';
import { ChessState } from '~/features/chess/state';
import { ChessPieceColor } from '~/features/chess/types';
import {
  createComputers,
  createHumanAndComputer,
  getRecentMovePath,
  invertPieceColor,
} from '~/features/chess/utils';
import { useUser } from '~/hooks';
import { AppDispatch, AppState } from '~/vendors/redux';

const ChessGame: React.FC = () => {
  // ---------- From database ---------- //
  const me = useUser();

  // ---------- From Redux ---------- //
  // Extract chess-related state from Redux store.
  const {
    duration,
    engineLevel,
    gameOver,
    increment,
    isFlipped,
    isFrozen,
    moves,
    playerColor,
    pieces,
    players,
    turn,
  } = useSelector<AppState, ChessState>(state => state.chess);
  /** Action dispatcher to Redux store. */
  const dispatch = useDispatch<AppDispatch>();
  /** List of played moves splitted by their fullmove count. */
  const moveList = useMemo(() => chunk(moves, 2), [moves]);

  // ---------- From React context ---------- //
  /** chess game validator. */
  const validator = useContext(ChessValidatorContext);

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
   * 1. The game should not be computer vs computer mode.
   * 2. The game is not over yet.
   * 3. At least the first move has to be played.
   */
  const canResign = !!playerColor && !gameOver && moves.length > 0;
  /**
   * Figure out whether to allow the player to request a take back of move.
   * 1. The game should not be computer vs computer mode.
   * 2. The game is not over yet.
   * 3. The player should have played at least 1 move.
   * 4. It should be the player's turn. (TODO: reconsider this behavior)
   */
  const canTakeBack =
    !!playerColor &&
    !gameOver &&
    moves.length > (playerColor === 'w' ? 1 : 0) &&
    isPlayerTurn;
  /** Flag to boost AI's performance when < 1 minute left. */
  const isShortInTime = time[turn] < 60 * 1000;
  /** Player color for the top user box */
  const topPlayerColor: ChessPieceColor = isFlipped ? 'w' : 'b';
  /** Player color for the bottom user box */
  const bottomPlayerColor: ChessPieceColor = isFlipped ? 'b' : 'w';
  /** The source & target squares of the recently played move. */
  const recentMovePath = useMemo(() => getRecentMovePath(moves), [moves]);

  // ---------- For other libraries ---------- //
  /** React DnD: Create backend options asynchronously to work with SSR. */
  const backendOptions = useMemo(() => createBackendOptions(), []);

  // ---------- Callbacks ---------- //
  /** Flip the board direction vertically. */
  const handleFlipBoard = () => dispatch(flipBoard());
  /** Request a take back to the opponent. */
  const handleTakeBack = useCallback(() => {
    const length = isPlayerTurn ? 2 : 1;
    // Undo move(s) through the validator first.
    times(length, () => validator.undo());
    // Undo move(s) from redux state and restore the board.
    dispatch(undoMove({ length, board: validator.board() }));
  }, [dispatch, isPlayerTurn, validator]);
  /** Reset the game data. Swap piece colors when `alternate` is set to true. */
  const rematch = useCallback(
    (alternate: boolean) => {
      validator.reset();
      resetClock();
      dispatch(resetGame({ board: validator.board(), alternate }));
    },
    [dispatch, resetClock, validator],
  );
  /** Concede the game. */
  const handleResign = () => dispatch(resign());
  /** Close the game settings dialog */
  const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);

  // Reset the game data on unmount
  useEffect(() => {
    return () => rematch(false);
  }, [rematch]);

  // Initialize players.
  useEffect(() => {
    const players = playerColor
      ? createHumanAndComputer({ playerColor })
      : createComputers();
    dispatch(setPlayers(players));
  }, [dispatch, playerColor]);

  // Initialize pieces.
  useEffect(() => {
    // debug
    // validator.load(FEN_WHITE_EN_PASSANT);
    dispatch(setPieces({ board: validator.board() }));
  }, [dispatch, validator]);

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
    if (gameOver) {
      pauseClock();
    }
  }, [gameOver, pauseClock]);

  // The game is over by timeout.
  useEffect(() => {
    if (!gameOver) {
      if (time.w === 0) {
        dispatch(timeout({ winner: 'b' }));
      } else if (time.b === 0) {
        dispatch(timeout({ winner: 'w' }));
      }
    }
  }, [dispatch, gameOver, time]);

  // The game is over by checkmate.
  useEffect(() => {
    if (!gameOver && validator.in_checkmate()) {
      dispatch(checkmate({ winner: invertPieceColor(turn) }));
    }
  }, [dispatch, gameOver, turn, validator]);

  // The game is drawn.
  useEffect(() => {
    if (!gameOver) {
      // Drawn by stalemate.
      if (validator.in_stalemate()) {
        dispatch(stalemate());
      }
      // Drawn by insufficient material.
      else if (validator.insufficient_material()) {
        dispatch(notEnoughMaterial());
      }
      // Drawn by repetition.
      else if (validator.in_threefold_repetition()) {
        dispatch(repetition());
      }
    }
  }, [dispatch, gameOver, turn, validator]);

  // When the game is over.
  useEffect(() => {
    if (!gameOver && !isPlayerTurn) {
      findMove({
        history: validator.history({ verbose: true }),
        accelerate: isShortInTime,
      });
    }
  }, [findMove, gameOver, isPlayerTurn, isShortInTime, validator]);

  // Reflect the engine's move to the board.
  useEffect(() => {
    if (engineMove) {
      // validate the move first.
      const move = validator.move(engineMove);
      if (move) dispatch(playMove(move));
    }
  }, [dispatch, engineMove, validator]);

  return (
    <Container maxWidth="lg">
      <Box display="flex" flexWrap="nowrap">
        <Box flexGrow={1}>
          <DndProvider backend={TouchBackend} options={backendOptions}>
            <ChessPlayer
              player={players[topPlayerColor]}
              time={time[topPlayerColor]}
            />
            <ChessBoard
              targetRef={boardRef}
              validator={validator}
              pieces={pieces}
              recentMovePath={recentMovePath}
              isFlipped={isFlipped}
              isFrozen={isFrozen}
              isGameOver={!!gameOver}
              settings={settings}
            />
            <ChessPlayer
              player={players[bottomPlayerColor]}
              time={time[bottomPlayerColor]}
            />
            <ChessGameOverDialog
              gameOver={gameOver}
              playerColor={playerColor}
              rematch={rematch}
            />
          </DndProvider>
        </Box>
        <Box flexShrink={0} flexBasis={300} ml={10}>
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
            isOpen={settingsOpen}
            close={closeSettings}
            settings={settings}
            changeSetting={changeSetting}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ChessGame;
