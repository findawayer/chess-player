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
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FunctionComponent } from 'react';

import ErrorMessage from '~app/components/ErrorMessage';
import {
  SIGN_IN_MUTATION,
  Signin as SigninMethod,
} from '~app/features/account/graphql';
import { CURRENT_USER_QUERY } from '~app/graphql';
import { useVisibilityToggle } from '~app/hooks';

interface SigninProps {
  noRedirect?: boolean;
}

const Signin: FunctionComponent<SigninProps> = ({ noRedirect }) => {
  const router = useRouter();
  const [signin, { loading, error }] = useMutation<SigninMethod>(
    SIGN_IN_MUTATION,
  );
  const {
    visibility,
    handleVisibilityChange,
    preventMouseDown,
    resetVisibility,
  } = useVisibilityToggle(['password']);
  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async currentValues => {
      try {
        // Invoke signup action.
        await signin({
          variables: {
            email: currentValues.email,
            password: currentValues.password,
          },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
        // Reset the form if successful.
        resetForm();
        resetVisibility();
        // Once log in, redirect to the home page.
        if (!noRedirect) {
          router.push('/');
        }
      } catch (error) {
        // Hide error from users.
      }
    },
  });

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <Card elevation={3}>
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
                  value={values.password}
                  required
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={handleVisibilityChange('password')}
                        onMouseDown={preventMouseDown}
                      >
                        {visibility.password ? (
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
            <Box mt={3}>
              <p>
                <Link href="/get-started" passHref>
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
              disabled={loading}
              color="primary"
              fullWidth
              size="large"
              variant="contained"
            >
              Log in
            </Button>
          </CardActions>
        </Card>
      </fieldset>
    </form>
  );
};

export default Signin;
