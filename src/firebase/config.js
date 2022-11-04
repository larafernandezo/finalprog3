import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDPgkPZuV5RhBSI7u_oFMlRH3es895rxlU",
    authDomain: "finalprog3-bb705.firebaseapp.com",
    projectId: "finalprog3-bb705",
    storageBucket: "finalprog3-bb705.appspot.com",
    messagingSenderId: "894733539643",
    appId: "1:894733539643:web:6ef31fb78c2644aa783f1e"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();