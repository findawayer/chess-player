import React from 'react';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import { PreferencesState } from '@slices/preferences';
import { ChessBoardThemeVariant } from '@themes';
import useStyles from './styles';

export interface ChessSettingsDialogProps {
  isOpen: boolean;
  settings: PreferencesState;
  updateSettings(update: Partial<PreferencesState>): void;
  toggleSettings(force?: boolean): void;
}

export const ChessSettingsDialog: React.FC<ChessSettingsDialogProps> = ({
  isOpen,
  settings,
  updateSettings,
  toggleSettings,
}) => {
  /* CSS classes via Material UI */
  const classes = useStyles();
  /* Chess board themes */
  const chessBoardThemes: ChessBoardThemeVariant[] = [
    'arctic',
    'loyal',
    'golden',
  ];

  /**
   * These form control change handlers below are bound to Redux store
   * rather than to local state, because they are closely tied to
   * user preferences that need to stay constant between sessions.
   *
   * These settings are cached in user's localStorage as of currently,
   * and preloaded as default state before the app's hydration.)
   */

  /* [Control handler] highlight moves */
  const handleHighlightMovesChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => updateSettings({ highlightMoves: checked });

  /* [Control handler] show legal moves */
  const handleShowLegalMovesChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => updateSettings({ showLegalMoves: checked });

  /* [Control handler] auto promote to queen */
  const handleAutoPromoteToQueenChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => updateSettings({ autoPromoteToQueen: checked });

  /* [Control handler] board color */
  const handleBoardColorChange = (
    event: React.ChangeEvent<{ value: ChessBoardThemeVariant }>,
  ) => updateSettings({ boardColor: event.target.value });

  return (
    <Dialog
      open={isOpen}
      onClose={() => toggleSettings(false)}
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
