import React, { useCallback, useState } from "react";

import "./Login.style.css";
import { useAuth } from "../../contexts/AuthContext";
import PrimaryButton from "../../components/PrimaryButton";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      // TODO: send email id, password
      if (!email || !email.trim()) {
        alert("Please enter a valid email.");
        return;
      }
  
      if (!password || password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
      }
  
      login(email.trim(), password);
    },
    [login,email,password]
  );

  const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  return (
    <div>
      <h2 className="primary-header">Welcome to To-do app</h2>
      <div className="form-container">
        <input className="login-input" type="text" placeholder="email ID" value={email} onChange={handleEmailChange} />
        <input
          className="login-input"
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <PrimaryButton label="Sign in to continue" onClick={handleLogin} />
      </div>
    </div>
  );
};

export default React.memo(Login);
