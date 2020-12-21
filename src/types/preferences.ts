import { ChessBoardThemeVariant } from '@themes/chess-board/types';

/**
 * Possible types of color mode of app's theme.
 */
export const enum ColorMode {
  Dark,
  Light,
}

export interface GameSettings {
  autoPromoteToQueen: boolean;
  boardColor: ChessBoardThemeVariant;
  highlightMoves: boolean;
  showLegalMoves: boolean;
}
