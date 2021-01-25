import type {
  ChessPieceColor,
  ChessPieces,
  ChessPieceVariant,
} from '~app/features/chess/types';
import { stringifySquare } from './squares';

/** Create pieces from board data in FEN format. */
export const createPieces = (fen: string): ChessPieces => {
  // Dictionary of piece data.
  const byId = {} as ChessPieces['byId'];
  // Relational data of pieces and their positions.
  const positions = {} as ChessPieces['positions'];
  // Indice representing x, y coordinates of piece positions.
  let x = 0;
  let y = 0;
  // Create instant map to count number of pieces per color & variant.
  const counter: Record<string, number> = {};

  const RANK_SEPERATOR = '/';
  const EMPTY_PATTERN = /[1-8]/;
  const BLACK_PIECE_PATTERN = /[bknpqr]/;

  fen
    .replace(/\s.*$/, '') // cut off additional info
    .split('') // tokenize
    .forEach(token => {
      // Go to next rank on '/' encountered.
      if (token === RANK_SEPERATOR) {
        x = 0;
        y += 1;
        return;
      }
      // Increment file as much as empty squares.
      if (EMPTY_PATTERN.test(token)) {
        x += Number(token);
        return;
      }
      // Parse token and extract the color & the variant.
      const color = BLACK_PIECE_PATTERN.test(token) ? 'b' : 'w';
      const variant = token.toLowerCase() as ChessPieceVariant;
      // Increment piece count.
      const count = token in counter ? counter[token] + 1 : 0;
      counter[token] = count;
      // Create piece ID joining color, variant and count.
      const id = `${color}${variant}${count}`;
      // Stringify square coordinates.
      const square = stringifySquare({ x, y });
      // Assign piece & position data respectively.
      byId[id] = { id, color, variant };
      positions[square] = id;
      // Increment file.
      x += 1;
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
