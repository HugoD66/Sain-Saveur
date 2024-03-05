import React, { useState } from "react";
import logo from "../logo.svg";

interface LoginPageProps {
  onRegisterClick: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onRegisterClick }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Appel au serveur pour vérifier les identifiants
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    console.log(data);
  };

  return (
    <div className="login-page">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="login-form">
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Pseudo :</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mot de passe :</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            Valider
          </button>
        </form>
        <p className="login-prompt">
          Si vous n'avez pas de compte{" "}
          <span className="login-link" onClick={onRegisterClick}>
            cliquez ici
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
