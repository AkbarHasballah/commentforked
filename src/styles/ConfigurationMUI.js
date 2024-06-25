import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#75A47F',
      dark: '#75A47F',
      contrastText: '#F6F8FD',
    },
    secondary: {
      main: '#7AB2B3',
    },
    blue: '#1F81B9',
    green: '#75A47F',
    semiblack: '#616161',
    softwhite: '#F6F8FD',
    softbrown: '#B99470',
  },
  typography: {
    fontFamily: 'Plus Jakarta Sans',
  },
  button: {
    color: {
      green: '#75A47F',
    },
  },
});

export default theme;
