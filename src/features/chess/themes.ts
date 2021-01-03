import type { ChessBoardColor } from '@prisma/client';

export type ChessBoardTheme = {
  lightSquare: string;
  darkSquare: string;
  highlight: string;
  hover: string;
};

export const chessBoardTheme: Record<ChessBoardColor, ChessBoardTheme> = {
  ARCTIC: {
    lightSquare: '#fff',
    darkSquare: '#97b2ce',
    highlight: '#ffff32',
    hover: '#fff',
  },
  LOYAL: {
    lightSquare: '#dcd0c2',
    darkSquare: '#376c57',
    highlight: '#ffff32',
    hover: '#fff',
  },
  GOLDEN: {
    lightSquare: '#f5e1a2',
    darkSquare: '#6b6c6e',
    highlight: '#ffff32',
    hover: '#fff',
  },
};
