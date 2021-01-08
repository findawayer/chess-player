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
import type { ChangeEvent, FormEvent, FunctionComponent } from 'react';
import { useState } from 'react';

import ErrorMessage from '~app/components/ErrorMessage';
import SuccessMessage from '~app/components/SuccessMessage';
import {
  RECOVER_PASSWORD_MUTATION,
  RecoverPassword as RecoverPasswordMethod,
} from '~app/features/account/graphql';

// Component
const RecoverPassword: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [
    recoverPassword,
    { loading, error, called },
  ] = useMutation<RecoverPasswordMethod>(RECOVER_PASSWORD_MUTATION);

  /** Handler for input field changes. */
  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  /** Handler for form submission */
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      <fieldset disabled={loading} aria-busy={loading}>
        <Card elevation={3}>
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
              disabled={loading}
              color="primary"
              fullWidth
              size="large"
              variant="contained"
            >
              Request reset
            </Button>
          </CardActions>
        </Card>
      </fieldset>
    </form>
  );
};

export default RecoverPassword;
