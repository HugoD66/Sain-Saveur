import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../pages/security/LoginPage';
import HomePage from '../pages/HomePage';
import Register from '../pages/security/Register';
import Logout from '../components/Logout';

const isAuthenticated = () => !!localStorage.getItem('token');

export const router = createBrowserRouter([
  {
    path: '/',
    element: isAuthenticated() ? <HomePage /> : <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: !isAuthenticated() ? <LoginPage /> : <Navigate to="/" />,
  },
  {
    path: '/register',
    element: !isAuthenticated() ? <Register /> : <Navigate to="/" />,
  },

  {
    path: '/logout',
    element: <Logout />,
  },
]);
