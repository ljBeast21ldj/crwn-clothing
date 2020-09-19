import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDIawohLDU9BRxo_hrfOx7mKCkqDu_JsjA",
    authDomain: "crwn-db-5b680.firebaseapp.com",
    databaseURL: "https://crwn-db-5b680.firebaseio.com",
    projectId: "crwn-db-5b680",
    storageBucket: "crwn-db-5b680.appspot.com",
    messagingSenderId: "359495412066",
    appId: "1:359495412066:web:4d6090a75d7f8245f4243b",
    measurementId: "G-XSC7NY87K5"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;