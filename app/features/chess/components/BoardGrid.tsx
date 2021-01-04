import { makeStyles, Theme } from '@material-ui/core/styles';
import { ChessBoardColor } from '@prisma/client';
import clsx from 'clsx';
import times from 'lodash/times';
import React, { memo } from 'react';

import {
  NUMBER_OF_FILES,
  NUMBER_OF_RANKS,
  NUMBER_OF_SQUARES,
  SQUARE_SIZE,
} from '~app/features/chess/constants';
import { chessBoardTheme } from '~app/features/chess/themes';

interface BoardGridProps {
  color: ChessBoardColor;
}

const useStyles = makeStyles<Theme, BoardGridProps>({
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
    '&.light': {
      backgroundColor: ({ color }) => chessBoardTheme[color].lightSquare,
    },
    '&.dark': {
      backgroundColor: ({ color }) => chessBoardTheme[color].darkSquare,
    },
  },
});

const BoardGrid: React.FC<BoardGridProps> = ({ color }) => {
  /** CSS classes created via Material-UI. */
  const classes = useStyles({ color });

  return (
    <div className={classes.grid}>
      {times(NUMBER_OF_SQUARES, index => {
        const x = index % NUMBER_OF_RANKS;
        const y = Math.floor(index / NUMBER_OF_FILES);
        const isDark = (x + y) % 2 === 1;
        return (
          <div
            key={`${x}${y}`}
            className={clsx(classes.square, isDark ? 'dark' : 'light')}
          />
        );
      })}
    </div>
  );
};

export default memo(BoardGrid);
