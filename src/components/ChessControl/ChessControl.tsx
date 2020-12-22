import React from 'react';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import {
  Cached as CachedIcon,
  Flag as FlagIcon,
  Settings as SettingsIcon,
  Undo as UndoIcon,
} from '@material-ui/icons';

import useStyles from './styles';

interface ChessControlProps {
  canResign: boolean;
  canTakeBack: boolean;
  flipBoard(): void;
  takeBack(): void;
  resign(): void;
  openSettings(): void;
}

const ChessControl: React.FC<ChessControlProps> = ({
  canResign,
  canTakeBack,
  flipBoard,
  takeBack,
  resign,
  openSettings,
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
          onClick={() => openSettings()}
        >
          <SettingsIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ChessControl;
