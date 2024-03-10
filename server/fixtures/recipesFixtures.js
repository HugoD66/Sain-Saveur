const publishRecipeCreated = require("../db/redis/subscribeOnCreateRecipe");
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
      async function (err) {
        if (err) {
          console.error(
            `Retour sqlit | Erreur lors de l'ajout de la recette ${nom}: ${err.message}`,
          );
        } else {
          publishRecipeCreated(nom).catch(console.error);

          console.log(
            `Retour sqlit | Message publié pour la recette '${nom}'.`,
          );
        }
      },
    );
  });
}

module.exports = insertRecipes;
