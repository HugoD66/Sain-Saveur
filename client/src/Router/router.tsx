import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/security/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import Register from "../pages/security/RegisterPage";
import Logout from "../components/Logout";
import AddRecipe from "../pages/recipes/AddRecipe";

const isAuthenticated = (): boolean => {
  return localStorage.getItem("token") !== null;
};

export const router = createBrowserRouter([
  {
    path: "/homePage",
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
  {
    path: "/",
    element: isAuthenticated() ? <HomePage /> : <Navigate to="/login" />,
  },
]);
