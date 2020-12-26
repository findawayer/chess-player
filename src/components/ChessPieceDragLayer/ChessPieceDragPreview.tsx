import clsx from 'clsx';
import React, { memo } from 'react';

import { usePieceStyles } from '~/components/ChessPiece';
import { pieceClass } from '~/helpers';
import { ChessPieceColor, ChessPieceVariant } from '~/types';

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
  const classes = usePieceStyles();
  return (
    <div
      className={clsx(classes.piece, pieceClass({ color, variant }))}
      style={{ width: size }}
    />
  );
};

export default memo(ChessPieceDragPreview);
