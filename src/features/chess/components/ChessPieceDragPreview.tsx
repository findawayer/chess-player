import clsx from 'clsx';
import React, { memo } from 'react';

import { pieceClass } from '../helpers';
import { ChessPieceColor, ChessPieceVariant } from '../typings';
import useStyles from './styles/ChessPiece';

interface ChessPieceDragPreviewProps {
  color: ChessPieceColor;
  variant: ChessPieceVariant;
  size: number;
}

const ChessPieceDragPreview: React.FC<ChessPieceDragPreviewProps> = ({
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

export default memo(ChessPieceDragPreview);
