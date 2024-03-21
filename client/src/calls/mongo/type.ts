// --- CALLS API TYPES - RECIPE --- //

// ----------- POST ----------- //

export const addType = (formData: FormData) => {
  console.log(formData);
  return fetch("http://localhost:4700/api/types/add", {
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
      console.error("Erreur lors de l'ajout du type de recette:", error);
      throw error;
    });
};

// ----------- GET ----------- //

export const fetchType = async (typeId: string) => {
  return fetch(`http://localhost:4700/api/types/${typeId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(
        "Erreur lors de la récupération des types de recettes:",
        error,
      );
      throw error;
    });
};

export const fetchTypes = () => {
  return fetch("http://localhost:4700/api/types")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(
        "Erreur lors de la récupération des types de recettes:",
        error,
      );
      throw error;
    });
};

// ----------- REMOVE ----------- //

export const removeType = (typeId: number) => {
  return fetch(`http://localhost:4700/api/type/${typeId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression du type de recette:", error);
      throw error;
    });
};

// ----------- UPDATE ----------- //

export const updateType = (typeId: number, formData: any) => {
  //TODO remove any
  return fetch(`http://localhost:4700/api/type/${typeId}`, {
    method: "PUT",
    body: formData, // Utilisation directe de FormData, sans JSON.stringify
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour du type de recette:", error);
      throw error;
    });
};
