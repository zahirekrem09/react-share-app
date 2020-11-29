import { useEffect, useState, useContext } from "react";
import "./App.css";

import { auth, db, storage } from "./firebase";
import { Router, Auth } from "./Router";

import AuthContextProvider, {
  firebaseAuthContext,
} from "./context/AuthContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auth connect
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);
  return (
    <AuthContextProvider>{user ? <Router /> : <Auth />}</AuthContextProvider>
  );
}

export default App;
