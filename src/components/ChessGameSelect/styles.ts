import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4, 6),
      textAlign: 'center',
      boxShadow: theme.shadows[2],
      transition: `box-shadow ${theme.transitions.duration.shortest} ${theme.transitions.easing.easeOut}`,
      '&:hover': {
        boxShadow: theme.shadows[8],
      },
    },
    header: {
      marginBottom: theme.spacing(4),
    },
    title: {
      marginBottom: theme.spacing(3),
      fontSize: theme.typography.h3.fontSize,
    },
    formRow: {
      display: 'block',
      marginBottom: theme.spacing(3),
    },
    formLabel: {
      color: theme.palette.text.secondary,
      fontSize: theme.typography.body1.fontSize,
    },
    formRadioGroup: {
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);
