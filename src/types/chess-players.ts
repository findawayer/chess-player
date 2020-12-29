import { ChessPieceColor } from './chess-pieces';
import { User } from './users';

/**
 * Chess player side.
 */
export interface ChessPlayer extends Pick<User, 'name'> {
  // Game score.
  score: number;
  // rating: number;
}

/**
 * Group of both chess player sides.
 */
export type ChessPlayers = Record<ChessPieceColor, ChessPlayer>;
