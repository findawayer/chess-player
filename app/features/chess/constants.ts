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

// ---------- FEN ---------- //

/** FEN: Initial board. */
export const INITIAL_FEN = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`;
/** FEN: White is about to checkmate. */
export const WHITE_CHECKMATE_FEN = '4k3/2R5/4K3/8/8/8/8/8 w - - 0 1';
/** FEN: Black is about to checkmate. */
export const BLACK_CHECKMATE_FEN = '4K3/2r5/4k3/8/8/8/8/8 b - - 0 1';
/** FEN: White is about to Stalemate. */
export const WHITE_STALEMATE_FEN = '4k3/4P3/3K4/8/8/8/8/8 w - - 0 1';
/** FEN: Black is about to Stalemate. */
export const BLACK_STALEMATE_FEN = '4K3/4p3/3k4/8/8/8/8/8 b - - 0 1';
/** FEN: White is about to lose its last checkmate materials */
export const BLACK_NO_MATERIAL_FEN = '4K3/4p3/8/4k3/8/8/8/8 w - - 0 1';
/** FEN: Black is about to lose its last checkmate materials */
export const WHITE_NO_MATERIAL_FEN = '4k3/4P3/8/4K3/8/8/8/8 b - - 0 1';
/** FEN: White is about to make a draw by perpetual repetition. */
export const WHITE_REPETITION_FEN = '6k1/6p1/8/4Q3/8/8/qr6/3K4 w - - 0 1';
/** FEN: Black is about to make a draw by perpetual repetition. */
export const BLACK_REPETITION_FEN = '6K1/6P1/8/4q3/8/8/QR6/3k4 b - - 0 1';
/** FEN: White is about to promote a pawn. */
export const WHITE_PROMOTION_FEN = '5k2/7P/6K1/8/8/8/8/8 w - - 0 1';
/** FEN: Black is about to promote a pawn. */
export const BLACK_PROMOTION_FEN = '8/8/8/8/8/6k1/7p/5K2 b - - 0 1';
/** FEN: White is about to capture a black pawn en passant. */
export const WHITE_EN_PASSANT_FEN = '4k3/3p4/8/4P3/8/8/8/4K3 b - - 0 1';
/** FEN: Black is about to capture a white pawn en passant. */
export const BLACK_EN_PASSANT_FEN = '4k3/8/8/8/3p4/8/4P3/4K3 w - - 0 1';

// ---------- Scores ---------- //

/** Score gained by a win. */
export const SCORE_WIN = 1;
/** Score gained by a draw. */
export const SCORE_DRAW = 0.5;

// ---------- Settings ---------- //

// Time given to play per side. (in minutes)
export const DEFAULT_DURATION = 10;
// Time gained by playing a move. (in seconds)
export const DEFAULT_INCREMENT = 2;
// Game mode.
export const DEFAULT_MODE = 'play';
// Piece color for the player.
export const DEFAULT_PLAYER_COLOR = 'w';
// Strength of game AI.
export const DEFAULT_ENGINE_LEVEL = 0;

// ---------- User configurable settings ---------- //

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
