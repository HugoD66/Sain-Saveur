import './App.css';
import { RouterProvider } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import { router } from './Router/router';
import * as ReactDOM from 'react-dom/client';

import React, { useEffect } from 'react';
import { fetchRecipes, fetchRecipe } from './calls/sqlite/recipe';
import { fetchUser, fetchUsers } from './calls/sqlite/user';

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

  if (localStorage.getItem("token")) {
    console.log("coucou");
    console.log(localStorage.getItem("token"));
  } else {
    console.log("azea");
  }
  return <RouterProvider router={router} />;
};

export default App;
