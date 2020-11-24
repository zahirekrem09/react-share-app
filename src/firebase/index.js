import firebase from "firebase";
import "firebase/storage";

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

//   class Firebase {
//       constructor() {
// firebase.initializeApp(config);
//       }
//   }
//   export default new Firebase

const db = appShare.firestore();
const auth = appShare.auth();
const storage = appShare.storage();

export { db, auth, storage };
