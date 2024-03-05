export const fetchRecipes = () => {
  return fetch("http://localhost:5000/api/recipes")
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

export const fetchRecipe = (recipeId: number) => {
  return fetch(`http://localhost:5000/api/recipe/${recipeId}`)
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
