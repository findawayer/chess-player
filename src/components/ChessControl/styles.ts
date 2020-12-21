import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>(theme =>
  createStyles({
    root: {
      padding: theme.spacing(0, 4),
    },
    button: {
      fontSize: '2rem',
    },
  }),
);
