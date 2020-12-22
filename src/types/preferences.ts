/**
 * App's color mode. String union is used instead of enums because
 * this value is going to be serialized and stored in user's `localStorage`.
 */
export type ColorMode = 'light' | 'dark';

export interface ChessBoardTheme {
  lightSquare: string;
  darkSquare: string;
  highlight: string;
  hover: string;
}

export type ChessBoardThemeVariant = 'arctic' | 'golden' | 'loyal';

/* Blueprint of chess game related state. */
export interface ChessSettings {
  boardColor: ChessBoardThemeVariant;
  highlightMoves: boolean;
  showLegalMoves: boolean;
  autoPromoteToQueen: boolean;
}
