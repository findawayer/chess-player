import Link from 'next/link';
import React from 'react';
import {
  AppBar,
  Grid,
  IconButton,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Flare as FlareIcon, GitHub as GitHubIcon } from '@material-ui/icons';

import { ColorMode } from '~/types';
import useStyles from './styles';

interface HeaderProps {
  colorMode: ColorMode;
  toggleColorMode(): void;
}

const Header: React.FC<HeaderProps> = ({ colorMode, toggleColorMode }) => {
  /* CSS classes via Material UI */
  const classes = useStyles();
  /** The color mode is dark mode. */
  const isDarkMode = colorMode === 'dark';
  /** The opposite color mode name. */
  const oppositeColor = isDarkMode ? 'light' : 'dark';

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
              chessplayer
            </a>
          </Link>
        </Typography>
        <Typography component="div" noWrap className={classes.colorControl}>
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Light</Grid>
            <Grid item>
              <Tooltip title="Toggle theme">
                <Switch
                  checked={isDarkMode}
                  color="default"
                  onChange={toggleColorMode}
                />
              </Tooltip>
            </Grid>
            <Grid item>Dark</Grid>
          </Grid>
        </Typography>
        <div className={classes.mobileColorControl}>
          <Tooltip title={`Use ${oppositeColor} mode`}>
            <IconButton
              aria-label={`Use ${oppositeColor} mode`}
              color="inherit"
              onClick={toggleColorMode}
            >
              <FlareIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Tooltip title="Github repository">
          <IconButton
            aria-label="GitHub repository"
            color="inherit"
            component="a"
            edge="end"
            href="https://github.com/findawayer/chessplayer"
            rel="external noopener noreferrer"
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
