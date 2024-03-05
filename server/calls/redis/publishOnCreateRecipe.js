const redisClient = require("../../redisClient");

redisClient.subscribe("newRecipeChannel", (message) => {
  console.log("Nouvelle recette reçue:", message);

  // Convertissez le message de string JSON en objet
  const recipe = JSON.parse(message);
  // Ici, insérez la logique pour envoyer la newsletter
  // Cela pourrait impliquer de faire appel à un service externe d'envoi d'emails,
  // de formatter le message, etc.
  sendNewsletter(recipe);
});

async function sendNewsletter(recipe) {
  // Exemple simplifié
  console.log("Envoi d'une newsletter pour la recette:", recipe.nom);
  // Vous devrez intégrer un service d'envoi d'emails comme SendGrid, Mailchimp, etc.
}
