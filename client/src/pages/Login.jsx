import { login } from "../store/authSlice";
import { useLoginMutation } from "../store/authApi";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import "../styles/Login.css";

export default function Login() {
  const userRef = useRef();
  const errRef = useRef();
  useEffect(() => {
    userRef.current.focus();
  }, []);
  const [errMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errMessage) {
      errRef.current.focus();
    }
  }, [errMessage]);

  const [loginUser, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      // 1. Call API
      const response = await loginUser(user).unwrap();

      // 2. Store token + user in Redux
      dispatch(login(response));

      // 3. Navigate
      navigate("/");
    } catch (err) {
      setErrorMessage(err.data.message);
      console.log(err);

      alert("Invalid credentials");

      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p className={errMessage?"message-display":"message-hidden"} ref={errRef} tabIndex="-1" aria-live="assertive">
         {errMessage}
        </p>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          ref={userRef}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <Link className="login-register" to="/register">
          Register
        </Link>
      </form>
    </div>
  );
}
