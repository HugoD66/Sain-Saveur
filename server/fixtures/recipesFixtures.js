const recipes = [
  {
    nom: "Poulet au curry",
    sommeCal: 500,
    sommeLipide: 20,
    sommeGlucide: 30,
    sommeProteine: 40,
  },
  {
    nom: "Salade César",
    sommeCal: 300,
    sommeLipide: 15,
    sommeGlucide: 20,
    sommeProteine: 25,
  },
  {
    nom: "Spaghetti Bolognaise",
    sommeCal: 700,
    sommeLipide: 25,
    sommeGlucide: 50,
    sommeProteine: 35,
  },
];

function insertRecipes(db) {
  recipes.forEach((recipe) => {
    const { nom, sommeCal, sommeLipide, sommeGlucide, sommeProteine } = recipe;
    const sql = `INSERT INTO Recette (nom, sommeCal, sommeLipide, sommeGlucide, sommeProteine) VALUES (?, ?, ?, ?, ?)`;
    db.run(
      sql,
      [nom, sommeCal, sommeLipide, sommeGlucide, sommeProteine],
      function (err) {
        if (err) {
          console.error(
            `Erreur lors de l'ajout de la recette ${nom}: ${err.message}`,
          );
        } else {
          console.log(`Recette '${nom}' ajoutée avec succès.`);
        }
      },
    );
  });
}

module.exports = insertRecipes;
