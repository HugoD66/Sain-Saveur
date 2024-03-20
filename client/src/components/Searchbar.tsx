import React, { useEffect, useState } from "react";
import searchIcon from "../assets/searchIcon.svg";

export const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fetchSearchResults = async (searchQuery: string | any[]) => {
    if (searchQuery.length >= 3) {
      try {
        const response = await fetch(
          `http://localhost:4700/api/search?query=${searchQuery}`,
        );
        const data = await response.json();
        console.log(data);
        setResults(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des résultats de recherche",
          error,
        );
      }
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchSearchResults(query);
    }, 500); // Délai de 500 ms

    return () => clearTimeout(timerId);
  }, [query]);

  const renderItem = (item: any) => {
    switch (item.type) {
      case "ingredient":
        return;
        <div>
          <li key={item._id}>{item.ingredient_name}</li>;
        </div>;
      case "recipe":
        return <li key={item._id}>{item.recipe_name}</li>;
      case "type":
        return <li key={item._id}>{item.type_name}</li>;
      default:
        return null;
    }
  };

  return (
    <div className="search">
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="response">
        {results.length > 0 && (
          <div className="search-results">{results.map(renderItem)}</div>
        )}
      </div>
    </div>
  );
};
