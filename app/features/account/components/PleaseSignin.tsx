import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import type { FunctionComponent, MouseEvent } from 'react';

interface RouteLinkProps {
  href: string;
  text: string;
  handler?(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void;
}

const RouteLink: FunctionComponent<RouteLinkProps> = ({
  href,
  text,
  handler,
}) =>
  handler ? (
    <Button variant="contained" color="primary" size="large" onClick={handler}>
      {text}
    </Button>
  ) : (
    <Link href={href} passHref>
      <Button variant="contained" color="primary" size="large">
        {text}
      </Button>
    </Link>
  );

interface PleaseSigninProps {
  signupHandler?(): void;
  signinHandler?(): void;
}

const PleaseSignin: FunctionComponent<PleaseSigninProps> = ({
  signinHandler,
  signupHandler,
}) => (
  <Card>
    <CardContent>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Please sign in before continuing.
      </Typography>
    </CardContent>
    <CardActions>
      <RouteLink
        href="/get-started"
        text="Get started"
        handler={signupHandler}
      />
      <RouteLink href="/signin" text="Sign in" handler={signinHandler} />
    </CardActions>
  </Card>
);

export default PleaseSignin;
