import React, { useEffect, useState } from "react";
import { RecipeModel } from "../../models/Recipe";
import { useParams } from "react-router-dom";
import { fetchRecipe } from "../../calls/mongo/recipe";
import { Header } from "../../components/Header";

export const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeModel | null>(null);

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
    }
  }, [id]);

  return (
    <div>
      <div className="search-screen">
        <Header />
        <h1>{recipe?.recipe_name}</h1>
      </div>
    </div>
  );
};
export default RecipeDetail;
