import { ChessPieceColor, ChessPlayer } from '~app/features/chess/types';
import { invertPieceColor } from './pieces';

/**
 * Create a user object. This seperate function can be extended
 * to have ratings, avatar, and/or extra user information.
 */
const createUser = (name: string): ChessPlayer => ({ name, score: 0 });

/**
 * Create a human player and an AI player, and return them
 * grouped by chess piece colors.
 */
export const createHumanAndComputer = ({
  playerColor,
}: {
  playerColor: ChessPieceColor | null;
}): Record<ChessPieceColor, ChessPlayer> => {
  const user = createUser('Me');
  const computer = createUser('Stockfish');
  const userColor = playerColor || 'w';
  const opponentColor = invertPieceColor(userColor);
  return {
    [userColor]: user,
    [opponentColor]: computer,
  } as Record<ChessPieceColor, ChessPlayer>;
};

/**
 * Create two AI players and return them grouped by chess piece colors.
 */
export const createComputers = (): Record<ChessPieceColor, ChessPlayer> => ({
  w: createUser('Stockfish'),
  b: createUser('Stockfish'),
});
