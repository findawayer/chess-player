import clsx from 'clsx';
import React, { memo } from 'react';

import { squareClass } from '@helpers';
import { ChessSquareName } from '@types';
import useStyles from './styles';

interface ChessGuideProps {
  variant: 'active' | 'hover' | 'recent';
  square: ChessSquareName;
}

export const ChessGuide: React.FC<ChessGuideProps> = ({ variant, square }) => {
  /** CSS classes created via Material-UI. */
  const classes = useStyles({ variant });

  return <div className={clsx(classes.guide, squareClass(square))} />;
};

export const MemoizedChessGuide = memo(ChessGuide);
