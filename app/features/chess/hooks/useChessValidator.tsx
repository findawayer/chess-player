import ChessJS from 'chess.js';
import { createContext, useContext } from 'react';

import { INITIAL_FEN } from '~app/features/chess/constants';

/**
 * Chess game validator using `chess.js` library. The `Chess` constructor is conditionally exported:
 * - CommonJS environment(like Node in SSR mode): default export.
 * - AMD environment(like browser): named export `Chess`.
 *
 * However, in a project which supports both types of export, such as webpack-bundled projects,
 * this causes either compile-time or runtime error. (https://github.com/jhlywa/chess.js/issues/196)
 * Here comes the ugly :( workaround below to avoid the issue.
 */
const chessValidator = new (typeof ChessJS === 'function'
  ? ChessJS
  : ChessJS.Chess)(INITIAL_FEN);

/** Context to provide the chess validator deep into the React component tree. */
const ChessValidatorContext = createContext(chessValidator);

export const useChessValidator = () => {
  const chessValidator = useContext(ChessValidatorContext);
  return chessValidator;
};
