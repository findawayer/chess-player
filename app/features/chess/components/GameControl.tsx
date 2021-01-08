import { Box, IconButton, Tooltip } from '@material-ui/core';
import { Cached, Flag, Settings, Undo } from '@material-ui/icons';
import type { FunctionComponent } from 'react';

interface GameControlProps {
  canResign: boolean;
  canTakeBack: boolean;
  flipBoard(): void;
  takeBack(): void;
  resign(): void;
  openSettings(): void;
}

const GameControl: FunctionComponent<GameControlProps> = ({
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
          <Cached fontSize="inherit" />
        </IconButton>
      </Tooltip>
      {canTakeBack ? (
        <Tooltip title="Take back a move">
          <IconButton onClick={takeBack}>
            <Undo fontSize="inherit" />
          </IconButton>
        </Tooltip>
      ) : (
        <IconButton disabled>
          <Undo fontSize="inherit" />
        </IconButton>
      )}
      {canResign ? (
        <Tooltip title="Resign">
          <IconButton onClick={resign}>
            <Flag fontSize="inherit" />
          </IconButton>
        </Tooltip>
      ) : (
        <IconButton disabled>
          <Flag fontSize="inherit" />
        </IconButton>
      )}
      <Tooltip title="Settings">
        <IconButton edge="end" onClick={() => openSettings()}>
          <Settings fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default GameControl;
