import { ChessPieceColor } from './pieces';

/**
 * Chess game result details.
 */
export const enum ChessGameOverType {
  Checkmate,
  Resignation,
  Timeout,
  Stalemate,
  NotEnoughMaterial,
  Repetition,
}

/**
 * Chess game over status.
 */
export interface ChessGameOver {
  type: ChessGameOverType;
  winner: ChessPieceColor | null;
}
