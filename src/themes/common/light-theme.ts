import indigo from '@material-ui/core/colors/indigo';
import { ThemeOptions } from '@material-ui/core/styles';

export const lightTheme: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: indigo[500],
      contrastText: '#fff',
    },
    secondary: {
      main: '#3f4fa6',
    },
    background: {
      default: '#edeff6',
      paper: '#fafafc',
    },
  },
};
