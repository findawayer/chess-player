import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { ChessBoardColor } from '@prisma/client';
import React from 'react';

import ErrorMessage from '~/components/ErrorMessage';
import PleaseLogin from '~/components/PleaseLogin';
import { ChessSettings, mapChessSettings } from '~/features/chess/hooks';
import { UPDATE_CHESS_SETTINGS_MUTATION } from '~/features/chess/graphql';
import { CURRENT_USER_QUERY } from '~/graphql';
import { capitalize } from '~/utils';

interface ChessSettingsDialogProps {
  isOpen: boolean;
  close(): void;
  settings: ChessSettings;
  changeSetting(
    name: keyof ChessSettings,
    value: ChessSettings[keyof ChessSettings],
  ): void;
}

const ChessSettingsDialog: React.FC<ChessSettingsDialogProps> = ({
  isOpen,
  close,
  settings,
  changeSetting,
}) => {
  // Save new chess settings to the database.
  const [updateSettings, { loading, error }] = useMutation(
    UPDATE_CHESS_SETTINGS_MUTATION,
  );

  /** Hnadle changes on <Switch /> components. */
  const handleSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    const { name } = event.target as HTMLInputElement;
    changeSetting(name as keyof ChessSettings, checked);
  };
  /** Handle changes on <Select /> components. */
  const handleSelectChange = (
    event: React.ChangeEvent<{ name: string; value: unknown }>,
  ) => {
    const { name, value } = event.target;
    changeSetting(
      name as keyof ChessSettings,
      value as ChessSettings[keyof ChessSettings],
    );
  };
  /** Handle form submission. */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Hijack form submission.
    event.preventDefault();
    try {
      // Save current settings.
      await updateSettings({
        variables: mapChessSettings(settings),
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
      });
      // If successful, close the dialog.
      close();
    } catch (error) {
      // Don't display error to users.
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => close()}
      aria-labelledby="chessSettingsDialogTitle"
      aria-describedby="chessSettingsDialogDescription"
    >
      <PleaseLogin message="Personalize your game experience.">
        <form
          method="post"
          onSubmit={handleSubmit}
          style={{ minWidth: 400, padding: 20 }}
        >
          <DialogTitle
            disableTypography
            id="chessSettingsDialogTitle"
            aria-level={1}
          >
            <Typography variant="h4" component="div" align="center">
              Settings
            </Typography>
          </DialogTitle>
          <DialogContent>
            <ErrorMessage error={error} />
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>
                <FormLabel htmlFor="showRecent">Highlight moves</FormLabel>
              </Box>
              <Box flexShrink={0}>
                <Checkbox
                  id="showRecent"
                  name="showRecent"
                  checked={settings.showRecent}
                  disabled={loading}
                  onChange={handleSwitchChange}
                  color="primary"
                />
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>
                <FormLabel htmlFor="showLegal">Show legal moves</FormLabel>
              </Box>
              <Box flexShrink={0}>
                <Checkbox
                  id="showLegal"
                  name="showLegal"
                  checked={settings.showLegal}
                  disabled={loading}
                  onChange={handleSwitchChange}
                  color="primary"
                />
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>
                <FormLabel htmlFor="autoQueen">Auto promote to Queen</FormLabel>
              </Box>
              <Box flexShrink={0}>
                <Checkbox
                  id="autoQueen"
                  name="autoQueen"
                  checked={settings.autoQueen}
                  disabled={loading}
                  onChange={handleSwitchChange}
                  color="primary"
                />
              </Box>
            </Box>
            <Box display="flex" alignItems="center" my={1}>
              <Box flexGrow={1}>
                <FormLabel htmlFor="boardColor">Board color</FormLabel>
              </Box>
              <Box flexShrink={0} flexBasis={100}>
                <Select
                  id="boardColor"
                  name="boardColor"
                  value={settings.boardColor}
                  disabled={loading}
                  onChange={handleSelectChange}
                  fullWidth
                >
                  {Object.keys(ChessBoardColor).map(theme => (
                    <MenuItem key={theme} value={theme}>
                      {capitalize(theme)}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </PleaseLogin>
    </Dialog>
  );
};

export default ChessSettingsDialog;
