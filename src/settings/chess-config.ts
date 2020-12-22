// ----- Board square compositions ----- //

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

// ----- Game scores ----- //

/** Score gained by a win. */
export const SCORE_WIN = 1;
/** Score gained by a draw. */
export const SCORE_DRAW = 0.5;

// ----- Specific board setups as FEN. (Used for debug purposes) ----- //

/** FEN: White is about to checkmate */
export const FEN_WHITE_CHECKMATE = '4k3/2R5/4K3/8/8/8/8/8 w - - 0 1';
/** FEN: Black is about to checkmate */
export const FEN_BLACK_CHECKMATE = '4K3/2r5/4k3/8/8/8/8/8 b - - 0 1';
/** FEN: White is about to Stalemate */
export const FEN_WHITE_STALEMATE = '4k3/4P3/3K4/8/8/8/8/8 w - - 0 1';
/** FEN: Black is about to Stalemate */
export const FEN_BLACK_STALEMATE = '4K3/4p3/3k4/8/8/8/8/8 b - - 0 1';
/** FEN: White is about to lose its last checkmate materials */
export const FEN_BLACK_NO_MATERIAL = '4K3/4p3/8/4k3/8/8/8/8 w - - 0 1';
/** FEN: Black is about to lose its last checkmate materials */
export const FEN_WHITE_NO_MATERIAL = '4k3/4P3/8/4K3/8/8/8/8 b - - 0 1';
/** FEN: White is about to make a draw by perpetual repetition. */
export const FEN_WHITE_REPETITION = '6k1/6p1/8/4Q3/8/8/qr6/3K4 w - - 0 1';
/** FEN: Black is about to make a draw by perpetual repetition. */
export const FEN_BLACK_REPETITION = '6K1/6P1/8/4q3/8/8/QR6/3k4 b - - 0 1';
/** FEN: White is about to promote a pawn */
export const FEN_WHITE_PROMOTION = '5k2/7P/6K1/8/8/8/8/8 w - - 0 1';
/** FEN: Black is about to promote a pawn */
export const FEN_BLACK_PROMOTION = '8/8/8/8/8/6k1/7p/5K2 b - - 0 1';

// ----- Assets ----- //

/** Stockfish.js file location */
export const STOCKFISH_FILE_PATH = 'stockfish/stockfish.js';
