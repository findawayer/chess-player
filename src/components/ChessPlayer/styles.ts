import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export default makeStyles<Theme>(theme =>
  createStyles({
    root: {
      padding: '12px 20px',
      backgroundColor: theme.palette.background.paper,
      cursor: 'default',
      userSelect: 'none',
    },
    player: {
      display: 'flex',
      alignItems: 'center',
    },
    score: {
      width: '2em',
      marginRight: 10,
      color: theme.palette.text.secondary,
    },
    name: {
      flexGrow: 1,
      fontStyle: 'italic',
    },
    timer: {
      width: '4em',
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.default,
      lineHeight: '1.8em',
      textAlign: 'center',
    },
  }),
);
