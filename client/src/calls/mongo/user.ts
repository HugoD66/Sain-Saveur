// --- CALLS API USERS --- //

// ----------- GET ----------- //
export const fetchUser = (userId: string) => {
  return fetch(`http://localhost:4700/api/users/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      throw error;
    });
};

export const fetchUsers = () => {
  return fetch("http://localhost:4700/api/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      throw error;
    });
};

// ----------- REMOVE ----------- //

export const removeUser = (userId: string) => {
  return fetch(`http://localhost:4700/api/user/${userId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      throw error;
    });
};

export const removeUsers = () => {
  return fetch("http://localhost:4700/api/users", {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression des utilisateurs:", error);
      throw error;
    });
};
