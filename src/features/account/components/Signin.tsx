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
  TextField,
  Typography,
} from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import ErrorMessage from '~/components/ErrorMessage';
import { CURRENT_USER_QUERY } from '~/graphql';
import { SIGN_IN_MUTATION, Signin as SigninMethod } from '../graphql';

const Signin: React.FC = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const { email, password, showPassword } = values;
  const [signin, { loading, error }] = useMutation<SigninMethod>(
    SIGN_IN_MUTATION,
    {
      variables: { email, password },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );
  const router = useRouter();

  /** Handler for input field changes. */
  const handleInputChange = (
    key: Exclude<keyof typeof values, 'showPassword'>,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(previousUserInput => ({
      ...previousUserInput,
      [key]: event.target.value,
    }));
  };
  /** Handler for form submission */
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    let hasError = false;
    // Highjack native form submission.
    event.preventDefault();
    // Don't let Next.js display runtime error,
    // to display custom error message to the user.
    try {
      // Invoke signup action.
      await signin();
      // Reset the form.
      setValues({ email: '', password: '', showPassword: false });
    } catch (error) {
      // Don't let Next.js display error.
      hasError = true;
    }
    // If login is successful,
    if (!hasError) {
      // Redirect to the home page.
      router.push('/');
    }
  };
  /** Handler for toggling password value. */
  const handleClickShowPassword = () => {
    setValues(previousValues => ({
      ...previousValues,
      showPassword: !previousValues.showPassword,
    }));
  };
  /** Prevent native click action on password toggler button. */
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <form method="post" onSubmit={handleFormSubmit}>
      <Card component="fieldset" elevation={3} aria-busy={loading}>
        <CardContent>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Log in to your account
          </Typography>
          <Box mb={2}>
            <ErrorMessage error={error} />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                id="userEmail"
                name="userEmail"
                value={email}
                required
                onChange={handleInputChange('email')}
                label="Email"
              />
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="userPassword">
                Password <span aria-hidden="true">*</span>
              </InputLabel>
              <Input
                id="userPassword"
                type={showPassword ? 'text' : 'password'}
                name="userPassword"
                value={password}
                disabled={loading}
                required
                onChange={handleInputChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
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
          <Box mt={3}>
            <p>
              <Link href="/join" passHref>
                <Typography component="a" color="inherit">
                  Create a new account.
                </Typography>
              </Link>
            </p>
            <p>
              <Link href="/recover" passHref>
                <Typography component="a" color="inherit">
                  Forgot password?
                </Typography>
              </Link>
            </p>
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
            Log in
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default Signin;
