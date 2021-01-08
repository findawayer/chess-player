import type { ChessPieceColor } from './pieces';

/**
 * Chess player side.
 */
export interface ChessPlayer {
  name: string;
  // Game score.
  score: number;
  // rating: number;
}

/**
 * Group of both chess player sides.
 */
export type ChessPlayers = Record<ChessPieceColor, ChessPlayer>;
