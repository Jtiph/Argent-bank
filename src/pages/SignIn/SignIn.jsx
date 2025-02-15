import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { fetchUserProfile } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import "./SignIn.scss";
import { FaUserCircle } from "react-icons/fa";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Case "Remember me"
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(loginSuccess({ token: data.body.token, rememberMe })); // Stockage géré dans Redux
        dispatch(fetchUserProfile(data.body.token));
        navigate("/profile"); // Redirection après connexion
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <FaUserCircle className="sign-in-icon" />
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)} // Gère "Remember me"
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
        {auth.isAuthenticated && (
          <p className="success-message">You are logged in!</p>
        )}
      </section>
    </main>
  );
};

export default SignIn;
