import type { ChessMove } from './moves';

/** Chess engine's status. */
export enum ChessEngineStatus {
  Loading,
  Loaded,
  Ready,
}

/** Chess engine that generates moves. */
export interface ChessEngine {
  /** The engine's current status represented by an enum. */
  status: ChessEngineStatus;
  /** The engine's strength. */
  level: number;
  /** The engines' thinking allowance for move searches. */
  depth: null;
  /** The chess move that the engine has found. */
  move: ChessMove | null;
}

/** Chess evaluator. */
export interface ChessEvaler {
  status: ChessEngineStatus;
}
