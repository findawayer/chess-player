import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import { memo } from 'react';

import type {
  ChessPieceColor,
  ChessPieceVariant,
} from '~app/features/chess/types';
import { pieceClass } from '~app/features/chess/utils';

import useStyles from './styles/Piece';

interface PieceDragPreviewProps {
  color: ChessPieceColor;
  variant: ChessPieceVariant;
  size: number;
}

const PieceDragPreview: FunctionComponent<PieceDragPreviewProps> = ({
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
