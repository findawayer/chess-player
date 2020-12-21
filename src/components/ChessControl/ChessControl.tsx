import React from 'react';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CachedIcon from '@material-ui/icons/Cached';
import FlagIcon from '@material-ui/icons/Flag';
import SettingsIcon from '@material-ui/icons/Settings';
import UndoIcon from '@material-ui/icons/Undo';
import useStyles from './styles';

interface ChessControlProps {
  canResign: boolean;
  canTakeBack: boolean;
  flipBoard(): void;
  takeBack(): void;
  resign(): void;
  toggleSettings(force?: boolean): void;
}

export const ChessControl: React.FC<ChessControlProps> = ({
  canResign,
  canTakeBack,
  flipBoard,
  takeBack,
  resign,
  toggleSettings,
}) => {
  /** CSS classes created via Material-UI. */
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexWrap="nowrap"
      justifyContent="space-between"
      className={classes.root}
    >
      <Tooltip title="Rotate board">
        <IconButton edge="start" className={classes.button} onClick={flipBoard}>
          <CachedIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      {canTakeBack ? (
        <Tooltip title="Take back a move">
          <IconButton className={classes.button} onClick={takeBack}>
            <UndoIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      ) : (
        <IconButton className={classes.button} disabled>
          <UndoIcon fontSize="inherit" />
        </IconButton>
      )}
      {canResign ? (
        <Tooltip title="Resign">
          <IconButton className={classes.button} onClick={resign}>
            <FlagIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      ) : (
        <IconButton className={classes.button} disabled>
          <FlagIcon fontSize="inherit" />
        </IconButton>
      )}
      <Tooltip title="Settings">
        <IconButton
          className={classes.button}
          edge="end"
          onClick={() => toggleSettings(true)}
        >
          <SettingsIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
