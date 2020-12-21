export interface ChessBoardTheme {
  lightSquare: string;
  darkSquare: string;
  highlight: string;
  hover: string;
}

export type ChessBoardThemeVariant = 'arctic' | 'golden' | 'loyal';

// Configuration via `createMuiTheme`
export type ChessBoardThemeOptions = Partial<ChessBoardTheme>;
