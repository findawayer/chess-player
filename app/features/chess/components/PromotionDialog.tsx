import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import { useMemo } from 'react';

import { SQUARE_SIZE } from '~app/features/chess/constants';
import type {
  ChessPieceColor,
  ChessPromotionVariant,
  ChessSquareName,
} from '~app/features/chess/types';
import {
  getFullPieceVariant,
  objectifySquare,
  pieceClass,
} from '~app/features/chess/utils';

const useStyles = makeStyles({
  promotion: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 10,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  pieceWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${SQUARE_SIZE}%`,
    height: `${SQUARE_SIZE * 4}%`,
    display: 'flex',
    flexFlow: 'column',
    backgroundColor: '#fff',
    boxShadow: '0 3px 10px rgba(0 0 0 / 50%)',
    // Direction
    '&.bottom': {
      top: 'auto',
      bottom: 0,
      flexFlow: 'column-reverse',
    },
  },
  piece: {
    position: 'static',
    width: '100%',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    // Hovered
    '&:hover': {
      backgroundColor: 'rgba(0 0 0 / 8%)',
    },
  },
});

interface PromotionDialogProps {
  square: ChessSquareName;
  color: ChessPieceColor;
  abortPromotion(): void;
  selectPromotion(variant: ChessPromotionVariant): void;
}

// @todo: Find correct a11y sementics for the dialog backdrop
const PromotionDialog: FunctionComponent<PromotionDialogProps> = ({
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

export default PromotionDialog;
