import firebase from "firebase";
import "firebase/storage";
import "firebase/auth";

const devConfig = {
  apiKey: "AIzaSyDWGqjLJkBhT39s-jhY5dXKEuKJbveQqE8",
  authDomain: "react-share-app.firebaseapp.com",
  databaseURL: "https://react-share-app.firebaseio.com",
  projectId: "react-share-app",
  storageBucket: "react-share-app.appspot.com",
  messagingSenderId: "452844673937",
  appId: "1:452844673937:web:951e4b790c9d628b6b9830",
};

const prodConfig = {};

const config = process.env.NODE_ENV === "development" ? devConfig : prodConfig;

const appShare = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

const db = appShare.firestore();
const auth = appShare.auth();
const storage = appShare.storage();

export { db, auth, storage };

// import firebase from "firebase/app";
// import "firebase/auth";
// //firestore

// const devConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_ID,
// };

// const prodConfig = {};

// const config = process.env.NODE_ENV === "development" ? devConfig : prodConfig;

// class Firebase {
//   constructor() {
//     firebase.initializeApp(config);
//     this.firebaseAuth = firebase.auth();
//   }

//   // register registerWithEmailAndPassword
//   register(email, password) {
//     this.firebaseAuth.createUserWithEmailAndPassword(email, password);
//   }

//   // sign in/up with google GoogleAuthProvider
//   useGoogleProvider() {
//     const googleProvider = new firebase.auth.GoogleAuthProvider();
//     googleProvider.setCustomParameters({ prompt: "select_account" });
//     this.firebaseAuth.signInWithPopup(googleProvider);
//   }

//   // login  signInWithEmailAndPassword

//   // logout signOut

//   // forgot password sendPasswordResetEmail
// }

// export default new Firebase();
