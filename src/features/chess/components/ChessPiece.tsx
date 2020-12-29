import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { DragItem } from '~/vendors/react-dnd';
import { ChessPieceColor, ChessPieceVariant, ChessSquare } from '~/types';
import { pieceClass, squareClass } from '../helpers';

import useStyles from './styles/ChessPiece';

interface ChessPieceProps {
  id: string;
  color: ChessPieceColor;
  variant: ChessPieceVariant;
  x: number;
  y: number;
  size: number;
  isFrozen: boolean;
  handleSelect(square: ChessSquare): void;
}

const ChessPiece: React.FC<ChessPieceProps> = ({
  id,
  color,
  variant,
  x,
  y,
  size,
  isFrozen,
  handleSelect,
}) => {
  // `react-dnd` bindings for draggability.
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: DragItem.PIECE,
      id,
      color,
      variant,
      x,
      y,
      size,
    },
    canDrag: !isFrozen,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  /** CSS classes created via Material-UI. */
  const classes = useStyles();

  // Replace drag preview image with an empty image.
  // The actual preview implementation is at: @components/ChessPieceDragLayer
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={drag}
      className={clsx(
        classes.piece,
        classes.playablePiece,
        pieceClass({ color, variant }),
        squareClass({ x, y }),
        isDragging && 'is-dragging',
      )}
      aria-label={variant}
      onMouseDown={() => handleSelect({ x, y })}
      onTouchStart={() => handleSelect({ x, y })}
    />
  );
};

export default ChessPiece;
