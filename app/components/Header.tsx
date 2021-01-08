/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  AppBar,
  Box,
  Button,
  NoSsr,
  Toolbar,
  Typography,
} from '@material-ui/core';
import type { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { useUser } from '~app/hooks';

import AccountMenu from './AccountMenu';
import ColorModeToggler from './ColorModeToggler';

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
    colorToggler: {
      fontWeight: 500,
    },
    menu: {
      '& > a': {
        marginLeft: theme.spacing(1),
      },
    },
  }),
);

const Header: FunctionComponent = () => {
  /** Authenticated user. */
  const me = useUser();
  /** User is authenticated */
  const hasAuthUser = Boolean(me);
  const classes = useStyles();

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
        <NoSsr>
          <Box alignItems="center" mr={2} className={classes.colorToggler}>
            <ColorModeToggler />
          </Box>
        </NoSsr>
        <div className={classes.menu}>
          <Button
            component="a"
            color="inherit"
            href="https://github.com/findawayer/chess-player"
            rel="external noopener noreferrer"
            target="_blank"
          >
            GitHub
          </Button>
          <AccountMenu hasAuthUser={hasAuthUser} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
