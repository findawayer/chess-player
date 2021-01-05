import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

import { SQUARE_SIZE } from '~app/features/chess/constants';
import { ChessLegalMove, ChessSquare } from '~app/features/chess/types';
import { squareClass } from '~app/features/chess/utils';

const useStyles = makeStyles<Theme, { isCapture: boolean }>({
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
  },
});

interface LegalSquareProps extends ChessLegalMove {
  isVisible: boolean;
  handleSelect(square: ChessSquare): void;
}

// @todo: a11y key input handler
const LegalSquare: React.FC<LegalSquareProps> = ({
  flags,
  square,
  isVisible,
  handleSelect,
}) => {
  /** The move is a piece capture. */
  const isCapture = flags.indexOf('c') !== -1;
  /** CSS classes created via Material-UI. */
  const classes = useStyles({ isCapture });

  return (
    <div
      className={clsx(classes.legalSquare, squareClass(square))}
      style={isVisible ? undefined : { opacity: 0 }}
      onClick={() => handleSelect(square)}
    />
  );
};

export default LegalSquare;
