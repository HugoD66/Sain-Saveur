import "./App.css";
import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom";
import { router } from "./Router/router";

import React, { useState, useEffect } from "react";
import LoginPage from "./pages/security/LoginPage";
import { fetchRecipes, fetchRecipe } from "./calls/sqlite/recipe";
import { fetchUser, fetchUsers } from "./calls/sqlite/user";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  useEffect(() => {
    fetchRecipes()
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    //fetchRecipe(1)
    //  .then((data) => console.log(data))
    //  .catch((error) => console.error(error));

    fetchUsers()
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    //fetchUser(1)
    //  .then((data) => console.log(data))
    //  .catch((error) => console.error(error));
  }, []);

  return <RouterProvider router={router} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
