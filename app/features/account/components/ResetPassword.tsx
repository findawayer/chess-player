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
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';

import ErrorMessage from '~app/components/ErrorMessage';
import {
  RESET_PASSWORD_MUTATION,
  ResetPassword as ResetPasswordMethod,
} from '~app/features/account/graphql';
import { CURRENT_USER_QUERY } from '~app/graphql';
import { useVisibilityToggle } from '~app/hooks';

// Component
const ResetPassword: React.FC = () => {
  const router = useRouter();
  const { resetToken } = router.query;
  const [
    resetPassword,
    { loading, error, called },
  ] = useMutation<ResetPasswordMethod>(RESET_PASSWORD_MUTATION);
  const {
    visibility,
    handleVisibilityChange,
    preventMouseDown,
    resetVisibility,
  } = useVisibilityToggle(['password']);
  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
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
        resetForm();
        resetVisibility();
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
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      disabled={isSuccessful}
                      onClick={handleVisibilityChange('password')}
                      onMouseDown={preventMouseDown}
                    >
                      {visibility.password ? <Visibility /> : <VisibilityOff />}
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
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      disabled={isSuccessful}
                      onClick={handleVisibilityChange('confirmPassword')}
                      onMouseDown={preventMouseDown}
                    >
                      {visibility.confirmPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
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
