import React, { useEffect, useState } from "react";
import { addRecipe } from "../../calls/mongo/recipe";
import { fetchTypes } from "../../calls/mongo/type";
import { TypeModel } from "../../models/Type";
import { IngredientModel } from "../../models/Ingredient";
import { fetchIngredients } from "../../calls/mongo/ingredient";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    cooking_time_min: "",
    preparation_time_min: "",
    description: "",
    recipe_name: "",
    recipe_types: "",
    recipe_picture: "",
    recipe_directions: [{ direction_description: "", direction_number: 1 }],
  });
  const [types, setTypes] = useState<TypeModel[]>([]);
  const [ingredients, setIngredients] = useState<IngredientModel[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchIngredients().then(setIngredients).catch(console.error);
  }, []);

  useEffect(() => {
    fetchTypes()
      .then((data: TypeModel[]) => setTypes(data))
      .catch(console.error);
  }, []);

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.ingredient_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
  const handleAddIngredient = (ingredientId: string) => {
    if (!selectedIngredients.includes(ingredientId)) {
      setSelectedIngredients([...selectedIngredients, ingredientId]);
    }
  };
  const handleIngredientChange = (ingredientId: any) => {
    setSelectedIngredients((prev: any[]): any[] =>
      prev.includes(ingredientId)
        ? prev.filter((id): boolean => id !== ingredientId)
        : [...prev, ingredientId],
    );
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  // Gestion des changements spécifiquement pour les directions
  const handleDirectionChange = (index: any, value: any) => {
    const newDirections = [...recipe.recipe_directions];
    newDirections[index] = {
      ...newDirections[index],
      direction_description: value,
    };
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      recipe_directions: newDirections,
    }));
  };

  // Ajout d'une nouvelle direction
  const addDirection = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      recipe_directions: [
        ...prevRecipe.recipe_directions,
        {
          direction_description: "",
          direction_number: prevRecipe.recipe_directions.length + 1,
        },
      ],
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(recipe.recipe_types);

    const selectedType = types.find((type) => type._id === recipe.recipe_types);
    console.log(selectedType);
    if (!selectedType) {
      console.error("Type de recette non trouvé.");
      return;
    }

    const formData = new FormData();
    formData.append("cooking_time_min", recipe.cooking_time_min);
    formData.append("preparation_time_min", recipe.preparation_time_min);
    formData.append("recipe_description", recipe.description);
    formData.append("recipe_name", recipe.recipe_name);
    formData.append("recipe_types", recipe.recipe_types);
    formData.append(
      "recipe_directions",
      JSON.stringify(recipe.recipe_directions),
    );
    formData.append("recipe_ingredients", JSON.stringify(selectedIngredients));
    console.log(JSON.stringify(selectedIngredients));

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    // @ts-ignore
    if (fileInput.files[0]) {
      // @ts-ignore
      formData.append("recipe_picture", fileInput.files[0]);
    }
    try {
      const response = await fetch("http://localhost:4700/api/recipes/add", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      const responseData = await response.json();
      console.log("Recette ajoutée avec succès:", responseData);
      // REDIRECTION
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
    }
  };

  return (
    <>
      <div className="content-form">
        <form onSubmit={handleSubmit}>
          <label>
            Temps de cuisson
            <input
              type="text"
              name="cooking_time_min"
              value={recipe.cooking_time_min}
              onChange={handleChange}
            />
          </label>

          <label>
            Temps de préparation
            <input
              type="text"
              name="preparation_time_min"
              value={recipe.preparation_time_min}
              onChange={handleChange}
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={recipe.description}
              onChange={handleChange}
            />
          </label>

          <label>
            Nom
            <input
              type="text"
              name="recipe_name"
              value={recipe.recipe_name}
              onChange={handleChange}
            />
          </label>

          <div>
            <h3>Directions</h3>
            {recipe.recipe_directions.map((direction, index) => (
              <div key={index}>
                <input
                  type="text"
                  name={`direction_description_${index}`}
                  value={direction.direction_description}
                  onChange={(e) => handleDirectionChange(index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                />
              </div>
            ))}
            <button type="button" onClick={addDirection}>
              Ajouter une étape
            </button>
          </div>

          <div>
            <h3>Rechercher un ingrédient</h3>
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div>
            <h3>Résultats de la recherche</h3>
            {searchTerm.length >= 3 && (
              <ul>
                {filteredIngredients.map((ingredient) => (
                  <li
                    key={ingredient._id}
                    onClick={() => handleAddIngredient(ingredient._id)}
                  >
                    {ingredient.ingredient_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3>Ingrédients sélectionnés</h3>
            <ul>
              {selectedIngredients.map((ingredientId) => {
                const ingredient = ingredients.find(
                  (ing) => ing._id === ingredientId,
                );
                return (
                  <li key={ingredientId}>{ingredient?.ingredient_name}</li>
                );
              })}
            </ul>
          </div>

          <label>
            Type de plat
            <select
              name="recipe_types"
              value={recipe.recipe_types}
              onChange={handleChange}
            >
              <option value="">Sélectionnez un type</option>
              {types.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.type_name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Photo du plat
            <input
              type="file"
              name="recipe_picture"
              onChange={handleChange}
              value={recipe.recipe_picture}
            />
          </label>

          <input className="inputForm" type="submit" value="Envoyer" />
        </form>
      </div>
      <div className="back-form"></div>
    </>
  );
};

export default AddRecipe;
