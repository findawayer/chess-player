import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>(theme =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      flexGrow: 1,
      fontSize: '1.5rem',
      lineHeight: 1.6,
    },
    titleLink: {
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.text.secondary,
      },
    },
    colorControl: {
      display: 'none',
      marginLeft: 10,
      marginRight: 15,
      fontSize: '1rem',
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    mobileColorControl: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);
