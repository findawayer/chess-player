/**
 * Chess piece colors.
 * - 'b' for Black
 * - 'w' for White
 */
export type ChessPieceColor = 'b' | 'w';

/**
 * Chess piece types.
 * - 'p' for Pawn
 * - 'n' for Knight
 * - 'b' for Bishop
 * - 'r' for Rook
 * - 'q' for Queen
 * - 'k' for King
 */
export type ChessPieceVariant = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

/**
 * Chess piece object.
 */
export interface ChessPiece {
  // {color}{variant}{index} -> e.g. wp0 (white pawn no.1)
  id: string;
  color: ChessPieceColor;
  variant: ChessPieceVariant; // Key `variant` is used to avoid collision with `type` in `react-dnd` object.
}

export type ChessPiecesById = Record<string, ChessPiece>;

export type ChessPiecePositions = Record<string, string>;

/**
 * Collection of pieces.
 */
export interface ChessPieces {
  /* List of pieces by id. */
  byId: ChessPiecesById;
  /* Lookup by current piece position. (square, id pair) */
  positions: ChessPiecePositions;
}
