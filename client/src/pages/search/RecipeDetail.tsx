import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipe, fetchRecipeByType } from "../../calls/mongo/recipe";
import { Header } from "../../components/Header";
import { RecipeModel } from "../../models/Recipe";
import recipePicture from "../../assets/recipe.png";
import { CarrousselRecipe } from "../../components/CarrousselRecipe";
import { TypeModel } from "../../models/Type";
export const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeModel | null>(null);
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);
  const [type, setType] = useState<TypeModel | null>(null);

  useEffect(() => {
    if (id) {
      fetchRecipe(id)
        .then((recipe: RecipeModel) => {
          console.log(recipe);
          setRecipe(recipe);
          console.log(recipe!.recipe_types);
          // @ts-ignore
          setType(recipe!.recipe_types);
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération de la recette:", error),
        );
      // @ts-ignore
      fetchRecipeByType(type?._id)
        .then((recipes: RecipeModel[]) => {
          console.log(recipes);
          setRecipes(recipes);
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération des recettes:", error),
        );
    }
  }, [id]);
  /*
  useEffect(() => {
  if (id) {
    fetchRecipe(id)
      .then((recipeData: RecipeModel) => {
        console.log(recipeData);
        setRecipe(recipeData);
        // Après avoir défini la recette, utilisez l'ID de type de cette recette pour chercher des recettes associées
        if (recipeData && recipeData.recipe_types && recipeData.recipe_types.length > 0) {
          const typeId = recipeData.recipe_types[0]._id;
          fetchRecipeByType(typeId)
            .then((associatedRecipes: RecipeModel[]) => {
              console.log(associatedRecipes);
              setRecipes(associatedRecipes);
            })
            .catch((error) =>
              console.error("Erreur lors de la récupération des recettes associées:", error)
            );
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération de la recette:", error)
      );
  }
}, [id]); // Vous avez besoin d'ajouter recipe dans les dépendances ici si vous voulez refetch quand recipe change, ce qui n'est probablement pas le cas ici.

   */

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
        <h2>Recettes associées</h2>
        {recipes.length > 0 ? (
          <CarrousselRecipe recipes={recipes} />
        ) : (
          <p>Aucune recette trouvée pour ce type.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
