// ---------- Board ---------- //

/** Chess square's x-axis names. */
export const RANK_NAMES = '87654321';
/** Chess square's y-axis names. */
export const FILE_NAMES = 'abcdefgh';
/** Number of squares in x-axis on a chess board. */
export const NUMBER_OF_RANKS = RANK_NAMES.length;
/** Number of squares in y-axis on a chess board. */
export const NUMBER_OF_FILES = FILE_NAMES.length;
/** Total number of squares on a chess board. */
export const NUMBER_OF_SQUARES = NUMBER_OF_RANKS * NUMBER_OF_FILES;
/** Chess square size in percent. (without unit) */
export const SQUARE_SIZE = 100 / RANK_NAMES.length;

// ---------- Scores ---------- //

/** Score gained by a win. */
export const SCORE_WIN = 1;
/** Score gained by a draw. */
export const SCORE_DRAW = 0.5;

// ---------- User settings ---------- //

// Promote automatically to queen without opening confirmation dialog.
export const DEFAULT_AUTO_QUEEN = false;
// Chess board theme.
export const DEFAULT_BOARD_COLOR = 'ARCTIC';
// Highlight legal moves.
export const DEFAULT_SHOW_LEGAL = true;
// Highlight recent move's original & destination squares.
export const DEFAULT_SHOW_RECENT = true;

// ---------- Misc. ---------- //

/** Stockfish.js file location */
export const STOCKFISH_FILE_PATH = 'stockfish/stockfish.js';
