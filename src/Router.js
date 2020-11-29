import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/Singup";
import SingIn from "./pages/Singin";
import UserDetail from "./pages/UserDetail";

import Home from "./pages/Home";
import { useState } from "react";
import Navbar from "./components/Navbar";

const Auth = () => {
  const [auth, setAuth] = useState("LOGIN");
  const changeToLogin = () => setAuth("LOGIN");
  const changeToSignup = () => setAuth("SIGNUP");
  return (
    <div>
      {auth === "LOGIN" ? (
        <SingIn setAuth={changeToSignup} />
      ) : (
        <SignUp setAuth={changeToLogin} />
      )}
    </div>
  );
};

//exact

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/user/:id" component={UserDetail} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export { Router, Auth };
