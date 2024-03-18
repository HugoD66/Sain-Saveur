import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LoginPage from "./pages/security/LoginPage"; 
import RecipesPage from "./pages/Recipes"; 
import "./App.css";
import { fetchLocalRecipes as localesRecipes } from './calls/services/recipe';
import { fetchExternalRecipes as externRecipes } from './calls/services/recipe';
import { fetchUser, fetchUsers } from "./calls/services/user";
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    externRecipes()
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    // localesRecipes()
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));

    // fetchUsers()
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));

    // fetchUser(1)
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));
  }, []);

  return (
    <Router>
      <div className="App">
        <Link to="/recipes">Voir les Recettes</Link>
        <Routes>
          <Route path="/login" element={<LoginPage onRegisterClick={() => setIsSigningUp(false)} />} />
          <Route path="/register" element={<HomePage onLoginClick={() => setIsSigningUp(true)} />} />
          <Route path="/recipes" element={<RecipesPage />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;