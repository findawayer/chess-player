import { ChessBoardTheme, ChessBoardThemeVariant } from '@/types';

export const chessBoardTheme: Record<
  ChessBoardThemeVariant,
  ChessBoardTheme
> = {
  arctic: {
    lightSquare: '#fff',
    darkSquare: '#97b2ce',
    highlight: '#ffff32',
    hover: '#fff',
  },
  loyal: {
    lightSquare: '#dcd0c2',
    darkSquare: '#376c57',
    highlight: '#ffff32',
    hover: '#fff',
  },
  golden: {
    lightSquare: '#f5e1a2',
    darkSquare: '#6b6c6e',
    highlight: '#ffff32',
    hover: '#fff',
  },
};
