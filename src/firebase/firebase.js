import firebase from 'firebase/app';
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCrcIIPROW6qy_oEy-Lou76rBhX09eCr2Q",
    authDomain: "symdet.firebaseapp.com",
    databaseURL: "https://symdet.firebaseio.com",
    projectId: "symdet",
    storageBucket: "symdet.appspot.com",
    messagingSenderId: "383381324144"
};

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

// const auth = firebase.auth();

// export {
//     auth,
// };