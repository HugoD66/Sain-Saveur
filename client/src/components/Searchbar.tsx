import React, { useEffect, useState } from "react";
import searchIcon from "../assets/searchIcon.svg";
import ingredient from "../assets/ingredient.png";
import recipe from "../assets/recipe.png";
import type from "../assets/type.png";
import { useNavigate } from "react-router";
export const Searchbar = () => {
  const navigate = useNavigate();

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
    }, 500);

    return () => clearTimeout(timerId);
  }, [query]);

  const renderItem = (item: any) => {
    const navigateToDetail = (type: string, id: string) => {
      console.log(type, id);
      navigate(`/${type}/${id}`);
    };

    switch (item.type) {
      case "ingredient":
        return (
          <div
            className="responseInputUnit"
            onClick={() => navigateToDetail("ingredients", item._id)}
          >
            <img src={ingredient} alt="ing" />
            <p>{item.ingredient_name}</p>
          </div>
        );
      case "recipe":
        return (
          <div
            className="responseInputUnit"
            onClick={() => navigateToDetail("recipes", item._id)}
          >
            <img src={recipe} alt="recipe" />
            <p>{item.recipe_name}</p>
          </div>
        );
      case "type":
        return (
          <div
            className="responseInputUnit"
            onClick={() => navigateToDetail("types", item._id)}
          >
            <img src={type} alt="type" />
            <p>{item.type_name}</p>
          </div>
        );
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
