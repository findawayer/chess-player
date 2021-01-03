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
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import ErrorMessage from '~/components/ErrorMessage';
import { CURRENT_USER_QUERY } from '~/graphql';
import { usePasswordFields } from '~/hooks';
import { SIGN_IN_MUTATION, Signin as SigninMethod } from '../graphql';

const Signin: React.FC = () => {
  const router = useRouter();
  const [signin, { loading, error }] = useMutation<SigninMethod>(
    SIGN_IN_MUTATION,
  );
  const {
    values: passwordValues,
    visibility,
    handlePasswordChange,
    handleVisibilityChange,
    handleTogglerClick,
    clearPasswords,
  } = usePasswordFields();
  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async currentValues => {
      try {
        // Invoke signup action.
        await signin({
          variables: {
            email: currentValues.email,
            password: passwordValues.password,
          },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
        // Reset the form if successful.
        resetForm();
        clearPasswords();
        // Redirect to the home page.
        router.push('/');
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
            Log in to your account
          </Typography>
          <Box mb={2}>
            <ErrorMessage error={error} />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                id="email"
                name="email"
                value={values.email}
                required
                onChange={handleChange}
                label="Email"
              />
            </FormControl>
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
                value={passwordValues.password}
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
