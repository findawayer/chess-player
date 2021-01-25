import type {
  ChessPieceColor,
  ChessPlayer,
  ChessPlayers,
} from '~app/features/chess/types';
import { invertPieceColor } from './pieces';

/** Create a chess player object. */
export const createPlayer = ({
  name,
  isAI,
}: Omit<ChessPlayer, 'score'>): ChessPlayer => ({
  name,
  score: 0,
  isAI,
});

/** Create a chess player object. */
export const createAIPlayer = () =>
  createPlayer({ name: 'Computer', isAI: true });

/**
 * Create a human player and an AI player, and return them
 * grouped by chess piece colors.
 */
export const createPlayers = ({
  playerColor,
  playerName = 'Me',
}: {
  playerColor: ChessPieceColor | null;
  playerName?: string;
}): ChessPlayers => {
  if (!playerColor) {
    return {
      w: createAIPlayer(),
      b: createAIPlayer(),
    };
  }
  const opponentColor = invertPieceColor(playerColor);
  return {
    [playerColor]: createPlayer({ name: playerName }),
    [opponentColor]: createAIPlayer(),
  } as ChessPlayers;
};
