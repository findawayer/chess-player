import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Move } from 'chess.js';

import { SCORE_DRAW, SCORE_WIN } from './constants';
import {
  createPieces,
  invertPieceColor,
  isCastling,
  isEnPassant,
  isQueenSideSquare,
  shiftSquareName,
} from './utils';
import { initializeChessState } from './state';
import {
  ChessBoardData,
  ChessGameOverType,
  ChessMove,
  ChessPieceColor,
  ChessPlayer,
  ChessSquareName,
} from './types';

// Action types
export enum ChessActionType {
  // Game definitions
  SetDuration = 'setDuration',
  SetIncrement = 'setIncrement',
  SetPlayerColor = 'setPlayerColor',
  SetPlayerColorByOption = 'setPlayerColor',
  SetEngineLevel = 'setEngineLevel',
  // Pieces
  SetPieces = 'setPieces',
  MovePiece = 'movePiece',
  // Moves
  PlayMove = 'playMove',
  UndoMove = 'undoMove',
  ClearMoves = 'clearMoves',
  // Players
  SetPlayers = 'setPlayers',
  // Guide
  SetActive = 'setActive',
  // Game control
  Checkmate = 'checkmate',
  Resign = 'resign',
  Timeout = 'timeout',
  Stalemate = 'stalemate',
  NotEnoughMaterial = 'notEnoughMaterial',
  Repetition = 'repetition',
  ResetGame = 'resetGame',
  FlipBoard = 'flipBoard',
  // Unsorted (should be empty)
}

const chessSlice = createSlice({
  name: 'chess',
  initialState: initializeChessState(),
  // Note that mutable reducers *ONLY* work inside `createSlice`.
  reducers: {
    // ---------- Game definitions ---------- //
    // setDuration
    [ChessActionType.SetDuration]: (
      chess,
      action: PayloadAction<number, ChessActionType>,
    ) => {
      chess.duration = action.payload;
    },
    // setIncrement
    [ChessActionType.SetIncrement]: (
      chess,
      action: PayloadAction<number, ChessActionType>,
    ) => {
      chess.increment = action.payload;
    },
    // setPlayerColr
    [ChessActionType.SetPlayerColor]: (
      chess,
      action: PayloadAction<ChessPieceColor | null, ChessActionType>,
    ) => {
      const playerColor = action.payload;
      chess.playerColor = playerColor;
      chess.isFlipped = playerColor === 'b';
    },
    // setEngineLevel
    [ChessActionType.SetEngineLevel]: (
      chess,
      action: PayloadAction<number, ChessActionType>,
    ) => {
      chess.engineLevel = action.payload;
    },

    // ---------- Pieces ---------- //
    // setPieces
    [ChessActionType.SetPieces]: (
      chess,
      action: PayloadAction<{ board: ChessBoardData }, ChessActionType>,
    ) => {
      chess.pieces = createPieces(action.payload.board);
    },
    /**
     * movePiece
     * Visually move the piece, without updating movelist. Used for pawn promotion.
     */
    [ChessActionType.MovePiece]: (
      chess,
      action: PayloadAction<ChessMove, ChessActionType>,
    ) => {
      const { from, to } = action.payload;
      // Find the ID of the piece that just moved.
      const movedPieceId = chess.pieces.positions[from]!;
      // Set the piece to the target square.
      // This will remove any captured piece from the square.
      chess.pieces.positions[to] = movedPieceId;
      // Remove piece from the original square.
      delete chess.pieces.positions[from];
    },

    // ---------- Moves ---------- //
    // playMove
    [ChessActionType.PlayMove]: (
      chess,
      action: PayloadAction<Move, ChessActionType>,
    ) => {
      const move = action.payload;
      const { from, to, promotion, san } = move;
      // Move the piece accordingly.
      // 1. Find the piece that just moved.
      const movedPieceId = chess.pieces.positions[from];
      if (movedPieceId) {
        // 2. Set the piece's positionning to the target square.
        //    (This will capture the piece that may have been occupying the target square.)
        chess.pieces.positions[to] = movedPieceId;
        // 3. Remove piece from the original square.
        delete chess.pieces.positions[from];
      }
      // Promote pawn to the selected piece type.
      if (promotion) {
        // 1. Find the promoting pawn.
        const pawnId = chess.pieces.positions[move.to]!;
        // 2. Update the pawn's piece type.
        chess.pieces.byId[pawnId].variant = promotion;
      }
      // Handle castling.
      else if (isCastling(move)) {
        // 1. Find the direction of castling.
        const isQueenSide = isQueenSideSquare(to);
        // 2. Find the rook involved in the castling.
        const rookRank = to[1];
        const rookSquare = `${
          isQueenSide ? 'a' : 'h'
        }${rookRank}` as ChessSquareName;
        const rookId = chess.pieces.positions[rookSquare]!;
        // 3. Calculate the new square of the rook.
        //    It should be the adjacent square over which the king crosses.
        const rookNewSquare = shiftSquareName(to, isQueenSide ? 1 : -1);
        // 4. Move the rook.
        chess.pieces.positions[rookNewSquare] = rookId;
        delete chess.pieces.positions[rookSquare];
      }
      // Handle en passant move
      else if (isEnPassant(move)) {
        const isWhitePawn = chess.pieces.byId[movedPieceId].color === 'w';
        const capturedPawnPosition = shiftSquareName(
          move.to,
          0,
          isWhitePawn ? 1 : -1,
        );
        delete chess.pieces.positions[capturedPawnPosition];
      }
      // Update movelist.
      // 1. Calculate fullmove, halfmove based on previous movelist length.
      // (Do NOT rely on FEN available in `chess.js` API since the fullmove
      // is mutated right after the move is played.)
      const fullmove = Math.floor(chess.moves.length / 2) + 1;
      const halfmove = chess.moves.length + 1;
      // 2. Add move to the `moves` state.
      chess.moves.push({ fullmove, halfmove, from, to, san });
      // 3. Update turn
      chess.turn = invertPieceColor(chess.turn);
    },
    // undoMove
    [ChessActionType.UndoMove]: (
      chess,
      action: PayloadAction<
        { length: number; board: ChessBoardData },
        ChessActionType
      >,
    ) => {
      // Default undo length to 1
      const undoLength = action.payload.length || 1;
      // Update movelist.
      // 1. Find the range of moves to remove.
      const startIndex = undoLength * -1;
      const removedSize = chess.moves.length - startIndex;
      // 2. Pop from the movelist.
      chess.moves.splice(startIndex, removedSize);
      // 3. Update turn.
      if (undoLength % 2) {
        chess.turn = invertPieceColor(chess.turn);
      }
      // 4. Update pieces.
      chess.pieces = createPieces(action.payload.board);
    },
    // clearMoves
    [ChessActionType.ClearMoves]: chess => {
      chess.moves = [];
      chess.turn = 'w';
    },

    // ---------- Players ---------- //
    // setPlayers
    [ChessActionType.SetPlayers]: (
      chess,
      action: PayloadAction<
        Record<ChessPieceColor, ChessPlayer>,
        ChessActionType
      >,
    ) => {
      const players = action.payload;
      Object.assign(chess.players.w, players.w);
      Object.assign(chess.players.b, players.b);
    },

    // ---------- Game control ---------- //
    // checkmate
    [ChessActionType.Checkmate]: (
      chess,
      action: PayloadAction<{ winner: ChessPieceColor }, ChessActionType>,
    ) => {
      const { winner } = action.payload;
      chess.gameOver = {
        type: ChessGameOverType.Checkmate,
        winner,
      };
      chess.players[winner].score += 1;
      chess.isFrozen = true;
    },
    // timeout
    [ChessActionType.Timeout]: (
      chess,
      action: PayloadAction<{ winner: ChessPieceColor }, ChessActionType>,
    ) => {
      const { winner } = action.payload;
      chess.gameOver = {
        type: ChessGameOverType.Timeout,
        winner,
      };
      chess.players[winner].score += SCORE_WIN;
      chess.isFrozen = true;
    },
    // resignGame
    [ChessActionType.Resign]: chess => {
      if (!chess.gameOver && chess.playerColor) {
        const winner = invertPieceColor(chess.playerColor);
        chess.gameOver = {
          type: ChessGameOverType.Resignation,
          winner,
        };
        chess.players[winner].score += SCORE_WIN;
        chess.isFrozen = true;
      }
    },
    // stalemate
    [ChessActionType.Stalemate]: chess => {
      chess.gameOver = {
        type: ChessGameOverType.Stalemate,
        winner: null,
      };
      chess.players.w.score += SCORE_DRAW;
      chess.players.b.score += SCORE_DRAW;
      chess.isFrozen = true;
    },
    // notEnoughMaterial
    [ChessActionType.NotEnoughMaterial]: chess => {
      chess.gameOver = {
        type: ChessGameOverType.NotEnoughMaterial,
        winner: null,
      };
      chess.players.w.score += SCORE_DRAW;
      chess.players.b.score += SCORE_DRAW;
      chess.isFrozen = true;
    },
    // repetition
    [ChessActionType.Repetition]: chess => {
      chess.gameOver = {
        type: ChessGameOverType.Repetition,
        winner: null,
      };
      chess.players.w.score += SCORE_DRAW;
      chess.players.b.score += SCORE_DRAW;
      chess.isFrozen = true;
    },
    // resetGame
    [ChessActionType.ResetGame]: (
      chess,
      action: PayloadAction<
        { board: ChessBoardData; alternate: boolean },
        ChessActionType
      >,
    ) => {
      // Reset pieces
      chess.pieces = createPieces(action.payload.board);
      // Reset moves.
      chess.moves = [];
      // Reset turn.
      chess.turn = 'w';
      // Setup a rematch state
      if (action.payload.alternate) {
        // Swap player colors.
        [chess.players.w, chess.players.b] = [chess.players.b, chess.players.w];
        // Toggle the user's color.
        if (chess.playerColor) {
          chess.playerColor = invertPieceColor(chess.playerColor);
        }
        // Flip the board.
        chess.isFlipped = !chess.isFlipped;
      }
      // Reset game over status.
      chess.gameOver = false;
      // Unfreeze gameplay.
      chess.isFrozen = false;
    },
    // flipBoard
    [ChessActionType.FlipBoard]: chess => {
      chess.isFlipped = !chess.isFlipped;
    },

    // ---------- Unsorted (should be empty) ---------- //
  },
});

const { actions, reducer } = chessSlice;

export const {
  // Game settings
  setDuration,
  setIncrement,
  setPlayerColor,
  setEngineLevel,
  // Pieces
  setPieces,
  movePiece,
  // Moves
  playMove,
  undoMove,
  clearMoves,
  // Players
  setPlayers,
  // Game control
  checkmate,
  resign,
  timeout,
  stalemate,
  notEnoughMaterial,
  repetition,
  resetGame,
  flipBoard,
  // Unsorted (should be empty)
} = actions;

export { reducer as chessReducer };
