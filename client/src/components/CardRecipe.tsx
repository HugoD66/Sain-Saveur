import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { RecipeModel } from "../models/Recipe";

interface CardRecipeProps {
  key: number;
  recipe: RecipeModel;
}

export const CardRecipe: React.FC<CardRecipeProps> = ({ recipe }) => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  const imageUrl = `http://localhost:4700/${recipe.recipe_picture}`;

  return (
    <div data-aos="fade-up" className="card">
      <img src={imageUrl} alt="recette" className="picture-recipe-unit" />
      <div className="card-hidden">
        <p className="title-in">{recipe.recipe_name}</p>
        <button className="button">View Recipe</button>
      </div>
    </div>
  );
};
