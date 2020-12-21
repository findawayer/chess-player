import clsx from 'clsx';
import times from 'lodash/times';
import React, { memo, useContext } from 'react';

import { ChessBoardThemeContext } from '@contexts';
import {
  NUMBER_OF_FILES,
  NUMBER_OF_RANKS,
  NUMBER_OF_SQUARES,
} from '@settings/chess-config';
import useStyles from './styles';

export interface GridProps {
  handleBlur(): void;
}

/**
 * Square renderer (memoized).
 */
function renderSquares(squareClassName: string) {
  return times(NUMBER_OF_SQUARES, index => {
    const x = index % NUMBER_OF_RANKS;
    const y = Math.floor(index / NUMBER_OF_FILES);
    const isDark = (x + y) % 2 === 1;
    return (
      <div
        key={`${x}${y}`}
        className={clsx(squareClassName, isDark ? 'dark' : 'light')}
      />
    );
  });
}

export const Grid: React.FC<GridProps> = ({ handleBlur }) => {
  /** User-selected chess board theme. (Provided from: @containers/ChessGame) */
  const userChessBoardTheme = useContext(ChessBoardThemeContext);
  /** CSS classes created via Material-UI. */
  const classes = useStyles(userChessBoardTheme);

  return (
    <div className={classes.grid} onClick={handleBlur}>
      {renderSquares(classes.square)}
    </div>
  );
};

export const MemoizedGrid = memo(Grid);
