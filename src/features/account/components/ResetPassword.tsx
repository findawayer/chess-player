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
import { Alert } from '@material-ui/lab';
import { useRouter } from 'next/router';
import React from 'react';

import ErrorMessage from '~/components/ErrorMessage';
import { CURRENT_USER_QUERY } from '~/graphql';
import { usePasswordFields } from '~/hooks';
import {
  RESET_PASSWORD_MUTATION,
  ResetPassword as ResetPasswordMethod,
} from '../graphql';

// Component
const ResetPassword: React.FC = () => {
  const router = useRouter();
  const { resetToken } = router.query;
  const [
    resetPassword,
    { loading, error, called },
  ] = useMutation<ResetPasswordMethod>(RESET_PASSWORD_MUTATION);
  const {
    values,
    visibility,
    handlePasswordChange,
    handleTogglerClick,
    handleVisibilityChange,
    handleSubmit,
    clearPasswords,
  } = usePasswordFields({
    keys: ['password', 'confirmPassword'],
    onSubmit: async currentValues => {
      try {
        // Invoke reset password action.
        await resetPassword({
          variables: {
            resetToken,
            password: currentValues.password,
            confirmPassword: currentValues.confirmPassword,
          },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
        // Reset the form if successful.
        clearPasswords();
      } catch (error) {
        // Hide error from users.
      }
    },
  });
  const isSuccessful = called && !loading && !error;

  return (
    <form method="post" onSubmit={handleSubmit}>
      <Card component="fieldset" elevation={3} aria-busy={loading}>
        <CardContent>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Enter your new password
          </Typography>
          <Box mb={2}>
            <ErrorMessage error={error} />
            {isSuccessful && (
              <Alert severity="success">Success! Updated your password.</Alert>
            )}
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="password">
                Password <span aria-hidden="true">*</span>
              </InputLabel>
              <Input
                id="password"
                name="password"
                type={visibility.password ? 'text' : 'password'}
                value={values.password}
                disabled={isSuccessful}
                required
                onChange={handlePasswordChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      disabled={isSuccessful}
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
                Confirm password <span aria-hidden="true">*</span>
              </InputLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={visibility.confirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                disabled={isSuccessful}
                required
                onChange={handlePasswordChange('confirmPassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      disabled={isSuccessful}
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
            disabled={isSuccessful}
            color="primary"
            size="large"
            variant="contained"
            fullWidth
          >
            Reset password
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default ResetPassword;
