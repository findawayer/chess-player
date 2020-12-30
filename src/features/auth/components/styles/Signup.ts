import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>(theme =>
  createStyles({
    title: {
      marginBottom: theme.spacing(2),
      textAlign: 'center',
    },
    formRow: {
      marginBottom: theme.spacing(2),
    },
  }),
);
