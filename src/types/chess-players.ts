import { ChessPieceColor } from './chess-pieces';
import { User } from './users';

/**
 * Chess player side.
 */
export interface ChessPlayer extends User {
  name: string;
  // Game score.
  score: number;
  // rating: number;
}

/**
 * Group of both chess player sides.
 */
export type ChessPlayers = Record<ChessPieceColor, ChessPlayer>;
