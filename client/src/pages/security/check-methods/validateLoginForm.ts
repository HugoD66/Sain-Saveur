export const validateForm = (
  username: string,
  password: string,
  setError: any,
): boolean => {
  if (!username || !password) {
    setError("Veuillez remplir tous les champs.");
    return false;
  }
  if (password.length < 6) {
    setError("Le mot de passe doit contenir au moins 6 caractères.");
    return false;
  }
  setError(""); // Remet l'erreur à zéro si tout est correct
  return true;
};
