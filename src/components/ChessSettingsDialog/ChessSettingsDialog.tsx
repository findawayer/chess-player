import React from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Switch,
  Typography,
} from '@material-ui/core';

import { ChessBoardThemeVariant, ChessSettings } from '~/types';
import useStyles from './styles';

interface ChessSettingsDialogProps {
  isOpen: boolean;
  settings: ChessSettings;
  applySettings(diff: Partial<ChessSettings>): void;
  closeSettings(): void;
}

const ChessSettingsDialog: React.FC<ChessSettingsDialogProps> = ({
  isOpen,
  settings,
  applySettings,
  closeSettings,
}) => {
  /* CSS classes via Material UI */
  const classes = useStyles();
  /* Chess board themes */
  const chessBoardThemes: ChessBoardThemeVariant[] = [
    'arctic',
    'loyal',
    'golden',
  ];

  /* [Control handler] highlight moves */
  const handleHighlightMovesChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => applySettings({ highlightMoves: checked });

  /* [Control handler] show legal moves */
  const handleShowLegalMovesChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => applySettings({ showLegalMoves: checked });

  /* [Control handler] auto promote to queen */
  const handleAutoPromoteToQueenChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => applySettings({ autoPromoteToQueen: checked });

  /* [Control handler] board color */
  const handleBoardColorChange = (
    event: React.ChangeEvent<{ value: ChessBoardThemeVariant }>,
  ) => applySettings({ boardColor: event.target.value });

  return (
    <Dialog
      open={isOpen}
      onClose={() => closeSettings()}
      aria-labelledby="chessSettingsDialogTitle"
      aria-describedby="chessSettingsDialogDescription"
    >
      <DialogTitle
        disableTypography
        id="chessSettingsDialogTitle"
        className={classes.title}
        aria-level={1}
      >
        <Typography variant="h4" component="div">
          Settings
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Box display="flex" alignItems="center" mb={1}>
          <Box flexGrow={1}>
            <Typography variant="body1" color="textSecondary">
              Highlight moves
            </Typography>
          </Box>
          <Box flexShrink={0} className={classes.formControl}>
            <Switch
              checked={settings.highlightMoves}
              color="primary"
              onChange={handleHighlightMovesChange}
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <Box flexGrow={1}>
            <Typography variant="body1" color="textSecondary">
              Show legal moves
            </Typography>
          </Box>
          <Box flexShrink={0} className={classes.formControl}>
            <Switch
              checked={settings.showLegalMoves}
              color="primary"
              onChange={handleShowLegalMovesChange}
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <Box flexGrow={1}>
            <Typography variant="body1" color="textSecondary">
              Auto promote to Queen
            </Typography>
          </Box>
          <Box flexShrink={0} className={classes.formControl}>
            <Switch
              checked={settings.autoPromoteToQueen}
              color="primary"
              onChange={handleAutoPromoteToQueenChange}
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={0}>
          <Box flexGrow={1}>
            <Typography variant="body1" color="textSecondary">
              Board color
            </Typography>
          </Box>
          <Box flexShrink={0} className={classes.formControl}>
            <Select
              value={settings.boardColor}
              fullWidth
              className={classes.select}
              onChange={handleBoardColorChange}
            >
              {chessBoardThemes.map(theme => (
                <MenuItem
                  key={theme}
                  value={theme}
                  className={classes.selectOption}
                >
                  {theme}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ChessSettingsDialog;
