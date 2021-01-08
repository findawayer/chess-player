import { Box, Button, Typography } from '@material-ui/core';
import Link from 'next/link';

import Layout from '~app/components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <Box mt={5} textAlign="center">
        <Typography variant="h2">Woopsie! Layout not found.</Typography>
        <p>Let&apos;s find a better place for you to go...</p>
        <Box mt={3}>
          <Link href="/">
            <Button
              color="primary"
              component="a"
              rel="home"
              variant="contained"
            >
              Go back to home
            </Button>
          </Link>
        </Box>
      </Box>
    </Layout>
  );
}
