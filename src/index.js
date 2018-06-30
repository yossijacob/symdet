import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// initFireBase();
// const ui = new firebaseui.auth.AuthUI(firebase.auth());
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
