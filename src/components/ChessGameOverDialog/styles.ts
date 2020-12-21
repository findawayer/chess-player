import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export default makeStyles<Theme>(theme =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    header: {
      padding: theme.spacing(4, 4, 2),
    },
    title: {
      marginBottom: theme.spacing(1),
      textTransform: 'capitalize',
    },
    description: {
      margin: 0,
    },
    content: {
      minWidth: 300,
      padding: theme.spacing(2, 4, 4),
      textAlign: 'center',
    },
  }),
);
