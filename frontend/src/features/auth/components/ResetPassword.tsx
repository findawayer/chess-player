import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Input,
  Typography,
} from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

import ServerError from '~/features/common/components/ServerError';
import { CURRENT_USER_QUERY } from '../queries/user';
import useStyles from './styles/Signup';

// GraphQL mutation: signup then login
const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
    }
  }
`;

// Component
const ResetPassword: React.FC = () => {
  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });
  const {
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
  } = values;
  const router = useRouter();
  const { resetToken } = router.query;
  const [resetPassword, { loading, error, called }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: { resetToken, password, confirmPassword },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );
  const isSuccessful = called && !loading && !error;
  const classes = useStyles();

  // Handler for input field changes.
  const handleInputChange = (
    key: Exclude<keyof typeof values, 'showPassword'>,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(previousUserInput => ({
      ...previousUserInput,
      [key]: event.target.value,
    }));
  };
  // Handler for form submission
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    let hasError = false;
    // Prevent native form submission.
    event.preventDefault();
    // Don't let Next.js display runtime error,
    // to display custom error message to the user.
    try {
      // Invoke reset password action.
      await resetPassword();
    } catch (error) {
      hasError = true;
    }
    // If the signup is successful,
    if (!hasError) {
      // Reset the form.
      setValues({
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
      });
      // Redirect to the login page.
      // router.push('/login');
    }
  };
  // Handler for toggling password value.
  const handleClickShowPassword = (
    key: 'showPassword' | 'showConfirmPassword',
  ) => () => {
    setValues(previousValues => ({
      ...previousValues,
      [key]: !previousValues[key],
    }));
  };
  // Prevent native click action on password toggler button.
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <form method="post" onSubmit={handleFormSubmit}>
      <Card component="fieldset" elevation={3} aria-busy={loading}>
        <CardContent>
          <Typography variant="h4" component="h2" className={classes.title}>
            Enter your new password
          </Typography>
          <div className={classes.formRow}>
            <ServerError error={error} />
            {isSuccessful && (
              <Alert severity="success">Success! Updated your password.</Alert>
            )}
          </div>
          <FormControl fullWidth className={classes.formRow}>
            <InputLabel htmlFor="userPassword">
              Password <span aria-hidden="true">*</span>
            </InputLabel>
            <Input
              id="userPassword"
              type={showPassword ? 'text' : 'password'}
              value={password}
              disabled={isSuccessful}
              required
              onChange={handleInputChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    disabled={isSuccessful}
                    onClick={handleClickShowPassword('showPassword')}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth className={classes.formRow}>
            <InputLabel htmlFor="userConfirmPassword">
              Confirm password <span aria-hidden="true">*</span>
            </InputLabel>
            <Input
              id="userConfirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              disabled={isSuccessful}
              required
              onChange={handleInputChange('confirmPassword')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    disabled={isSuccessful}
                    onClick={handleClickShowPassword('showConfirmPassword')}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirmPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
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
