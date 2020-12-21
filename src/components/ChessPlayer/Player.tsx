import prettyMilliseconds from 'pretty-ms';
import React from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { ChessPlayer } from '@types';
import useStyles from './styles';

export interface PlayerProps {
  player: ChessPlayer;
  time: number;
}

export const Player: React.FC<PlayerProps> = ({ player, time }) => {
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
      <Box flexGrow={1} className={classes.player}>
        <Tooltip title="Score" placement="top-start">
          <Typography variant="h6" component="span" className={classes.score}>
            {player.score.toFixed(1)}
          </Typography>
        </Tooltip>
        <Tooltip title="User name" placement="top-start">
          <Typography variant="h6" component="strong" className={classes.name}>
            {player.name}
          </Typography>
        </Tooltip>
      </Box>
      <Box className={classes.timer}>
        <Tooltip title="Remaining time" placement="top">
          <Typography variant="h6" component="span">
            {formattedTime}
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  );
};
