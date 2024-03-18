import React, { useState } from "react";
import { addRecipe } from "../../calls/mongo/recipe";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    cooking_time_min: "",
    preparation_time_min: "",
    description: "",
    recipe_name: "",
    recipe_type: "",
    recipe_picture: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Création de l'objet FormData
    const formData = new FormData();
    formData.append("cooking_time_min", recipe.cooking_time_min);
    formData.append("preparation_time_min", recipe.preparation_time_min);
    formData.append("recipe_description", recipe.description);
    formData.append("recipe_name", recipe.recipe_name);
    formData.append("recipe_type", recipe.recipe_type);

    // Accès au fichier sélectionné par l'utilisateur
    // Assurez-vous que l'input de type file ait l'attribut 'id' ou 'ref' pour y accéder
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
        body: formData, // Pas besoin de définir 'Content-Type' ici
      });
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      const responseData = await response.json();
      console.log("Recette ajoutée avec succès:", responseData);
      // Redirection ou mise à jour de l'UI ici
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      // Gérer l'erreur ici
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

          <label>
            Type de plat
            <input
              type="text"
              name="recipe_type"
              value={recipe.recipe_type}
              onChange={handleChange}
            />
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
