import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Register";
import "./App.css";

const App: React.FC = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  useEffect(() => {
    console.log("Début useEffect fetch recettes");
    fetch("/api/recettes")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="App">
      {isSigningUp ? (
        <LoginPage onRegisterClick={() => setIsSigningUp(false)} />
      ) : (
        <RegisterPage onLoginClick={() => setIsSigningUp(true)} />
      )}
    </div>
  );
};

export default App;
