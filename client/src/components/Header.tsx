import React from "react";
import Logo from "../logo.svg";
import searchIcon from "../assets/searchIcon.svg";
//import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="header">
      <div className="logoPannel">
        <img className="logo" src={Logo} alt="Logo" />
        <p className="logoName">Sain Saveur</p>
      </div>
      <div className="pagePannel"></div>
      <div className="inputForm">
        <img className="searchIcon" src={searchIcon} alt="searchIcon" />
        <input
          className="inputBar"
          type="text"
          placeholder="Recherche un ingrédient ou d'une recette"
        />
      </div>
      <div className="loginPannel">
        <button className="login">Connexion</button>
        <button className="register">Inscription</button>
      </div>
    </div>
  );
};
/*
 <Link to="/add-button">
          <button className="add-recipe">TEMP ADD RECIPE</button>
        </Link>
 */
