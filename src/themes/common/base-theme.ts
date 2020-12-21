import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const baseTheme: ThemeOptions = {
  typography: {
    htmlFontSize: 16,
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 16,
    h1: {
      fontSize: '3rem',
      fontWeight: 400,
    },
    h2: {
      fontSize: '2.2rem',
      fontWeight: 400,
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 400,
    },
    h4: {
      fontSize: '1.6rem',
      fontWeight: 400,
    },
    h5: {
      fontSize: '1.4rem',
      fontWeight: 400,
    },
    h6: {
      fontSize: '1.2rem',
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 0,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        'html, body, #app': {
          height: '100%',
          overflow: 'hidden',
        },
        a: {
          color: 'inherit',
        },
        '::selection': {
          color: '#fff',
          backgroundColor: '#303f9f',
        },
      },
    },
    MuiButton: {
      root: {
        transition: 'none',
      },
    },
    MuiInputLabel: {
      root: {
        marginBottom: 5,
        fontSize: '1.2rem',
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '1em',
      },
    },
  },
  chessSquare: {
    light: '#fff',
    dark: '#97b2ce',
    highlight: '#ffff32',
    hover: '#fff',
  },
};
