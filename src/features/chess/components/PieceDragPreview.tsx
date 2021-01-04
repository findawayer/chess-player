import clsx from 'clsx';
import React, { memo } from 'react';

import { ChessPieceColor, ChessPieceVariant } from '~/features/chess/types';
import { pieceClass } from '~/features/chess/utils';
import useStyles from './styles/Piece';

interface PieceDragPreviewProps {
  color: ChessPieceColor;
  variant: ChessPieceVariant;
  size: number;
}

const PieceDragPreview: React.FC<PieceDragPreviewProps> = ({
  color,
  variant,
  size,
}) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.piece, pieceClass({ color, variant }))}
      style={{ width: size }}
    />
  );
};

export default memo(PieceDragPreview);
