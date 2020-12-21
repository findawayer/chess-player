import { ChessSquareName } from './chess-squares';

/**
 * Possible squares that the a piece can move to.
 */
export interface ChessLegalMove {
  square: ChessSquareName;
  flags: string;
}

/**
 * Chess square highlighters for better UX.
 */
export interface ChessGuides {
  active: ChessSquareName | null;
  hover: ChessSquareName | null;
  legal: ChessLegalMove[];
}
