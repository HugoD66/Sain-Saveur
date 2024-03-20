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
  // @ts-ignore
  const firstType = recipe.recipe_types?.[0]?.type_name || "Type non spécifié";

  const truncateDescription = (description: string, maxLength: number) => {
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };
  const truncatedDescription = truncateDescription(
    recipe.recipe_description || "",
    50,
  );

  return (
    <div data-aos="fade-up" className="card">
      <img src={imageUrl} alt="recette" className="picture-recipe-unit" />
      <div className="content-card">
        <p className="title-in">{recipe.recipe_name}</p>
        <div className="card-hidden">
          <p className="description">{truncatedDescription}</p>
          <p className="footer-card"> {firstType} </p>
        </div>
      </div>
    </div>
  );
};
