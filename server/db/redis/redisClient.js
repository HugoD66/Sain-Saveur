/*


OUVRIR CANAL

redisClient.on("connect", () =>
  console.log("Connecté à Redis pour l'abonnement."),
);
redisClient.on("error", (err) =>
  console.error("Erreur de connexion à Redis:", err),
);

redisClient.subscribe("recipesChannel", (err, count) => {
  if (err) {
    console.error(
      "Erreur lors de la souscription au canal 'recipesChannel':",
      err,
    );
    return;
  }
  console.log(`Souscrit à ${count} canal(aux). En attente de messages...`);
});



*/
