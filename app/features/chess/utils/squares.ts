import inRange from 'lodash/inRange';

import {
  FILE_NAMES,
  NUMBER_OF_FILES,
  NUMBER_OF_RANKS,
  RANK_NAMES,
} from '~app/features/chess/constants';
import {
  ChessSquare,
  ChessSquareName,
  ChessSquareXY,
} from '~app/features/chess/types';

/** Convert x, y coordinates of a chess square in SAN format. */
export function stringifySquare(square: ChessSquare): ChessSquareName {
  if (typeof square === 'object') {
    const rank = RANK_NAMES.charAt(square.y);
    const file = FILE_NAMES.charAt(square.x);
    return (file + rank) as ChessSquareName;
  }
  return square;
}

/** Convert a chess square in SAN format to x, y coordinates. */
export function objectifySquare(square: ChessSquare): ChessSquareXY {
  if (typeof square === 'string') {
    const x = FILE_NAMES.indexOf(square[0]);
    const y = RANK_NAMES.indexOf(square[1]);
    return { x, y };
  }
  return square;
}

/** Test if the square name or object passed is a valid board square. */
export function isValidSquare(square: ChessSquare): boolean {
  const { x, y } = objectifySquare(square);
  return inRange(x, 0, NUMBER_OF_FILES) && inRange(y, 0, NUMBER_OF_RANKS);
}

/** Test if the square passed belons to the queen-side half of the chess board. */
export function isQueenSideSquare(square: ChessSquare): boolean {
  const { x } = objectifySquare(square);
  return (x + 1) / NUMBER_OF_FILES <= 0.5;
}

/** Find the name of the reletive square by delta x/y from the square passed. */
export function shiftSquareName(
  square: ChessSquareName,
  deltaX = 0,
  deltaY = 0,
): ChessSquareName {
  const { x, y } = objectifySquare(square);
  return stringifySquare({ x: x + deltaX, y: y + deltaY });
}
