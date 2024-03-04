import React from 'react';
import searchIcon from '../assets/searchIcon.svg';

export const Searchbar = () => {
  return (
    <div className="searchbar">
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
