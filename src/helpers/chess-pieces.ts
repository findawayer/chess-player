import {
  ChessBoardData,
  ChessPieceColor,
  ChessPieces,
  ChessPieceVariant,
} from '~/types';
import { stringifySquare } from './chess-squares';

/** Create pieces from board data fetched from `chess.js` instance. */
export const createPieces = (board: ChessBoardData): ChessPieces => {
  // Dictionary of piece data.
  const byId = {} as ChessPieces['byId'];
  // Relational data of pieces and their positions.
  const positions = {} as ChessPieces['positions'];
  // Create instant map to count number of pieces per color & variant.
  const counter = new Map<string, number>();
  // Iterate over the board data received from `chess.js` instance.
  board.forEach((ranks, y) => {
    ranks.forEach((piece, x) => {
      // Skip empty square.
      if (!piece) return;
      // The keyword `type` is aliased as `variant` due to conflict with
      // `react-dnd` library's drag item API.
      const { color, type: variant } = piece;
      // Name of the piece.
      const key = `${color}${variant}`;
      // Increment count per piece name.
      const count = counter.has(key) ? counter.get(key)! + 1 : 0;
      counter.set(key, count);
      // Create piece ID with {color}{variant}{count} data.
      const id = `${key}${count}`;
      // Stringify square coordinates.
      const square = stringifySquare({ x, y });
      // Assign piece & position data respectively.
      byId[id] = { id, color, variant };
      positions[square] = id;
    });
  });
  return { byId, positions };
};

/** Convert a piece variant symbol to the actual piece variant name. */
export function getFullPieceVariant(variant: ChessPieceVariant): string {
  switch (variant) {
    case 'k':
      return 'king';

    case 'q':
      return 'queen';

    case 'r':
      return 'rook';

    case 'n':
      return 'knight';

    case 'b':
      return 'bishop';

    case 'p':
      return 'pawn';

    default:
      throw new Error(`Unhandled piece variant: ${variant}.`);
  }
}

/** Convert a piece color symbol to the actual piece color name. */
export function getFullPieceColor(color: ChessPieceColor): string {
  switch (color) {
    case 'w':
      return 'white';

    case 'b':
      return 'black';

    default:
      throw new Error(`Unhandled piece color: ${color}.`);
  }
}

/** Get the opposite piece color. */
export function invertPieceColor(color: ChessPieceColor): ChessPieceColor {
  return color === 'b' ? 'w' : 'b';
}
