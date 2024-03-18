import React, { useState } from "react";
import logo from "../../logo.svg";
import { validateForm } from "./check-methods/validateLoginForm";

interface LoginPageProps {
  onRegisterClick: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onRegisterClick }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm(username, password, setError)) {
      return;
    }
    try {
      const response = await fetch("http://localhost:4700/api/security/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      console.log("loginUser");
      console.log(response);
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("Connexion réussie. Token stocké.");
        console.log("Token:", data.token);
        //TODO: Redirection page ?
      } else if (data.error) {
        setError(data.error);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setError("Une erreur est survenue lors de la tentative de connexion.");
    }
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
