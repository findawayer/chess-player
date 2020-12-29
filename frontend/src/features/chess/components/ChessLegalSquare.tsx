import clsx from 'clsx';
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { SQUARE_SIZE } from '~/config/chess';
import { ChessLegalMove, ChessSquare } from '~/typings';
import { squareClass } from '../helpers';

interface ChessLegalSquareProps extends ChessLegalMove {
  showLegalMoves: boolean;
  handleSelect(square: ChessSquare): void;
}

interface ChessLegalSquareStylesProps {
  isCapture: boolean;
  showLegalMoves: boolean;
}

const useStyles = makeStyles<Theme, ChessLegalSquareStylesProps>({
  legalSquare: {
    position: 'absolute',
    width: `${SQUARE_SIZE}%`,
    height: `${SQUARE_SIZE}%`,
    padding: '4%',
    boxSizing: 'border-box',
    backgroundColor: ({ isCapture }) =>
      isCapture ? 'transparent' : 'rgba(0 0 0 / 20%)',
    border: ({ isCapture }) => (isCapture ? '8px solid rgba(0 0 0 / 20%)' : 0),
    backgroundClip: 'content-box',
    borderRadius: '50%',
    opacity: ({ showLegalMoves }) => (showLegalMoves ? 1 : 0),
  },
});

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
