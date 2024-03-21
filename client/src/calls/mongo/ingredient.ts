// ------------- POST ------------- //

export const addIngredient = (formData: FormData) => {
  console.log(formData);
  return fetch("http://localhost:4700/api/ingredients/add", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout de l'ingrédient:", error);
      throw error;
    });
};

// ------------- GET ------------- //

export const fetchIngredient = async (ingredientId: string) => {
  //string ?
  try {
    const response = await fetch(
      `http://localhost:4700/api/ingredients/${ingredientId}`,
    );
    if (!response.ok) {
      throw new Error("Réponse réseau non OK");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération de l'ingrédient:", error);
    throw error;
  }
};
export const fetchIngredients = () => {
  return fetch("http://localhost:4700/api/ingredients")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des ingrédients:", error);
      throw error;
    });
};

// ------------- REMOVE ------------- //

export const removeIngredient = (ingredientId: number) => {
  return fetch(`http://localhost:4700/api/ingredient/${ingredientId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de l'ingrédient:", error);
      throw error;
    });
};

// ------------- UPDATE ------------- //

export const updateIngredient = (formData: FormData) => {
  return fetch("http://localhost:4700/api/ingredients/update", {
    method: "PUT",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour de l'ingrédient:", error);
      throw error;
    });
};
