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
import { useFormik } from 'formik';
import type { FunctionComponent } from 'react';

import ErrorMessage from '~app/components/ErrorMessage';
import SuccessMessage from '~app/components/SuccessMessage';
import {
  UPDATE_USER_INFO_MUTATION,
  UpdateUserInfo as UpdateUserInfoMethod,
} from '~app/features/account/graphql';
import { CURRENT_USER_QUERY, CurrentUser } from '~app/graphql';

interface UpdateUserInfoProps {
  me: CurrentUser;
}

const UpdateUserInfo: FunctionComponent<UpdateUserInfoProps> = ({
  me: { email, name },
}) => {
  const [
    updateUserInfo,
    { loading, error, called },
  ] = useMutation<UpdateUserInfoMethod>(UPDATE_USER_INFO_MUTATION);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { email, name },
    onSubmit: async currentValues => {
      try {
        await updateUserInfo({
          variables: {
            email: currentValues.email,
            name: currentValues.name,
          },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
      } catch (error) {
        // Hide error from user.
      }
    },
  });

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h4" component="h2" align="center" gutterBottom>
              My account info
            </Typography>
            <Box mb={2}>
              <ErrorMessage error={error} />
              <SuccessMessage
                isSuccessful={called && !loading && !error}
                message="Success! Updated your info."
              />
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
              Apply changes
            </Button>
          </CardActions>
        </Card>
      </fieldset>
    </form>
  );
};

export default UpdateUserInfo;
