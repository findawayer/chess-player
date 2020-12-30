import { Move, ShortMove } from 'chess.js';

/** Chess engine's status. */
export enum ChessEngineStatus {
  Loading,
  Loaded,
  Ready,
  Running,
}

/**
 * Latest chess move found by the chess engine.
 * `null` means the engine has not been running.
 */
export type ChessEngineMove = ShortMove | null;

/** Configurable options for `useStockfish` hook. */
export interface UseStockfishOptions {
  duration: number;
  increment: number;
  skillLevel?: number;
  filepath?: string;
}

/** Set `onmessage` handler for the Stockfish worker instance. */
export type SetMessageHandler = (
  handler: (event: MessageEvent) => void,
) => void;

/** Send a UCI command to Stockfish. */
export type CommandEngine = (command: string) => void;

/** Find the best move that the current Stockfish engine can come up. */
export type FindMove = (query: {
  /** Array of all chess moves played. */
  history: Move[];
  /** Make the engine find the move instantly. */
  accelerate?: boolean;
}) => void;
