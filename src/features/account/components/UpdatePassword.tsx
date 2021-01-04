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
import {
  UPDATE_PASSWORD_MUTATION,
  UpdatePassword as UpdatePasswordMethod,
} from '~/features/account/graphql';
import { CURRENT_USER_QUERY } from '~/graphql';
import { usePasswordFields } from '~/hooks';

const UpdatePassword: React.FC = () => {
  const [
    updatePasword,
    { loading, error, called },
  ] = useMutation<UpdatePasswordMethod>(UPDATE_PASSWORD_MUTATION);
  const {
    values,
    visibility,
    handlePasswordChange,
    handleTogglerClick,
    handleVisibilityChange,
    handleSubmit,
    clearPasswords,
  } = usePasswordFields({
    keys: ['oldPassword', 'password', 'confirmPassword'],
    onSubmit: async currentValues => {
      try {
        await updatePasword({
          variables: {
            oldPassword: currentValues.oldPassword,
            password: currentValues.password,
            confirmPassword: currentValues.confirmPassword,
          },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
        // Clear fields if sucessful.
        clearPasswords();
      } catch (error) {
        // Hide error from users.
      }
    },
  });

  return (
    <form method="post" onSubmit={handleSubmit}>
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
                name="oldPassword"
                type={visibility.oldPassword ? 'text' : 'password'}
                value={values.oldPassword}
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
                name="password"
                type={visibility.password ? 'text' : 'password'}
                value={values.password}
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
                name="confirmPassword"
                type={visibility.confirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
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
