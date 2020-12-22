import { ChessPieceColor, User } from '@/types';

import { invertPieceColor } from './chess-pieces';

/**
 * Create a user object. This seperate function can be extended
 * to have ratings, avatar, and/or extra user information.
 */
const createUser = (name: string): User => ({ name });

/**
 * Create a human player and an AI player, and return them
 * grouped by chess piece colors.
 */
export const createHumanAndComputer = ({
  playerColor,
}: {
  playerColor: ChessPieceColor | null;
}): Record<ChessPieceColor, User> => {
  const user = createUser('Me');
  const computer = createUser('Stockfish');
  const userColor = playerColor || 'w';
  const opponentColor = invertPieceColor(userColor);
  return {
    [userColor]: user,
    [opponentColor]: computer,
  } as Record<ChessPieceColor, User>;
};

/**
 * Create two AI players and return them grouped by chess piece colors.
 */
export const createComputers = (): Record<ChessPieceColor, User> => ({
  w: createUser('Stockfish'),
  b: createUser('Stockfish'),
});
