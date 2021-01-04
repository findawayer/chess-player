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
  palette: {
    error: {
      main: '#b8372e',
    },
  },
  shape: {
    borderRadius: 0,
  },
  overrides: {
    // Override global CSS in built-in <CSSBaseline /> component.
    MuiCssBaseline: {
      '@global': {
        'html, body, #__next': {
          height: '100%',
        },
        body: {
          overflow: 'hidden',
        },
        a: {
          color: 'inherit',
          '&:hover': {
            textDecoration: 'none',
          },
        },
        fieldset: {
          border: 0,
        },
        '::selection': {
          color: '#fff',
          backgroundColor: '#303f9f',
        },
        '#nprogress .bar': {
          height: 3,
          zIndex: 1600, // Above any Mui component.
        },
        '#nprogress .spinner': {
          display: 'none',
        },
      },
    },
    MuiCard: {
      root: {
        padding: 24,
      },
    },
    MuiCardActions: {
      root: {
        padding: '8px 16px 16px', // Align horizontal edges with body.
        justifyContent: 'center',
      },
    },
    MuiDialogActions: {
      root: {
        padding: '16px 24px', // Align horizontal edges with body.
      },
    },
    MuiDialogContent: {
      root: {
        padding: '8px 24px',
      },
    },
    MuiDialogTitle: {
      root: {
        padding: '24px',
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '1rem',
      },
    },
  },
};
