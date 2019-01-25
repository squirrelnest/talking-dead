import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyBHZlURzUqnuFC_v4jvLC5W0AjkPMNwwTk",
  authDomain: "talking-dead.firebaseapp.com",
  databaseURL: "https://talking-dead.firebaseio.com",
  projectId: "talking-dead",
  storageBucket: "talking-dead.appspot.com",
  messagingSenderId: "344960091762"
};

firebase.initializeApp(config);

export const firebaseAuthProvider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();

export default firebase;
