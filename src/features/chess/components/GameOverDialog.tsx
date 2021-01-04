import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

import {
  ChessGameOver,
  ChessGameOverType,
  ChessPieceColor,
} from '~/features/chess/types';
import { getFullPieceColor } from '~/features/chess/utils';

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
  winner: ChessPieceColor | null,
  playerColor: ChessPieceColor | null,
): string => {
  if (!winner) return 'Draw';
  if (playerColor) return `You ${winner === playerColor ? 'win!!' : 'lose…'}`;
  return `${getFullPieceColor(winner)} wins!!`;
};

const getDescription = (gameOver: ChessGameOver): string => {
  switch (gameOver.type) {
    case ChessGameOverType.Checkmate:
      return 'by checkmate';

    case ChessGameOverType.Resignation:
      return `by resignation`;

    case ChessGameOverType.Timeout:
      return 'on time';

    case ChessGameOverType.Stalemate:
      return 'by stalemate';

    case ChessGameOverType.Repetition:
      return 'by threefold repetition';

    case ChessGameOverType.NotEnoughMaterial:
      return 'Neither player has enough materials for checkmate.';

    default:
      return '';
  }
};

interface GameOverDialogProps {
  gameOver: ChessGameOver | false;
  playerColor: ChessPieceColor | null;
  rematch(alternate: boolean): void;
}

const GameOverDialog: React.FC<GameOverDialogProps> = ({
  gameOver,
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
    setIsOpen(!!gameOver);
  }, [gameOver]);

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
          {gameOver ? getTitle(gameOver.winner, playerColor) : ''}
        </Typography>
        <Typography
          color="textSecondary"
          component="p"
          id="chessGameOverDialogDescription"
          className={classes.description}
        >
          {gameOver ? getDescription(gameOver) : ''}
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
