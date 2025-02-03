import React from "react";
import LoginForm from "../../components/loginForm/LoginForm";
import { FaUserCircle } from "react-icons/fa";
import "./SignIn.scss";

const SignIn = () => {
  return (
    <main className="main bg-dark">
      <LoginForm />
    </main>
  );
};

export default SignIn;
