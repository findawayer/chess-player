import { fade, makeStyles, Theme } from '@material-ui/core/styles';
import { ChessBoardColor } from '@prisma/client';
import clsx from 'clsx';
import React, { memo } from 'react';

import { SQUARE_SIZE } from '~app/features/chess/constants';
import { chessBoardTheme } from '~app/features/chess/themes';
import { ChessSquareName } from '~app/features/chess/types';
import { squareClass } from '~app/features/chess/utils';

interface GuideProps {
  color: ChessBoardColor;
  variant: 'active' | 'hover' | 'recent';
  square: ChessSquareName | null;
}

const useStyles = makeStyles<Theme, Omit<GuideProps, 'square'>>({
  guide: {
    position: 'absolute',
    width: `${SQUARE_SIZE}%`,
    height: `${SQUARE_SIZE}%`,
    backgroundColor: ({ color, variant }) =>
      /(?:active|recent)/.test(variant)
        ? fade(chessBoardTheme[color].highlight, 0.5)
        : 'transparent',
    boxShadow: ({ color, variant }) =>
      variant === 'hover'
        ? `inset 0 0 0 4px ${fade(chessBoardTheme[color].highlight, 0.5)}`
        : 'none',
  },
});

const Guide: React.FC<GuideProps> = ({ color, variant, square }) => {
  const classes = useStyles({ color, variant });

  return !square ? null : (
    <div className={clsx(classes.guide, squareClass(square))} />
  );
};

export default memo(Guide);
