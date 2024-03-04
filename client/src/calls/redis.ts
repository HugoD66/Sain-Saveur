export const fetchRecettes = () => {
  return fetch("http://localhost:5000/api/recettes")
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

export const fetchRedisTest = () => {
  return fetch("http://localhost:5000/api/redis/test")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors du test Redis:", error);
      throw error;
    });
};
