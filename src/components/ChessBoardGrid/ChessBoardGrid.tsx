import clsx from 'clsx';
import times from 'lodash/times';
import React from 'react';

import {
  NUMBER_OF_FILES,
  NUMBER_OF_RANKS,
  NUMBER_OF_SQUARES,
} from '@/settings/chess-config';
import { ChessBoardThemeVariant } from '@/types';
import useStyles from './styles';

interface GridProps {
  color: ChessBoardThemeVariant;
  handleBlur(): void;
}

/** Chess board square renderer. */
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

const ChessBoardGrid: React.FC<GridProps> = ({ color, handleBlur }) => {
  /** CSS classes created via Material-UI. */
  const classes = useStyles({ color });

  return (
    <div className={classes.grid} onClick={handleBlur}>
      {renderSquares(classes.square)}
    </div>
  );
};

export default ChessBoardGrid;
