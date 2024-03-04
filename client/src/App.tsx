import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register';
import HomePage from './pages/HomePage';
import './App.css';

const App: React.FC = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  return (
    <div className="App">
      {isSigningUp ? (
        <LoginPage onRegisterClick={() => setIsSigningUp(false)} />
      ) : (
        <HomePage onLoginClick={() => setIsSigningUp(true)} />
      )}
    </div>
  );
};

export default App;
