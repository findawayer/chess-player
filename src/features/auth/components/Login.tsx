import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
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
  TextField,
  Typography,
} from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';

import ServerError from '~/features/common/components/ServerError';
import { CURRENT_USER_QUERY, SIGN_IN_MUTATION } from '../graphql';
import useStyles from './styles/Signup';

// Component
const Signin: React.FC = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const { email, password, showPassword } = values;
  const [signin, { loading, error }] = useMutation(SIGN_IN_MUTATION, {
    variables: { email, password },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const router = useRouter();
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
      // Invoke signup action.
      await signin();
    } catch (error) {
      // Don't let Next.js display error.
      hasError = true;
    }
    // If login is successful,
    if (!hasError) {
      // Reset the form.
      setValues({ email: '', password: '', showPassword: false });
      // Redirect to the home page.
      router.push('/');
    }
  };
  // Handler for toggling password value.
  const handleClickShowPassword = () => {
    setValues(previousValues => ({
      ...previousValues,
      showPassword: !previousValues.showPassword,
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
            Log in to your account
          </Typography>
          <div className={classes.formRow}>
            <ServerError error={error} />
          </div>
          <FormControl fullWidth className={classes.formRow}>
            <TextField
              id="userEmail"
              name="userEmail"
              value={email}
              required
              onChange={handleInputChange('email')}
              label="Email"
            />
          </FormControl>
          <FormControl fullWidth className={classes.formRow}>
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
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
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
