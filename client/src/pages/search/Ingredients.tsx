import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchIngredient } from "../../calls/mongo/ingredient";
import { IngredientModel } from "../../models/Ingredient";
import { fetchRecipeByIngredient } from "../../calls/mongo/recipe";
import { RecipeModel } from "../../models/Recipe";
import { Header } from "../../components/Header";
import { CarrousselRecipe } from "../../components/CarrousselRecipe";

export const Ingredients = () => {
  const { id } = useParams();
  const [ingredient, setIngredient] = useState<IngredientModel | null>(null);
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);

  useEffect(() => {
    if (id) {
      fetchIngredient(id)
        .then((data: IngredientModel) => {
          console.log(data);
          setIngredient(data);
        })
        .catch((error) =>
          console.error(
            "Erreur lors de la récupération de l'ingrédient:",
            error,
          ),
        );

      fetchRecipeByIngredient(id)
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
      <div className="carousel-search-sreen">
        <h1>Nos recettes avec {ingredient?.ingredient_name}</h1>
        {recipes.length > 0 ? (
          <CarrousselRecipe recipes={recipes} />
        ) : (
          <p>Aucune recette trouvée pour cet ingrédient.</p>
        )}
      </div>
    </div>
  );
};

export default Ingredients;
