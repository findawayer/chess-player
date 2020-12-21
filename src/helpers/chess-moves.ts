import { ChessInstance, Move } from 'chess.js';
import uniqBy from 'lodash/uniqBy';

import {
  ChessLegalMove,
  ChessMoveLog,
  ChessSquare,
  ChessSquareName,
} from '@types';
import { stringifySquare } from './chess-squares';

/** Find out whether a chess move is a castling. */
export function isCastling(move: Move): boolean {
  return /[kq]/.test(move.flags);
}

/** Find out whether a chess move is a promotion. */
export function isPromotion(move: Move): boolean {
  return move.flags.indexOf('p') !== -1;
}

/** Get list of possible squares and their move type from the square given. */
export function findLegalMoves(
  validator: ChessInstance,
  sourceSqaure: ChessSquare,
): ChessLegalMove[] {
  // Get the legal moves from the validator, and extract payload.
  const legalMoves = validator
    .moves({ square: stringifySquare(sourceSqaure), verbose: true })
    .map(({ to, flags }) => ({ square: to, flags }));
  // Filter duplicate promotion variants.
  return uniqBy(legalMoves, 'square');
}

/** Get the latest move's source and target squares from the move history. */
export function getRecentMovePath(
  moveHistory: ChessMoveLog[],
): ChessSquareName[] | null {
  if (!moveHistory.length) {
    return null;
  }
  const lastMove = moveHistory[moveHistory.length - 1];
  return [lastMove.from, lastMove.to];
}
