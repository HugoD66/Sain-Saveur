import React, { useState, FC } from "react";
import logo from "../logo.svg";

interface RegisterPageProps {
  onLoginClick: () => void;
}

const RegisterPage: FC<RegisterPageProps> = ({ onLoginClick }) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // intégrer la logique pour envoyer ces données à votre serveur
    console.log({ email, username, password });
  };

  return (
    <div className="register-page">
      <div className="register-form">
        <h2>Créer un compte</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="username">Pseudo</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            S'inscrire
          </button>
        </form>
        <p className="login-prompt">
          Si vous avez déjà un compte,{" "}
          <span className="login-link" onClick={onLoginClick}>
            cliquez ici
          </span>{" "}
          pour vous connecter.
        </p>
      </div>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
};

export default RegisterPage;
