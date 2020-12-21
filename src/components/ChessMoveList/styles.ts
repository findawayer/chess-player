import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

export default makeStyles<Theme>(theme => {
  const scrollbarColor = theme.palette.type === 'dark' ? '#fff' : '#000';

  return createStyles({
    root: {
      display: 'block',
      maxHeight: 500,
      marginTop: 20,
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: 15,
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: fade(scrollbarColor, 0.05),
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: fade(scrollbarColor, 0.3),
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: fade(scrollbarColor, 0.4),
      },
    },
    fullmove: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      display: 'flex',
      alignItems: 'center',
      // Highlight the latest move.
      // last child is the scroller x(
      '&:nth-last-child(2) span:last-child': {
        backgroundColor: fade('#fc0', 0.4),
      },
    },
    count: {
      width: 50,
      paddingRight: '1em',
      color: fade(theme.palette.text.secondary, 0.6),
      fontSize: '92%',
      textAlign: 'right',
    },
    halfmove: {
      display: 'block',
      width: 'calc(50% - 25px)',
      color: 'inherit',
      padding: theme.spacing(0, 2),
      boxSizing: 'border-box',
      textAlign: 'left',
      textTransform: 'none',
    },
  });
});
