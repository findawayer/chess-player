import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { DRAG_ITEM } from '~app/features/chess/react-dnd';
import type {
  ChessPieceColor,
  ChessPieceVariant,
  ChessSquare,
} from '~app/features/chess/types';
import { pieceClass, squareClass } from '~app/features/chess/utils';

import useStyles from './styles/Piece';

interface PieceProps {
  id: string;
  color: ChessPieceColor;
  variant: ChessPieceVariant;
  x: number;
  y: number;
  size: number;
  isFrozen: boolean;
  handleSelect(square: ChessSquare): void;
}

const Piece: FunctionComponent<PieceProps> = ({
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
      type: DRAG_ITEM,
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

export default Piece;
