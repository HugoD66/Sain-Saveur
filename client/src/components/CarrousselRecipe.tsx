import React from "react";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { CardRecipe } from "./CardRecipe";
import { RecipeModel } from "../models/Recipe";

interface CarrousselRecipeProps {
  recipes: RecipeModel[];
}

export const CarrousselRecipe: React.FC<CarrousselRecipeProps> = ({
  recipes,
}) => {
  return (
    <div className="carrousselRecipe">
      <ScrollingCarousel>
        {recipes.map((recipe, index) => (
          <CardRecipe key={index} recipe={recipe} />
        ))}
      </ScrollingCarousel>
    </div>
  );
};
