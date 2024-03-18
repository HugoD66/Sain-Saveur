// --- CALLS API RECIPES --- //

// ----------- GET ----------- //

export const fetchRecipe = (recipeId: number) => {
  return fetch(`http://localhost:4700/api/recipe/${recipeId}`)
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
