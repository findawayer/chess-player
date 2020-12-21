import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export default makeStyles<Theme>(theme =>
  createStyles({
    title: {
      padding: theme.spacing(3, 4, 2),
    },
    content: {
      padding: theme.spacing(2, 4, 4),
    },
    formControl: {
      width: 100,
      textAlign: 'right',
    },
    select: {
      textAlign: 'left',
      textTransform: 'capitalize',
    },
    selectOption: {
      textTransform: 'capitalize',
    },
  }),
);
