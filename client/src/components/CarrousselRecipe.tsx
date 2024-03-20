import React, { useEffect, useState } from "react";
import TitleCategory from "./TitleCategory";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { CardRecipe } from "./CardRecipe";
import { fetchRecipes } from "../calls/mongo/recipe";
import { RecipeModel } from "../models/Recipe";

export const CarrousselRecipe = () => {
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);

  useEffect(() => {
    fetchRecipes()
      .then((data: RecipeModel[]) => setRecipes(data))
      .catch((error) => console.error(error));
  }, []);

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
