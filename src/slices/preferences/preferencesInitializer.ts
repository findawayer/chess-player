import { ChessBoardThemeVariant } from '@themes';
import { ColorMode } from '@types';

/* Blueprint of chess game related state. */
export interface PreferencesState {
  colorMode: ColorMode;
  highlightMoves: boolean;
  showLegalMoves: boolean;
  autoPromoteToQueen: boolean;
  boardColor: ChessBoardThemeVariant;
}

/* Create initial preferences state */
export const initializePreferences = (): PreferencesState => ({
  // User selected color mode.
  colorMode: ColorMode.Light,
  highlightMoves: true,
  showLegalMoves: true,
  autoPromoteToQueen: false,
  boardColor: 'arctic',
});
