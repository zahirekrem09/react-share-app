import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const firebaseAuthContext = createContext();

const AuthContextProvider = ({ children, ...props }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // auth connect
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        setUser(authUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
  }, []);
  return (
    <firebaseAuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </firebaseAuthContext.Provider>
  );
};

export default AuthContextProvider;
