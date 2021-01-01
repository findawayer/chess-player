import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import React from 'react';

import SignoutButton from '~/features/account/components/SignoutButton';
import { useUser } from '~/hooks';

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    title: {
      flexGrow: 1,
      fontSize: '1.5rem',
      lineHeight: 1.6,
    },
    titleLink: {
      color: 'inherit',
      textDecoration: 'none',
    },
    colorModeToggler: {
      marginRight: theme.spacing(2),
      fontWeight: 500,
    },
    menu: {
      '& > a': {
        marginLeft: theme.spacing(1),
      },
    },
  }),
);

const Header: React.FC = () => {
  /** Current authenticated user. */
  const me = useUser();
  /** CSS Classes via Material UI */
  const classes = useStyles();

  const renderNavigation = () =>
    me ? (
      // Logged in user
      <>
        <Link href="/account" passHref>
          <Button color="inherit">Account</Button>
        </Link>
        <SignoutButton />
      </>
    ) : (
      // Anon
      <>
        <Link href="/join" passHref>
          <Button color="inherit">Join</Button>
        </Link>
        <Link href="/login" passHref>
          <Button color="inherit">Login</Button>
        </Link>
      </>
    );

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <Typography
          variant="h1"
          component="div"
          noWrap
          className={classes.title}
        >
          <Link href="/">
            <a className={classes.titleLink} rel="home">
              chess-player
            </a>
          </Link>
        </Typography>
        {/* <NoSsr>
          <Box
            component="label"
            alignItems="center"
            className={classes.colorModeToggler}
          >
            <ColorModeToggler
              isDarkMode={colorMode === 'DARK'}
              toggleColorMode={toggleColorMode}
            />
          </Box>
        </NoSsr> */}
        <div className={classes.menu}>
          <Button
            component="a"
            color="inherit"
            href="https://github.com/findawayer/chess-player"
            rel="external noopener noreferrer"
          >
            GitHub
          </Button>
          {renderNavigation()}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
