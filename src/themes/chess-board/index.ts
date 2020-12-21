import { arcticTheme } from './arctic-theme';
import { goldenTheme } from './golden-theme';
import { loyalTheme } from './loyal-theme';
import { ChessBoardThemeVariant, ChessBoardTheme } from './types';

export const defaultChessBoardTheme = arcticTheme;

export const getChessBoardTheme = (
  variant: ChessBoardThemeVariant,
): ChessBoardTheme => {
  switch (variant) {
    case 'arctic':
      return arcticTheme;

    case 'golden':
      return goldenTheme;

    case 'loyal':
      return loyalTheme;

    default:
      throw new Error(`Unexpected chess board theme variant: ${variant}.`);
  }
};

export * from './types';
