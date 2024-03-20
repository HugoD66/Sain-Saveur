import React from "react";
import TitleCategory from "./TitleCategory";
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
      <TitleCategory title={"Nos 10 dernières recettes"} />

      <ScrollingCarousel>
        {recipes.map((recipe, index) => (
          <CardRecipe key={index} recipe={recipe} />
        ))}
      </ScrollingCarousel>
    </div>
  );
};
