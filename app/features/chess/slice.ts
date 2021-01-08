import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Move } from 'chess.js';

import { SCORE_DRAW, SCORE_WIN } from './constants';
import { initialChessState } from './state';
import type {
  ChessBoardData,
  ChessMove,
  ChessPieceColor,
  ChessPlayer,
  ChessSquareName,
} from './types';
import { ChessGameOverType } from './types';
import {
  createPieces,
  invertPieceColor,
  isCastling,
  isEnPassant,
  isQueenSideSquare,
  shiftSquareName,
} from './utils';

// Redux-toolkit slice: `chess`
const chessSlice = createSlice({
  // Action type prefix.
  name: 'chess',
  // Initial state.
  initialState: initialChessState,
  // Note that mutable reducers *ONLY* work inside `createSlice`.
  reducers: {
    // ---------- Game definitions ---------- //
    // setDuration
    setDuration: (chess, action: PayloadAction<number>) => {
      chess.duration = action.payload;
    },
    // setIncrement
    setIncrement: (chess, action: PayloadAction<number>) => {
      chess.increment = action.payload;
    },
    // setPlayerColr
    setPlayerColor: (chess, action: PayloadAction<ChessPieceColor | null>) => {
      const playerColor = action.payload;
      chess.playerColor = playerColor;
      chess.isFlipped = playerColor === 'b';
    },
    // setEngineLevel
    setEngineLevel: (chess, action: PayloadAction<number>) => {
      chess.engineLevel = action.payload;
    },

    // ---------- Pieces ---------- //
    // setPieces
    setPieces: (chess, action: PayloadAction<{ board: ChessBoardData }>) => {
      chess.pieces = createPieces(action.payload.board);
    },
    /**
     * movePiece
     * Visually move the piece, without updating movelist. Used for pawn promotion.
     */
    movePiece: (chess, action: PayloadAction<ChessMove>) => {
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
    playMove: (chess, action: PayloadAction<Move>) => {
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
    undoMove: (
      chess,
      action: PayloadAction<{ board: ChessBoardData; length?: number }>,
    ) => {
      // Default undo length to 1
      const undoLength = action.payload.length ?? 1;
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
    clearMoves: chess => {
      chess.moves = [];
      chess.turn = 'w';
    },

    // ---------- Players ---------- //
    // setPlayers
    setPlayers: (
      chess,
      action: PayloadAction<Record<ChessPieceColor, ChessPlayer>>,
    ) => {
      const players = action.payload;
      Object.assign(chess.players.w, players.w);
      Object.assign(chess.players.b, players.b);
    },

    // ---------- Game control ---------- //
    // checkmate
    checkmate: (chess, action: PayloadAction<{ winner: ChessPieceColor }>) => {
      const { winner } = action.payload;
      chess.gameOver = {
        type: ChessGameOverType.Checkmate,
        winner,
      };
      chess.players[winner].score += 1;
      chess.isFrozen = true;
    },
    // timeout
    timeout: (chess, action: PayloadAction<{ winner: ChessPieceColor }>) => {
      const { winner } = action.payload;
      chess.gameOver = {
        type: ChessGameOverType.Timeout,
        winner,
      };
      chess.players[winner].score += SCORE_WIN;
      chess.isFrozen = true;
    },
    // resignGame
    resign: chess => {
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
    stalemate: chess => {
      chess.gameOver = {
        type: ChessGameOverType.Stalemate,
        winner: null,
      };
      chess.players.w.score += SCORE_DRAW;
      chess.players.b.score += SCORE_DRAW;
      chess.isFrozen = true;
    },
    // notEnoughMaterial
    notEnoughMaterial: chess => {
      chess.gameOver = {
        type: ChessGameOverType.NotEnoughMaterial,
        winner: null,
      };
      chess.players.w.score += SCORE_DRAW;
      chess.players.b.score += SCORE_DRAW;
      chess.isFrozen = true;
    },
    // repetition
    repetition: chess => {
      chess.gameOver = {
        type: ChessGameOverType.Repetition,
        winner: null,
      };
      chess.players.w.score += SCORE_DRAW;
      chess.players.b.score += SCORE_DRAW;
      chess.isFrozen = true;
    },
    // resetGame
    resetGame: (
      chess,
      action: PayloadAction<{ board: ChessBoardData; alternate: boolean }>,
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
    flipBoard: chess => {
      chess.isFlipped = !chess.isFlipped;
    },
  },
});

// Actions
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
} = chessSlice.actions;

// Reducer
export const chessReducer = chessSlice.reducer;
