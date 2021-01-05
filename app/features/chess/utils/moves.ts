import { ChessInstance, Move } from 'chess.js';
import uniqBy from 'lodash/uniqBy';

import { NUMBER_OF_RANKS } from '~app/features/chess/constants';
import {
  ChessLegalMove,
  ChessMoveLog,
  ChessPiece,
  ChessSquare,
  ChessSquareName,
} from '~app/features/chess/types';
import { objectifySquare, stringifySquare } from './squares';

/** Find out whether the chess move passed is a castling. */
export function isCastling(move: Move): boolean {
  return /[kq]/.test(move.flags);
}

/** Find out whether the chess move passed is a promotion. */
export function isPromotion(move: Move): boolean {
  return move.flags.indexOf('p') !== -1;
}

/** Find out whether the chess move passed is an `en passant` capture. */
export function isEnPassant(move: Move): boolean {
  return move.flags.indexOf('e') !== -1;
}

export function getCapturedPiecePosition(move: Move): ChessSquareName | null {
  const match = move.san.match(/x([a-h][0-8])$/);
  return match ? (match[1] as ChessSquareName) : null;
}

export function isPromotingPawn(
  piece: ChessPiece,
  targetSquare: ChessSquare,
): boolean {
  const isPawn = piece.variant === 'p';
  const isWhitePiece = piece.color === 'w';
  const { y } = objectifySquare(targetSquare);
  const isAtTheLastRank = isWhitePiece ? y === NUMBER_OF_RANKS - 1 : y === 0;
  return isPawn && isAtTheLastRank;
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
): ChessSquareName[] {
  if (!moveHistory.length) {
    return [];
  }
  const lastMove = moveHistory[moveHistory.length - 1];
  return [lastMove.from, lastMove.to];
}
