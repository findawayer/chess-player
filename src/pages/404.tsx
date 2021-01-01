import { Box, Button, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

const NotFound: React.FC = () => (
  <Box mt={5} textAlign="center">
    <Typography variant="h2">Woopsie! Page not found.</Typography>
    <p>Let&apos;s find a better place for you to go...</p>
    <Box mt={3}>
      <Link href="/">
        <Button color="primary" component="a" rel="home" variant="contained">
          Go back to home
        </Button>
      </Link>
    </Box>
  </Box>
);

export default NotFound;
