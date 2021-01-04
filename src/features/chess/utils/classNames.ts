import { ChessPiece, ChessSquare } from '~/features/chess/types';
import { stringifySquare } from './squares';

/** Format a CSS class for chess piece. */
export function pieceClass({
  color,
  variant,
}: Pick<ChessPiece, 'color' | 'variant'>): string {
  return `piece-${color}${variant}`;
}

/** Format a CSS class for chess board squares. */
export function squareClass(square: ChessSquare): string {
  return `square-${stringifySquare(square)}`;
}
