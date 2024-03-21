import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchIngredient } from "../../calls/mongo/ingredient";
import { IngredientModel } from "../../models/Ingredient";

export const Ingredients = () => {
  const { id } = useParams();
  const [ingredient, setIngredient] = useState<IngredientModel | null>(null);

  useEffect(() => {
    if (id) {
      fetchIngredient(id)
        .then((data: IngredientModel) => {
          console.log(data);
          setIngredient(data);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  return (
    <>
      <div className="ingredient-details">
        <h1>Ingredient Details</h1>
        {ingredient ? (
          <div>
            <h2>{ingredient.ingredient_name}</h2>
            {/* Autres détails de l'ingrédient */}
          </div>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    </>
  );
};

export default Ingredients;
