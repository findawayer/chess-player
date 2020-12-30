import Link from 'next/link';
import React from 'react';
import { Button } from '@material-ui/core';

const NotFound: React.FC = () => (
  <div style={{ marginTop: '5em', textAlign: 'center' }}>
    <h1>Woopsie! Page not found.</h1>
    <p>Let&apos;s find a better place for you to go...</p>
    <p>
      <Link href="/">
        <Button color="primary" component="a" rel="home" variant="contained">
          Go back to home
        </Button>
      </Link>
    </p>
  </div>
);

export default NotFound;
