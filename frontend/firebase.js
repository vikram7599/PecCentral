var firebase = require('firebase');

const config = {
  apiKey: "AIzaSyA7S_tbKYkeB3kTFp2xlm174CDK_zlPNEc",
  authDomain: "peccentral-2204f.firebaseapp.com",
  databaseURL: "https://peccentral-2204f.firebaseio.com",
  projectId: "peccentral-2204f",
  storageBucket: "peccentral-2204f.appspot.com",
  messagingSenderId: "701393967707",
  appId: "1:701393967707:web:ab54a758aa5a9c932afd7e",
  measurementId: "G-T834WTYYBX"
};
firebase.initializeApp(config)
var storage = firebase.storage();

export const auth = firebase.auth();
export { firebase, storage as default };