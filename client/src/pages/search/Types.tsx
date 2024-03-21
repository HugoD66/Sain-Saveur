import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { RecipeModel } from "../../models/Recipe";
import { TypeModel } from "../../models/Type";
import { fetchRecipeByType } from "../../calls/mongo/recipe";
import { fetchType } from "../../calls/mongo/type";
import { useParams } from "react-router-dom";
import { CarrousselRecipe } from "../../components/CarrousselRecipe";

export const Types = () => {
  const { id } = useParams();
  const [type, setType] = useState<TypeModel | null>(null);
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);

  useEffect(() => {
    if (id) {
      fetchType(id)
        .then((data: TypeModel) => {
          console.log(data);
          setType(data);
        })
        .catch((error) =>
          console.error(
            "Erreur lors de la récupération du type de recette:",
            error,
          ),
        );
      fetchRecipeByType(id)
        .then((recipes: RecipeModel[]) => {
          console.log(recipes);
          setRecipes(recipes);
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération des recettes:", error),
        );
    }
  }, [id]);
  return (
    <div>
      <Header />
      <div className="search-screen">
        <h1>Nos recettes de type {type?.type_name}</h1>
        <div className="recipes-container">
          {recipes.map((recipe) => (
            <CarrousselRecipe recipes={recipes} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Types;
