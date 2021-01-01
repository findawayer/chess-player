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
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ChessBoardColor } from '@prisma/client';
import { useFormik } from 'formik';
import React from 'react';

import { useChessSettings } from '../hooks';

interface ChessSettingsDialogProps {
  isOpen: boolean;
  close(): void;
}

// Styling through Material UI theme.
const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    title: {
      padding: theme.spacing(3, 4, 2),
    },
    content: {
      padding: theme.spacing(2, 4, 4),
    },
    formControl: {
      width: 100,
      textAlign: 'right',
    },
    select: {
      textAlign: 'left',
      textTransform: 'capitalize',
    },
    selectOption: {
      textTransform: 'capitalize',
    },
  }),
);

const ChessSettingsDialog: React.FC<ChessSettingsDialogProps> = ({
  isOpen,
  close,
}) => {
  // Chess settings
  const [settings, updateSettings] = useChessSettings();
  // destructured
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: settings,
    onSubmit: values => {
      console.log(values);
      updateSettings();
    },
  });
  /* CSS classes via Material UI */
  const classes = useStyles();
  /* Chess board themes */
  const chessBoardThemes: ChessBoardColor[] = ['ARCTIC', 'LOYAL', 'GOLDEN'];

  return (
    <Dialog
      open={isOpen}
      onClose={() => close()}
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
        <form method="post" onSubmit={handleSubmit}>
          <Box display="flex" alignItems="center" mb={1}>
            <Box flexGrow={1}>
              <Typography variant="body1" color="textSecondary">
                Highlight moves
              </Typography>
            </Box>
            <Box flexShrink={0} className={classes.formControl}>
              <Switch
                checked={values.showRecent}
                color="primary"
                onChange={handleChange}
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
                checked={values.showLegal}
                color="primary"
                onChange={handleChange}
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
                checked={values.autoQueen}
                color="primary"
                onChange={handleChange}
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
                value={values.boardColor}
                fullWidth
                className={classes.select}
                onChange={handleChange}
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChessSettingsDialog;
