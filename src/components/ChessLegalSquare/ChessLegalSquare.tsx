import clsx from 'clsx';
import React from 'react';

import { squareClass } from '@/helpers';
import { ChessLegalMove, ChessSquare } from '@/types';
import useStyles from './styles';

interface ChessLegalSquareProps extends ChessLegalMove {
  showLegalMoves: boolean;
  handleSelect(square: ChessSquare): void;
}

// @todo: a11y key input handler
const ChessLegalSquare: React.FC<ChessLegalSquareProps> = ({
  flags,
  square,
  showLegalMoves,
  handleSelect,
}) => {
  /** The move is a piece capture. */
  const isCapture = flags.indexOf('c') !== -1;
  /** CSS classes created via Material-UI. */
  const classes = useStyles({ isCapture, showLegalMoves });

  return (
    <div
      className={clsx(classes.legalSquare, squareClass(square))}
      onClick={() => handleSelect(square)}
    />
  );
};

export default ChessLegalSquare;
