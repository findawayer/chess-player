import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles<Theme>(theme =>
  createStyles({
    root: {
      marginTop: theme.spacing(10),
      textAlign: 'center',
    },
  }),
);
