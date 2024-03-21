// --- CALLS API RECIPES --- //

// ----------- POST ----------- //

export const addRecipe = (formData: any) => {
  //TODO remove any
  console.log(formData);
  return fetch("http://localhost:4700/api/recipes/add", {
    method: "POST",
    body: formData, // Utilisation directe de FormData, sans JSON.stringify
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout de la recette:", error);
      throw error;
    });
};

// ----------- GET ----------- //

export const fetchRecipe = (recipeId: number) => {
  return fetch(`http://localhost:4700/api/recipes/${recipeId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de la  recette :", error);
      throw error;
    });
};

export const fetchRecipeByIngredient = async (ingredientId: string) => {
  try {
    const response = await fetch(
      `http://localhost:4700/api/recipes/by-ingredient/${ingredientId}`,
    );
    if (!response.ok) {
      throw new Error("Réponse réseau non OK");
    }
    return await response.json();
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la liste des recettes :",
      error,
    );
    throw error;
  }
};

export const fetchRecipeByType = async (typeId: string) => {
  try {
    const response = await fetch(
      `http://localhost:4700/api/recipes/by-type/${typeId}`,
    );
    if (!response.ok) {
      throw new Error("Réponse réseau non OK");
    }
    return await response.json();
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la liste des recettes :",
      error,
    );
    throw error;
  }
};
export const fetchRecipes = () => {
  return fetch("http://localhost:4700/api/recipes")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des recettes:", error);
      throw error;
    });
};

// ----------- REMOVE ----------- //

export const removeRecipe = (recipeId: number) => {
  return fetch(`http://localhost:4700/api/recipe/${recipeId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de la recette:", error);
      throw error;
    });
};

export const removeRecipes = () => {
  return fetch("http://localhost:4700/api/recipes", {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression des recettes:", error);
      throw error;
    });
};
