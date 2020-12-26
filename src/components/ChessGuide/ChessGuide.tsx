import clsx from 'clsx';
import React, { memo } from 'react';

import { squareClass } from '~/helpers';
import { ChessBoardThemeVariant, ChessSquareName } from '~/types';
import useStyles from './styles';

interface ChessGuideProps {
  color: ChessBoardThemeVariant;
  variant: 'active' | 'hover' | 'recent';
  square: ChessSquareName;
}

const ChessGuide: React.FC<ChessGuideProps> = ({ color, variant, square }) => {
  /** CSS classes created via Material-UI. */
  const classes = useStyles({ color, variant });

  return <div className={clsx(classes.guide, squareClass(square))} />;
};

export default memo(ChessGuide);
