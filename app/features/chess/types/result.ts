import type { ChessPieceColor } from './pieces';

/** Chess game over status. */
export interface ChessResult {
  type: ChessResultType;
  winner?: ChessPieceColor;
}

/** Possible types of game result. */
export enum ChessResultType {
  Checkmate,
  Resignation,
  Timeout,
  Stalemate,
  NotEnoughMaterial,
  Repetition,
}
