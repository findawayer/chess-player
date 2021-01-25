import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Move } from 'chess.js';
import sample from 'lodash/sample';

import {
  INITIAL_FEN,
  SCORE_DRAW,
  SCORE_WIN,
} from '~app/features/chess/constants';
import type {
  ChessMove,
  ChessPieceColor,
  ChessSquareName,
} from '~app/features/chess/types';
import { ChessPlayer, ChessResult } from '~app/features/chess/types';
import {
  createAIPlayer,
  createPieces,
  createPlayers,
  invertPieceColor,
  isCastling,
  isEnPassant,
  isQueenSideSquare,
  shiftSquareName,
} from '~app/features/chess/utils';

import { ChessState, initialChessState } from './state';

interface ChessConfig
  extends Pick<ChessState, 'duration' | 'engineLevel' | 'increment'> {
  mode: 'play' | 'simulate';
  playerColor: ChessPieceColor | 'random';
}

const chessSlice = createSlice({
  name: 'chess',
  initialState: initialChessState,
  // Note that mutable reducers *ONLY* work inside slice.
  reducers: {
    // ---------- Game configurations ---------- //
    // Apply game settings at one go.
    configureGame: (chess, action: PayloadAction<ChessConfig>) => {
      const {
        duration,
        engineLevel,
        increment,
        mode,
        playerColor,
      } = action.payload;

      chess.duration = duration;
      chess.increment = increment;

      if (mode === 'simulate') {
        chess.players.w = createAIPlayer();
        chess.players.b = createAIPlayer();
        chess.playerColor = null;
      } else {
        // Non-null assumption is needed because the return type `lodash.sample()`
        // contains `undefined`, while this never happens in our case.
        const color =
          playerColor === 'random'
            ? sample<ChessPieceColor>(['b', 'w'])!
            : playerColor;
        chess.playerColor = color;
        chess.players = createPlayers({ playerColor: color });
        chess.isFlipped = color === 'b';
      }

      chess.engineLevel = engineLevel;
    },

    // ---------- Players ---------- //
    // setPlayers
    setPlayer: (chess, action: PayloadAction<{ player: ChessPlayer }>) => {
      if (chess.playerColor) {
        chess.players[chess.playerColor] = action.payload.player;
      }
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
      action: PayloadAction<{ fen: string; length?: number }>,
    ) => {
      const { fen, length } = action.payload;
      // Default undo length to 1
      const undoLength = length ?? 1;
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
      chess.pieces = createPieces(fen);
    },
    // clearMoves
    clearMoves: chess => {
      chess.moves = [];
      chess.turn = 'w';
    },

    // ---------- Pieces ---------- //
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

    // ---------- Game control ---------- //
    // setGameOver
    setGameOver: (chess, action: PayloadAction<ChessResult>) => {
      const { winner } = action.payload;
      chess.result = action.payload;
      if (winner) {
        chess.players[winner].score += SCORE_WIN;
      } else {
        chess.players.w.score += SCORE_DRAW;
        chess.players.b.score += SCORE_DRAW;
      }
    },
    // resetGame
    resetGame: chess => {
      // Reset pieces.
      chess.pieces = createPieces(INITIAL_FEN);
      // Reset moves.
      chess.moves = [];
      // Reset turn.
      chess.turn = 'w';
      // Reset game result.
      chess.result = null;
      // Swap player colors.
      [chess.players.w, chess.players.b] = [chess.players.b, chess.players.w];
      // const temp = chess.players.w;
      // chess.players.w = chess.players.b;
      // chess.players.b = temp;
      if (chess.playerColor) {
        chess.playerColor = invertPieceColor(chess.playerColor);
      }
      // Unfreeze gameplay.
      chess.isFrozen = false;
      // Flip board.
      chess.isFlipped = !chess.isFlipped;
    },
    // flipBoard
    flipBoard: chess => {
      chess.isFlipped = !chess.isFlipped;
    },
  },
});

export const { actions: chessActions, reducer: chessReducer } = chessSlice;
