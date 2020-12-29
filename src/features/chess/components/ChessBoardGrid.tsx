import clsx from 'clsx';
import times from 'lodash/times';
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import {
  NUMBER_OF_FILES,
  NUMBER_OF_RANKS,
  NUMBER_OF_SQUARES,
  SQUARE_SIZE,
} from '~/settings/chess';
import { ChessBoardThemeVariant } from '~/types';
import { chessBoardTheme } from '~/vendors/material-ui/themes';

interface ChessBoardGridProps {
  color: ChessBoardThemeVariant;
  handleBlur(): void;
}

const useStyles = makeStyles<Theme, Pick<ChessBoardGridProps, 'color'>>({
  grid: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
  },
  square: {
    width: `${SQUARE_SIZE}%`,
    height: `${SQUARE_SIZE}%`,
    flex: '0 0 auto',
    // Square colors
    '&.light': {
      backgroundColor: ({ color }) => chessBoardTheme[color].lightSquare,
    },
    '&.dark': {
      backgroundColor: ({ color }) => chessBoardTheme[color].darkSquare,
    },
  },
});

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

const ChessBoardGrid: React.FC<ChessBoardGridProps> = ({
  color,
  handleBlur,
}) => {
  /** CSS classes created via Material-UI. */
  const classes = useStyles({ color });

  return (
    <div className={classes.grid} onClick={handleBlur}>
      {renderSquares(classes.square)}
    </div>
  );
};

export default ChessBoardGrid;
