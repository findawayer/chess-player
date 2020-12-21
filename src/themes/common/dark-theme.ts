import { ThemeOptions } from '@material-ui/core/styles';

export const darkTheme: ThemeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#3f4fa6',
    },
    secondary: {
      main: '#ebca47',
    },
    background: {
      default: '#282C34',
      paper: '#1c2025',
    },
    text: {
      primary: '#ddd',
      secondary: '#aaa',
      disabled: '#999',
      hint: '#999',
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: '#aaa',
        },
      },
    },
  },
};
