import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import ErrorMessage from '~/features/common/components/ServerError';
import useStyles from './styles/Signup';

// GraphQL mutation: signup
const RECOVER_PASSWORD_MUTATION = gql`
  mutation RecoverPassword($email: String!) {
    recoverPassword(email: $email) {
      id
    }
  }
`;

// Component
const Recover: React.FC = () => {
  const [email, setEmail] = useState('');
  const [recoverPassword, { loading, error, called }] = useMutation(
    RECOVER_PASSWORD_MUTATION,
    {
      variables: { email },
    },
  );
  const classes = useStyles();

  // Handler for input field changes.
  const handleEmailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmail(event.target.value);
  };
  // Handler for form submission
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    let hasError = false;
    // Prevent native form submission.
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
          <Typography variant="h4" component="h2" className={classes.title}>
            Reset my password
          </Typography>
          <div className={classes.formRow}>
            <ErrorMessage error={error} />
            {!error && !loading && called && (
              <Alert severity="success">
                Success! Check your email for a reset link.
              </Alert>
            )}
          </div>
          <FormControl fullWidth className={classes.formRow}>
            <TextField
              id="userEmail"
              name="userEmail"
              value={email}
              required
              onChange={handleEmailInputChange}
              label="Email"
            />
          </FormControl>
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