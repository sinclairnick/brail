import { createPalette, createTheme } from '@brail/react';

const palette = createPalette({
  primary: {
    light: '#E5F5ED',
    main: '#019C53',
    dark: '#12472B',
  },
});

const serif = 'Georgia, Times,Times New Roman,serif';

createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Lato, Arial',
    },
    h1: {
      color: palette.primary.dark,
      fontFamily: serif,
      lineHeight: '42px',
    },
    h3: {
      color: palette.grey[800],
    },
    a: {
      color: palette.info.main,
    },
  },
  palette,
});
