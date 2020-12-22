import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export default makeStyles<Theme>(theme =>
  createStyles({
    root: {
      padding: theme.spacing(2, 3),
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      lineHeight: 1.8,
      fontSize: theme.typography.h6.fontSize,
      cursor: 'default',
      userSelect: 'none',
    },
    score: {
      width: '2em',
    },
    timer: {
      width: '4em',
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.dark,
      textAlign: 'center',
    },
  }),
);
