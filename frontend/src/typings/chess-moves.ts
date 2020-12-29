import { ChessSquareName } from './chess-squares';
import { ChessPieceColor, ChessPieceVariant } from './chess-pieces';

/**
 * Chess move object. Can be considered as an alias of
 * type `ShortMove` in `chess.js` library.
 */
export interface ChessMove {
  from: ChessSquareName;
  to: ChessSquareName;
  promotion?: ChessPromotionVariant;
}

/**
 * Piece types that can be a promotion target.
 */
export type ChessPromotionVariant = Exclude<ChessPieceVariant, 'p'>;

/**
 * Chess promotion data.
 */
export interface ChessPromotion {
  color: ChessPieceColor;
  from: ChessSquareName;
  to: ChessSquareName;
  // The type of piece that the player wants to promote the pawn to.
  // Assigned when player confirms it through the promotion dialog.
  variant?: ChessPromotionVariant;
}

/**
 * Enhanced version of `ChessMove`. Contains additional references
 * that can be used to make a chess movelist.
 */
export interface ChessMoveLog extends Pick<ChessMove, 'from' | 'to'> {
  fullmove: number;
  halfmove: number;
  san: string;
}
