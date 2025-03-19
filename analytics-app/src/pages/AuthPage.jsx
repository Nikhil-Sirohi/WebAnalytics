import React from "react";
import { useLocation } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";

function AuthPage() {
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get("mode");

  return <>{mode === "login" ? <Login /> : <Signup />}</>;
}

export default AuthPage;
