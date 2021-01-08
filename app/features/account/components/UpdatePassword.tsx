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
import { useFormik } from 'formik';
import type { FunctionComponent } from 'react';

import ErrorMessage from '~app/components/ErrorMessage';
import SuccessMessage from '~app/components/SuccessMessage';
import {
  UPDATE_PASSWORD_MUTATION,
  UpdatePassword as UpdatePasswordMethod,
} from '~app/features/account/graphql';
import { CURRENT_USER_QUERY } from '~app/graphql';
import { useVisibilityToggle } from '~app/hooks';

const UpdatePassword: FunctionComponent = () => {
  const [
    updatePasword,
    { loading, error, called },
  ] = useMutation<UpdatePasswordMethod>(UPDATE_PASSWORD_MUTATION);
  const {
    visibility,
    handleVisibilityChange,
    preventMouseDown,
    resetVisibility,
  } = useVisibilityToggle(['password']);
  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async currentValues => {
      try {
        // Invoke update password action.
        await updatePasword({
          variables: {
            oldPassword: currentValues.oldPassword,
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
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={handleVisibilityChange('oldPassword')}
                      onMouseDown={preventMouseDown}
                    >
                      {visibility.oldPassword ? (
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
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
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
