import clsx from 'clsx';
import React, { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';

import {
  ChessPieceColor,
  ChessPromotionVariant,
  ChessSquareName,
} from '~/typings';
import { getFullPieceVariant, objectifySquare, pieceClass } from '../helpers';
import { AbortPromotion, SelectPromotion } from '../hooks';
import useStyles from './styles/ChessPromotionDialog';

interface ChessPromotionDialogProps {
  square: ChessSquareName;
  color: ChessPieceColor;
  abortPromotion: AbortPromotion;
  selectPromotion: SelectPromotion;
}

// @todo: Find correct a11y sementics for the dialog backdrop
const ChessPromotionDialog: React.FC<ChessPromotionDialogProps> = ({
  color,
  square,
  abortPromotion,
  selectPromotion,
}) => {
  /** 2d coordinates of the destination square of promoting move. */
  const { x, y } = useMemo(() => objectifySquare(square), [square]);
  /** CSS classes created via Material-UI. */
  const classes = useStyles();
  /** Promotion dialog's display orientation. */
  const direction = y === 0 ? 'top' : 'bottom';
  /** All promotion variants. */
  const variants: ChessPromotionVariant[] = ['q', 'n', 'r', 'b'];

  return (
    <div className={classes.promotion}>
      <div
        className={classes.backdrop}
        role="presentation"
        onClick={() => abortPromotion()}
      />
      <div className={clsx(classes.pieceWrapper, direction, `file-${x}`)}>
        {variants.map(variant => (
          <button
            key={variant}
            type="button"
            className={clsx(classes.piece, pieceClass({ color, variant }))}
            onClick={() => selectPromotion(variant)}
          >
            <Typography variant="srOnly">
              {getFullPieceVariant(variant)}
            </Typography>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChessPromotionDialog;
