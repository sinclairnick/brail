import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily:
        'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    h1: {
      fontSize: '48px',
    },
    h2: {
      fontSize: '32px',
    },
    h3: {
      fontSize: '28px',
    },
    h4: {
      fontSize: '24px',
    },
    h5: {
      fontSize: '22px',
    },
    h6: {
      fontSize: '20px',
    },
    body1: {
      fontSize: '14px',
    },
    body2: {
      fontSize: '12px',
    },
  },
  palette: {
    grey: {
      '50': '#F2F3F4',
      '100': '#D8D9DC',
      '200': '#C5C7CB',
      '300': '#AAAEB3',
      '400': '#999EA4',
      '500': '#80868D',
      '600': '#747A80',
      '700': '#5B5F64',
      '800': '#464A4E',
      '900': '#36383B',
    },
  },
  components: {
    MuiToggleButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          transition: '0.08s ease-out',
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 4,
          paddingBottom: 4,
          textTransform: 'none',
          fontWeight: 'bold',
          borderRadius: 8,
          fontSize: '12px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          transition: '0.05s',
        },
      },
    },
    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
      },
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          transition: '0.08s ease-out',
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 8,
          paddingBottom: 8,
          textTransform: 'none',
          fontWeight: 'bold',
          borderRadius: 8,
        },
      },
    },
  },
});
