import Link from 'next/link';
import React from 'react';
import {
  AppBar,
  Box,
  Button,
  NoSsr,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import ColorModeToggler from './ColorModeToggler';
import Navigation from './Navigation';
import { ColorMode } from '../hooks';

interface HeaderProps {
  colorMode: ColorMode;
  toggleColorMode(): void;
}

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

const Header: React.FC<HeaderProps> = ({ colorMode, toggleColorMode }) => {
  /* CSS classes via Material UI */
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
          <Box
            component="label"
            alignItems="center"
            className={classes.colorModeToggler}
          >
            <ColorModeToggler
              isDarkMode={colorMode === 'dark'}
              toggleColorMode={toggleColorMode}
            />
          </Box>
        </NoSsr>
        <div className={classes.menu}>
          <Button
            component="a"
            color="inherit"
            href="https://github.com/findawayer/chess-player"
            rel="external noopener noreferrer"
          >
            GitHub
          </Button>
          <Navigation />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
