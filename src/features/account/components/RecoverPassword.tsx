import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import ErrorMessage from '~/theme/components/ServerError';
import { RECOVER_PASSWORD_MUTATION } from '../graphql';

// Component
const Recover: React.FC = () => {
  const [email, setEmail] = useState('');
  const [
    recoverPassword,
    { loading, error, called },
  ] = useMutation(RECOVER_PASSWORD_MUTATION, { variables: { email } });

  /** Handler for input field changes. */
  const handleEmailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmail(event.target.value);
  };
  /** Handler for form submission */
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    let hasError = false;
    // Highjack native form submission.
    event.preventDefault();
    // Don't let Next.js display runtime error,
    // to display custom error message to the user.
    try {
      // Invoke recover action.
      await recoverPassword();
    } catch (error) {
      hasError = true;
    }
    // If the recovery is successful,
    if (!hasError) {
      // Reset the form.
      setEmail('');
    }
  };

  return (
    <form method="post" onSubmit={handleFormSubmit}>
      <Card component="fieldset" elevation={3} aria-busy={loading}>
        <CardContent>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Reset my password
          </Typography>
          <Box mb={2}>
            <ErrorMessage error={error} />
            {!error && !loading && called && (
              <Alert severity="success">
                Success! Check your email for a reset link.
              </Alert>
            )}
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                id="userEmail"
                name="userEmail"
                value={email}
                required
                onChange={handleEmailInputChange}
                label="Email"
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
            Request reset
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default Recover;
