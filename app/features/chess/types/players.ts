import type { ChessPieceColor } from './pieces';

/** Single chess player. */
export interface ChessPlayer {
  /** Player name. */
  name: string;
  /** Game score accumulated during this game session. */
  score: number;
  /** Boolean indicating the player is an AI. */
  isAI?: boolean;
}

export type ChessPlayers = Record<ChessPieceColor, ChessPlayer>;
