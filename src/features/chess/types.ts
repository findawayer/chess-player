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
