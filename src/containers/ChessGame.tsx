import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChessBoard from '@components/ChessBoard';
import ChessGameOverDialog from '@components/ChessGameOverDialog';
import ChessPlayer from '@components/ChessPlayer';
import { ChessValidatorContext, ChessBoardThemeContext } from '@contexts';
import {
  createComputers,
  createHumanAndComputer,
  invertPieceColor,
  getRecentMovePath,
} from '@helpers';
import { useChessClock, useStockfish } from '@hooks';
// import { FEN_WHITE_STALEMATE } from '@settings';
import {
  ChessState,
  checkmate,
  notEnoughMaterial,
  playMove,
  resetGame,
  repetition,
  setPieces,
  setPlayers,
  stalemate,
  timeout,
} from '@slices/chess';
import { getChessBoardTheme } from '@themes';
import { ChessPieceColor, GameSettings } from '@types';
import { AppDispatch, AppState } from '@vendors/redux';

const ChessGame: React.FC = () => {
  /** chess game validator. */
  const validator = useContext(ChessValidatorContext);
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
  // Extract chess settings related state from Redux store.
  const {
    autoPromoteToQueen,
    boardColor,
    highlightMoves,
    showLegalMoves,
  } = useSelector<AppState, GameSettings>(state => state.preferences);
  /** Action dispatcher to Redux store. */
  const dispatch = useDispatch<AppDispatch>();
  // Local state: Update clock for active player side until one of their time runs out.
  const {
    time,
    startClock,
    pauseClock,
    setClockSide,
    resetClock,
  } = useChessClock({ duration, increment });
  // Local state: Use Stockfish as chess move generator & evaluator.
  const [engineMove, findMove] = useStockfish({
    duration,
    increment,
    skillLevel: engineLevel,
    filepath: 'assets/stockfish/src/stockfish.js',
  });
  /** Chess board theme of user's choice. */
  const userChessBoardTheme = useMemo(() => getChessBoardTheme(boardColor), [
    boardColor,
  ]);
  /** Whether the current turn is the user's turn. */
  const isPlayerTurn = turn === playerColor;
  /** Flag to boost AI's performance when < 1 minute left. */
  const isShortInTime = time[turn] < 60 * 1000;
  /** Player color for the top user box */
  const topPlayerColor: ChessPieceColor = isFlipped ? 'w' : 'b';
  /** Player color for the bottom user box */
  const bottomPlayerColor: ChessPieceColor = isFlipped ? 'b' : 'w';
  /** The source & target squares of the recently played move. */
  const recentMovePath = useMemo(() => getRecentMovePath(moves), [moves]);

  console.log('render');

  /** Reset the game data. Swap piece colors when `alternate` is set to true. */
  const rematch = useCallback(
    (alternate: boolean) => {
      validator.reset();
      resetClock();
      dispatch(resetGame({ board: validator.board(), alternate }));
    },
    [dispatch, resetClock, validator],
  );

  // Reset the game data on unmount
  useEffect(() => {
    return () => rematch(false);
  }, [rematch]);

  // Initialize players before rendering.
  useLayoutEffect(() => {
    const players = playerColor
      ? createHumanAndComputer({ playerColor })
      : createComputers();
    dispatch(setPlayers(players));
  }, [dispatch, playerColor]);

  // Initialize pieces.
  useLayoutEffect(() => {
    // debug
    // validator.load(FEN_WHITE_STALEMATE);
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
    <>
      <ChessBoardThemeContext.Provider value={userChessBoardTheme}>
        <ChessPlayer
          player={players[topPlayerColor]}
          time={time[topPlayerColor]}
        />
        <ChessBoard
          pieces={pieces}
          autoPromoteToQueen={autoPromoteToQueen}
          highlightMoves={highlightMoves}
          showLegalMoves={showLegalMoves}
          recentMovePath={recentMovePath}
          isFlipped={isFlipped}
          isFrozen={isFrozen}
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
      </ChessBoardThemeContext.Provider>
    </>
  );
};

export default ChessGame;
