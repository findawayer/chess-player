import { ChessBoardColor } from '@prisma/client';
import {
  ChessGameOver,
  ChessMoveLog,
  ChessPieceColor,
  ChessPieces,
  ChessPlayers,
} from './types';

/**
 * Blueprint of chess game related states.
 */
export interface ChessState {
  duration: number;
  increment: number;
  turn: ChessPieceColor;
  pieces: ChessPieces;
  // snapshots: string[];
  moves: ChessMoveLog[];
  players: ChessPlayers;
  playerColor: ChessPieceColor | null;
  engineLevel: number;
  isFlipped: boolean;
  isFrozen: boolean;
  gameOver: ChessGameOver | false;
  // Game settings
  autoQueen: boolean;
  boardColor: ChessBoardColor;
  showLegal: boolean;
  showRecent: boolean;
}

/** Create default state related for `chess` slice. */
export const initializeChessState = (): ChessState => ({
  // Time given to play per side. (in milliseconds)
  duration: 10 * 60 * 1000, // 10 min.
  // Time gained by playing a move. (in milliseconds)
  increment: 2 * 1000, // 2 sec.
  // The time during which a player can move their pieces. Represented by the piece color.
  turn: 'w',
  // Chess pieces. All pieces stored in `byId` object, and their positions on board
  // can be found in `positions` object.
  pieces: {
    byId: {},
    positions: {},
  },
  // Group of encoded `pieces` state at a specific moment.
  // Recorded and updated on each move played,
  // and are used to restore pieces at some point in the past.
  // snapshots: [],
  // List of moves played for a single chess game.
  // Contains move string in SAN format, along with its move path `from` & `to`.
  moves: [],
  // Chess players playing white and black pieces respectively. The playing color can
  // switch on rematches, so do NOT consider the keys as player identifiers.
  players: {
    w: { name: '', score: 0 },
    b: { name: '', score: 0 },
  },
  // The piece color that the user is playing. `null` means both players are AI.
  playerColor: 'w',
  // The engine's strength.
  engineLevel: 0,
  // Whether the board direction is being flipped or not.
  isFlipped: false,
  // Whether the gameplay is currently allowed or not.
  isFrozen: false,
  // Game over status expressed either a object or `false`.
  gameOver: false,
  // Promote automatically to queen without opening confirmation dialog.
  autoQueen: false,
  // Chess board theme.
  boardColor: 'ARCTIC',
  // Highlight legal moves.
  showLegal: true,
  // Highlight recent move's original & destination squares.
  showRecent: true,
});
