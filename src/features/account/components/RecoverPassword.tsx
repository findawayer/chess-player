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
import React, { useState } from 'react';

import ErrorMessage from '~/components/ErrorMessage';
import SuccessMessage from '~/components/SuccessMessage';
import {
  RECOVER_PASSWORD_MUTATION,
  RecoverPassword as RecoverPasswordMethod,
} from '../graphql';

// Component
const RecoverPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [
    recoverPassword,
    { loading, error, called },
  ] = useMutation<RecoverPasswordMethod>(RECOVER_PASSWORD_MUTATION);

  /** Handler for input field changes. */
  const handleEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  /** Handler for form submission */
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Highjack native form submission.
    event.preventDefault();
    try {
      // Invoke recover action.
      await recoverPassword({ variables: { email } });
      // Reset the form if successful.
      setEmail('');
    } catch (error) {
      // Hide error from users.
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
            <SuccessMessage
              isSuccessful={called && !loading && !error}
              message="Success! Check your email for a reset link."
            />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <TextField
                id="email"
                name="email"
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

export default RecoverPassword;
