import { createTheme } from '@mui/material/styles';

import "@fontsource-variable/inter";
import "@fontsource-variable/roboto";
import "@fontsource-variable/sora";


export const theme = createTheme({
  typography: {
    fontFamily: [
      '"Sora Variable"',
      '"Inter Variable"',
      '"Roboto Variable"',
      'system-ui',
      'Helvetica',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
}); 