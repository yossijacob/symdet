import React, { Component } from 'react'
import firebase from 'firebase'
import firebaseui from 'firebaseui'


var uiConfig = {
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>'
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());

class FireBaseAuthUI extends Component {
  componentDidMount() {
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  componentWillUnmount() {
    console.log('unmount');
    // ui.reset();
  }

  render() {
    const { fullScreen } = this.props;
    return (
      <div id="firebaseui-auth-container"></div>
    )
  }
}


export default FireBaseAuthUI;