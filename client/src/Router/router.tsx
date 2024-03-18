import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/security/LoginPage";
import HomePage from "../pages/HomePage";
import Register from "../pages/security/Register";
import Logout from "../components/Logout";
import AddRecipe from "../pages/recipes/AddRecipe";

const isAuthenticated = (): boolean => {
  if (localStorage.getItem("token")) {
    return isAuthenticated();
  } else {
    return !isAuthenticated();
  }
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated() ? <HomePage /> : <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/add-recipe",
    element: <AddRecipe />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);
