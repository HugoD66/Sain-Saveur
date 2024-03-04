import React from 'react';
import Logo from '../logo.svg';

export const Header = () => {
  return (
    <div className="header">
      <div className="logoPannel">
        <img className="logo" src={Logo} alt="Logo" />
        <p className="logoName">Sain Saveur</p>
      </div>
      <div className="pagePannel">
        <p className="">Recette</p>
      </div>
      <div className="loginPannel">
        <button className="login">Connexion</button>
        <button className="register">Inscription</button>
      </div>
    </div>
  );
};
