import React from 'react';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import {
  Cached as CachedIcon,
  Flag as FlagIcon,
  Settings as SettingsIcon,
  Undo as UndoIcon,
} from '@material-ui/icons';

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
  return (
    <Box display="flex" flexWrap="nowrap" justifyContent="space-between">
      <Tooltip title="Rotate board">
        <IconButton edge="start" onClick={flipBoard}>
          <CachedIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      {canTakeBack ? (
        <Tooltip title="Take back a move">
          <IconButton onClick={takeBack}>
            <UndoIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      ) : (
        <IconButton disabled>
          <UndoIcon fontSize="inherit" />
        </IconButton>
      )}
      {canResign ? (
        <Tooltip title="Resign">
          <IconButton onClick={resign}>
            <FlagIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      ) : (
        <IconButton disabled>
          <FlagIcon fontSize="inherit" />
        </IconButton>
      )}
      <Tooltip title="Settings">
        <IconButton edge="end" onClick={() => openSettings()}>
          <SettingsIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ChessControl;
