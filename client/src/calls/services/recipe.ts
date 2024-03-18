type Recipe = {
  title: string;
  description: string;
};

export const fetchExternalRecipes = async (): Promise<Recipe[]> => {
  const baseUrl = "https://platform.fatsecret.com/rest/server.api??method=recipe.get.v2&recipe_id=5&format=json&page_number=0&max_results=10";
  const accessToken = process.env.FATSECRET_ACCESS_TOKEN;
  const method = "recipes.search"; 

  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Réponse réseau non OK");
    }

    const data: Recipe[] = await response.json();
    console.log(data); 
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes externes :", error);
  }
  return [];
};


export const fetchLocalRecipes = async (): Promise<Recipe[]> => {
  const baseUrl = "http://localhost:5000/api/recipes"; 

  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Réponse réseau non OK");
    }

    const data: Recipe[] = await response.json();
    console.log(data); 
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes locales :", error);
  }
  return [];
};


// ----------- REMOVE ----------- //

export const removeRecipe = (recipeId: number) => {
  return fetch(`http://localhost:5000/api/recipe/${recipeId}`, {
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
  return fetch("http://localhost:5000/api/recipes", {
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
