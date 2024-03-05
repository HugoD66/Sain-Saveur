import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Register";
import "./App.css";
import { fetchRecipes, fetchRecipe } from "./calls/sqlite/recipe";
import { fetchUser, fetchUsers } from "./calls/sqlite/user";

const App: React.FC = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    fetchRecipes()
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    fetchRecipe(1)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    fetchUsers()
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    fetchUser(1)
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
