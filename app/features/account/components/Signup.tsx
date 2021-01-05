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
import React from 'react';

import ErrorMessage from '~app/components/ErrorMessage';
import { CURRENT_USER_QUERY } from '~app/graphql';
import { useVisibilityToggle } from '~app/hooks';
import {
  SIGN_UP_MUTATION,
  Signup as SignupMethod,
} from '~app/features/account/graphql';

interface SignupProps {
  noRedirect?: boolean;
}

const Signup: React.FC<SignupProps> = ({ noRedirect }) => {
  const router = useRouter();
  const [signup, { loading, error }] = useMutation<SignupMethod>(
    SIGN_UP_MUTATION,
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
      name: '',
      password: '',
    },
    onSubmit: async currentValues => {
      try {
        // Invoke signup action.
        await signup({
          variables: {
            email: currentValues.email,
            name: currentValues.name,
            password: currentValues.password,
          },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
        // Reset the form if successful.
        resetForm();
        resetVisibility();
        // Redirect to the home page.
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
      <Card component="fieldset" elevation={3} aria-busy={loading}>
        <CardContent>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Make your account
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
              <TextField
                id="name"
                name="name"
                value={values.name}
                required
                onChange={handleChange}
                label="Name"
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
                disabled={loading}
                required
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
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
          <Box mt={3}>
            <Link href="/signin" passHref>
              <Typography component="a" color="inherit">
                Already have an account?
              </Typography>
            </Link>
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
            Create account
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default Signup;
