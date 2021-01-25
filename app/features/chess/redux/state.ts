import type { ChessBoardColor } from '@prisma/client';

import {
  DEFAULT_DURATION,
  DEFAULT_ENGINE_LEVEL,
  DEFAULT_INCREMENT,
  DEFAULT_PLAYER_COLOR,
  INITIAL_FEN,
} from '~app/features/chess/constants';
import type {
  ChessMoveLog,
  ChessPieceColor,
  ChessPieces,
  ChessPlayers,
  ChessResult,
} from '~app/features/chess/types';
import { createPieces, createPlayers } from '~app/features/chess/utils';

export interface ChessState {
  duration: number;
  increment: number;
  turn: ChessPieceColor;
  pieces: ChessPieces;
  players: ChessPlayers;
  playerColor: ChessPieceColor | null;
  moves: ChessMoveLog[];
  engineLevel: number;
  result: ChessResult | null;
  isFlipped: boolean;
  isFrozen: boolean;
  autoQueen: boolean;
  boardColor: ChessBoardColor;
  showLegal: boolean;
  showRecent: boolean;
}

/** Create default state related for `chess` slice. */
export const initialChessState: ChessState = {
  // Time given to play per side. (in milliseconds)
  duration: DEFAULT_DURATION * 1000 * 60, // minutes to miliseconds
  // Time gained by playing a move. (in milliseconds)
  increment: DEFAULT_INCREMENT * 1000, // seconds to miliseconds
  // The time during which a player can move their pieces. Represented by the piece color.
  turn: 'w',
  // Chess pieces. All pieces stored in `byId` object, and their positions on board
  // can be found in `positions` object.
  pieces: createPieces(INITIAL_FEN),
  // Chess players playing white and black pieces respectively. The playing color can
  // switch on rematches, so do NOT consider the keys as player identifiers.
  players: createPlayers({ playerColor: DEFAULT_PLAYER_COLOR }),
  // The piece color that the user is playing. `null` means both players are AI.
  playerColor: DEFAULT_PLAYER_COLOR,
  // List of moves played for a single chess game.
  // Contains move string in SAN format, along with its move path `from` & `to`.
  moves: [],
  // The engine's strength.
  engineLevel: DEFAULT_ENGINE_LEVEL,
  // Object containing the type & the winner of a game result.
  result: null,
  // Whether the board direction is being flipped or not.
  isFlipped: false,
  // Whether the gameplay is currently allowed or not. Game is frozen
  // - Once the game is over until next game begins.
  // - Once the game
  isFrozen: false,
  // Promote automatically to queen without opening confirmation dialog.
  autoQueen: false,
  // Chess board theme.
  boardColor: 'ARCTIC',
  // Highlight legal moves.
  showLegal: true,
  // Highlight recent move's original & destination squares.
  showRecent: true,
};
