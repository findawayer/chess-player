import clsx from 'clsx';
import React, { memo } from 'react';
import { fade, makeStyles, Theme } from '@material-ui/core/styles';

import { SQUARE_SIZE } from '~/config/chess';
import { ChessBoardThemeVariant } from '~/typings/preferences';
import { ChessSquareName } from '../typings';
import { chessBoardTheme } from '~/vendors/material-ui/themes';
import { squareClass } from '../helpers';

interface ChessGuideProps {
  color: ChessBoardThemeVariant;
  variant: 'active' | 'hover' | 'recent';
  square: ChessSquareName;
}

const useStyles = makeStyles<Theme, ChessGuideProps>({
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

const ChessGuide: React.FC<ChessGuideProps> = props => {
  const { square } = props;
  /** CSS classes created via Material-UI. */
  const classes = useStyles(props);

  return <div className={clsx(classes.guide, squareClass(square))} />;
};

export default memo(ChessGuide);
