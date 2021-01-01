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
import React from 'react';

import ErrorMessage from '~/components/ErrorMessage';
import SuccessMessage from '~/components/SuccessMessage';
import { CURRENT_USER_QUERY, CurrentUser } from '~/graphql';
import {
  UPDATE_USER_INFO_MUTATION,
  UpdateUserInfo as UpdateUserInfoMethod,
} from '../graphql';

interface UpdateUserInfoProps {
  me: CurrentUser;
}

const UpdateUserInfo: React.FC<UpdateUserInfoProps> = ({
  me: { email, name },
}) => {
  const [
    updateUserInfo,
    { loading, error, called },
  ] = useMutation<UpdateUserInfoMethod>(UPDATE_USER_INFO_MUTATION);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { email, name },
    onSubmit: async values => {
      await updateUserInfo({
        variables: {
          email: values.email,
          name: values.name,
        },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
      });
    },
  });

  // /** Handler for form submission */
  // const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   // Highjack native form submission.
  //   event.preventDefault();
  //   try {
  //     await updateUserInfo();
  //   } catch (error) {
  //     // Hide error from user.
  //   }
  // };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <Card component="fieldset" elevation={3} aria-busy={loading}>
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
                id="myEmail"
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
                id="myName"
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
            color="primary"
            size="large"
            variant="contained"
            fullWidth
          >
            Apply changes
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default UpdateUserInfo;
