import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipe, fetchRecipeByType } from "../../calls/mongo/recipe";
import { Header } from "../../components/Header";
import { RecipeModel } from "../../models/Recipe";
import recipePicture from "../../assets/recipe.png";
export const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeModel | null>(null);
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);

  useEffect(() => {
    if (id) {
      fetchRecipe(id)
        .then((data: RecipeModel) => {
          console.log(data);
          setRecipe(data);
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération de la recette:", error),
        );

      fetchRecipeByType(id)
        .then((data: RecipeModel[]) => {
          console.log(data);
          setRecipes(data);
        })
        .catch((error) =>
          console.error(
            "Erreur lors de la récupération des recettes associées:",
            error,
          ),
        );
    }
  }, [id]);

  const imageUrl = recipe?.recipe_picture
    ? `http://localhost:4700/${recipe.recipe_picture}`
    : "";

  return (
    <div className="search-screen">
      <Header />
      <h1>
        <img src={recipePicture} alt="" className="icon-detail-recipe" />
        {recipe?.recipe_name}
      </h1>
      <div className="content-recipe-detail">
        <img src={imageUrl} alt="Recette" className="picture-recipe-detail" />
        <div className="description-recipe-detail">
          <p>{recipe?.recipe_description}</p>
          <p>Temps de préparation: {recipe?.preparation_time_min} minutes</p>
          <p>Temps de cuisson: {recipe?.cooking_time_min} minutes</p>
          <h3>Ingrédients</h3>
          <ul>
            {recipe?.recipe_ingredients?.map((ingredient) => (
              <li key={ingredient._id}>{ingredient.ingredient_name}</li>
            ))}
          </ul>
          <h3>Étapes de préparation</h3>
          <ol>
            {recipe?.directions?.map((direction) => (
              <li key={direction.direction_number}>
                {direction.direction_description}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="associate-recipes">
        {recipes.length > 0 ? (
          <>
            <h2>Recettes associées</h2>
            <div className="recipes">
              {recipes.map((recipe) => (
                <div key={recipe.recipe_id} className="recipe">
                  <img
                    src={`http://localhost:4700/${recipe.recipe_picture}`}
                    alt="Recette"
                    className="picture-recipe"
                  />
                  <h3>{recipe.recipe_name}</h3>
                </div>
              ))}
            </div>
          </>
        ) : (
          <h2>Pas de recettes associées pour le moment !</h2>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
