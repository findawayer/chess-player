import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';

import { getFullPieceColor } from '@/helpers';
import { ChessGameOver, ChessGameOverType, ChessPieceColor } from '@/types';
import useStyles from './styles';

interface ChessGameOverDialogProps {
  gameOver: ChessGameOver | false;
  playerColor: ChessPieceColor | null;
  rematch(alternate: boolean): void;
}

const getTitle = (
  winner: ChessPieceColor | null,
  playerColor: ChessPieceColor | null,
): string => {
  if (!winner) {
    return 'Draw';
  }
  if (playerColor) {
    return `You ${winner === playerColor ? 'win!!' : 'lose…'}`;
  }
  return `${getFullPieceColor(winner)} wins!!`;
};

const getDescription = (gameOver: ChessGameOver): string => {
  switch (gameOver.type) {
    case ChessGameOverType.Checkmate:
      return 'by checkmate';

    case ChessGameOverType.Resignation: {
      return `by resignation`;
    }

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

const ChessGameOverDialog: React.FC<ChessGameOverDialogProps> = ({
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

export default ChessGameOverDialog;
