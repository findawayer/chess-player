import Chess from 'chess.js';
import { createContext } from 'react';

/** Chess game validator using `chess.js` library. */
const chessValidator = new Chess();

/** Context to provide the chess validator deep into the React component tree. */
export const ChessValidatorContext = createContext(chessValidator);
