// Various pattern of the engine's message

// The engine is loaded.
export const ENGINE_IS_LOADED = /^uciok$/;

// The engine is ready to go.
export const ENGINE_IS_READY = /^readyok$/;

// The engine has configured an option.
export const OPTION_IS_SET = /^option name/;

// Merged version of the 3 patterns above.
export const IS_SYSTEM_MESSAGE = /^(?:(?:uci|ready)ok$|option name)/;

// The engine has found the best move.
export const FOUND_BEST_MOVE = /^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/;

// The engine is sending feedback.
export const INFORMS_DEPTH = /^info .*\bdepth (\d+) .*\bnps (\d+)/;

// The engine is sending feedback with a score, centipawns and maybe a mate.
export const INFORMS_SCORE = /^info .*\bscore (\w+) (-?\d+)/;

// The engine is sending feedback with the score bounded.
export const INFORMS_BOUND_SCORE = /\b(upper|lower)bound\b/;
