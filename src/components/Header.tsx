/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  AppBar,
  Box,
  Button,
  NoSsr,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ColorMode } from '@prisma/client';
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

interface HeaderProps {
  hasAuthUser: boolean;
  colorMode: ColorMode;
  updateColorMode(colorMode: ColorMode): void;
}

const Header: React.FC<HeaderProps> = ({ colorMode, updateColorMode }) => {
  const me = useUser();
  /** CSS Classes via Material UI */
  const classes = useStyles();

  /** Render account menu based on authentication state. */
  const renderAccountMenu = () =>
    me ? (
      <>
        <Link href="/account" passHref>
          <Button color="inherit">Account</Button>
        </Link>
        <SignoutButton />
      </>
    ) : (
      <>
        <Link href="/join" passHref>
          <Button color="inherit">Join</Button>
        </Link>
        <Link href="/login" passHref>
          <Button color="inherit">Login</Button>
        </Link>
      </>
    );
  /** Toggle color mode */
  const toggleColorMode = () =>
    updateColorMode(colorMode === 'DARK' ? 'LIGHT' : 'DARK');

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
          <Box alignItems="center" className={classes.colorModeToggler}>
            <label htmlFor="colorModeToggler">
              <span>Light</span>
              <Tooltip title="Toggle theme">
                <Switch
                  id="colorModeTogler"
                  checked={colorMode === 'DARK'}
                  color="default"
                  onChange={toggleColorMode}
                />
              </Tooltip>
              <span>Dark</span>
            </label>
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
          {renderAccountMenu()}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
