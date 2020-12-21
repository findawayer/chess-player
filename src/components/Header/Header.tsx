import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FlareIcon from '@material-ui/icons/Flare';
import GitHubIcon from '@material-ui/icons/GitHub';

import { ColorMode } from '@types';
import useStyles from './styles';

interface HeaderProps {
  colorMode: ColorMode;
  toggleColorMode(): void;
}

export const Header: React.FC<HeaderProps> = ({
  colorMode,
  toggleColorMode,
}) => {
  /* CSS classes via Material UI */
  const classes = useStyles();
  /** The color mode is dark mode. */
  const isDarkMode = colorMode === ColorMode.Dark;
  /** The opposite color mode name. */
  const oppositeColor = isDarkMode ? 'light' : 'dark';

  return (
    <AppBar
      position="static"
      color="default"
      elevation={2}
      className={classes.root}
    >
      <Toolbar>
        <Typography variant="h1" noWrap className={classes.title}>
          <Tooltip title="Home">
            <Link to="/" className={classes.titleLink}>
              chessplayer
            </Link>
          </Tooltip>
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
