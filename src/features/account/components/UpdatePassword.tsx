import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';
import React from 'react';

import ErrorMessage from '~/components/ErrorMessage';
import SuccessMessage from '~/components/SuccessMessage';
import { usePasswordFields } from '~/hooks';
import { CURRENT_USER_QUERY } from '~/graphql';
import {
  UPDATE_PASSWORD_MUTATION,
  UpdatePassword as UpdatePasswordMethod,
} from '../graphql';

const UpdatePassword: React.FC = () => {
  const {
    fields,
    visibility,
    handlePasswordChange,
    handleVisibilityChange,
    handleTogglerClick,
  } = usePasswordFields(['oldPassword', 'password', 'confirmPassword']);
  const [
    updatePasword,
    { loading, error, called },
  ] = useMutation<UpdatePasswordMethod>(UPDATE_PASSWORD_MUTATION, {
    variables: {
      oldPassword: fields.oldPassword,
      password: fields.password,
      confirmPassword: fields.confirmPassword,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  /** Handler for form submission */
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Highjack native form submission.
    event.preventDefault();
    try {
      await updatePasword();
    } catch (error) {
      // Hide error from user.
    }
  };

  return (
    <form method="post" onSubmit={handleFormSubmit}>
      <Card component="fieldset" elevation={3} aria-busy={loading}>
        <CardContent>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            My password
          </Typography>
          <Box mb={2}>
            <ErrorMessage error={error} />
            <SuccessMessage
              isSuccessful={called && !loading && !error}
              message="Success! Updated your password."
            />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="oldPassword">
                Old password <span aria-hidden="true">*</span>
              </InputLabel>
              <Input
                id="oldPassword"
                type={visibility.oldPassword ? 'text' : 'password'}
                name="oldPassword"
                value={fields.oldPassword}
                disabled={loading}
                required
                onChange={handlePasswordChange('oldPassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={handleVisibilityChange('oldPassword')}
                      onMouseDown={handleTogglerClick}
                    >
                      {visibility.oldPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="password">
                New password <span aria-hidden="true">*</span>
              </InputLabel>
              <Input
                id="password"
                type={visibility.password ? 'text' : 'password'}
                name="password"
                value={fields.password}
                disabled={loading}
                required
                onChange={handlePasswordChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={handleVisibilityChange('password')}
                      onMouseDown={handleTogglerClick}
                    >
                      {visibility.password ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="confirmPassword">
                Confirm new password <span aria-hidden="true">*</span>
              </InputLabel>
              <Input
                id="confirmPassword"
                type={visibility.confirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={fields.confirmPassword}
                disabled={loading}
                required
                onChange={handlePasswordChange('confirmPassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={handleVisibilityChange('confirmPassword')}
                      onMouseDown={handleTogglerClick}
                    >
                      {visibility.confirmPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            color="primary"
            size="large"
            variant="contained"
            fullWidth
          >
            Update password
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default UpdatePassword;
