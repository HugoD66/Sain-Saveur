import React from 'react';
import searchIcon from '../assets/searchIcon.svg';

export const Searchbar = () => {
  return (
    <div className="searchbar">
      <h1 className="titleSearchbar">
        Découvrez les meilleures recettes healthy !
      </h1>
      <div className="inputForm">
        <img className="searchIcon" src={searchIcon} alt="searchIcon" />
        <input
          className="inputBar"
          type="text"
          placeholder="Votre ingrédient/recette"
        />
        <button className="searchButton">Rechercher</button>
      </div>
    </div>
  );
};
