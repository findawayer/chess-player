import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import type { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';

import type { ChessResult, ChessPieceColor } from '~app/features/chess/types';
import { ChessResultType } from '~app/features/chess/types';
import { getFullPieceColor } from '~app/features/chess/utils';

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    header: {
      padding: theme.spacing(4, 4, 2),
    },
    title: {
      marginBottom: theme.spacing(1),
      textTransform: 'capitalize',
    },
    description: {
      margin: 0,
    },
    content: {
      minWidth: 300,
      padding: theme.spacing(2, 4, 4),
      textAlign: 'center',
    },
  }),
);

const getTitle = (
  winner?: ChessPieceColor,
  playerColor?: ChessPieceColor | null,
): string => {
  if (!winner) return 'Draw';
  if (playerColor) return `You ${winner === playerColor ? 'win!' : 'lose…'}`;
  return `${getFullPieceColor(winner)} wins!`;
};

const getDescription = (gameOver: ChessResult): string => {
  switch (gameOver.type) {
    case ChessResultType.Checkmate:
      return 'by checkmate';

    case ChessResultType.Resignation:
      return `by resignation`;

    case ChessResultType.Timeout:
      return 'on time';

    case ChessResultType.Stalemate:
      return 'by stalemate';

    case ChessResultType.Repetition:
      return 'by threefold repetition';

    case ChessResultType.NotEnoughMaterial:
      return 'Neither player has enough materials for checkmate.';

    default:
      return '';
  }
};

interface GameOverDialogProps {
  result: ChessResult | null;
  playerColor: ChessPieceColor | null;
  rematch(alternate: boolean): void;
}

const GameOverDialog: FunctionComponent<GameOverDialogProps> = ({
  result,
  playerColor,
  rematch,
}) => {
  // Local state: Dialog's visibility.
  const [isOpen, setIsOpen] = useState(false);
  /** CSS classes created via Material-UI. */
  const classes = useStyles();
  /** Close the dialog */
  const dismiss = () => setIsOpen(false);

  // Toggle the dialog's visibility based on the gameOver props change.
  useEffect(() => {
    setIsOpen(Boolean(result));
  }, [result]);

  return (
    <Dialog
      open={isOpen}
      onClose={dismiss}
      className={classes.root}
      aria-labelledby="chessGameOverDialogTitle"
      aria-describedby="chessGameOverDialogDescription"
    >
      <DialogTitle disableTypography className={classes.header}>
        <Typography
          variant="h4"
          component="div"
          id="chessGameOverDialogTitle"
          align="center"
          className={classes.title}
          aria-level={1}
        >
          {result ? getTitle(result.winner, playerColor) : ''}
        </Typography>
        <Typography
          color="textSecondary"
          component="p"
          id="chessGameOverDialogDescription"
          className={classes.description}
        >
          {result ? getDescription(result) : ''}
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={() => rematch(true)}
        >
          Rematch
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverDialog;
