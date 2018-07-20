import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#8d6e63',
      main:'#26c6da'
    },
    secondary: {
      main: '#ff80ab',
    },
  },
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiCardContent: {
      // Name of the rule
      root: {
        padding: '10px !important'
      },
    },
    MuiCardHeader: {
      // Name of the rule
      root: {
        paddingBottom: '0px !important'
      },
    },
  },

});

export default theme;