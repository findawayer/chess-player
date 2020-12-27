import prettyMilliseconds from 'pretty-ms';
import React from 'react';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { ChessPlayer as ChessPlayerType } from '~/types';

interface PlayerProps {
  player: ChessPlayerType;
  time: number;
}

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    root: {
      padding: theme.spacing(2, 3),
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      lineHeight: 1.8,
      fontSize: theme.typography.h6.fontSize,
      cursor: 'default',
      userSelect: 'none',
    },
    score: {
      width: '2em',
    },
    timer: {
      width: '4em',
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.dark,
      textAlign: 'center',
    },
  }),
);

const ChessPlayer: React.FC<PlayerProps> = ({ player, time }) => {
  /** CSS classes created via Material-UI. */
  const classes = useStyles();
  /** Time left to the player in `00:00` format. */
  const formattedTime = prettyMilliseconds(time, {
    secondsDecimalDigits: 0,
    colonNotation: true,
  });

  return (
    <Box
      display="flex"
      flexWrap="nowrap"
      alignItems="center"
      className={classes.root}
    >
      <Box mr={1} className={classes.score}>
        <span>{player.score.toFixed(1)}</span>
      </Box>
      <Box flexGrow={1}>
        <strong>{player.name}</strong>
      </Box>
      <Box className={classes.timer}>
        <span>{formattedTime}</span>
      </Box>
    </Box>
  );
};

export default ChessPlayer;
