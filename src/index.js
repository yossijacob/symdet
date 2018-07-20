import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider } from '@material-ui/core/styles';
import registerServiceWorker from './registerServiceWorker';
import theme from './theme'

// initFireBase();
// const ui = new firebaseui.auth.AuthUI(firebase.auth());
ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
