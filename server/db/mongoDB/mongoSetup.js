const mongoose = require("mongoose");
async function initMongo() {
  const url =
    "mongodb://127.0.0.1:27017/mydatabase" ||
    "'mongodb://localhost:27017/mydatabase";
  try {
    console.warn("PENSER A DELETE MONGO-DATA APRES LE REBASE.");
    console.warn(
      "GENERER INGREDIENTS : insertIngredients() DE ingredientFixtures.js.",
    );
    console.warn("GENERER TYPES : insertTypes() DE typesFixtures.js.");

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    console.log("Connecté à MongoDB avec succès.");

    const db = mongoose.connection.db;
    async function dropIndexIfExists(collectionName, indexName) {
      const indexes = await db.collection(collectionName).indexes();
      const indexExists = indexes.some((index) => index.name === indexName);
      if (indexExists) {
        await db.collection(collectionName).dropIndex(indexName);
        console.log(
          `Index ${indexName} supprimé de la collection ${collectionName}.`,
        );
      }
    }

    await dropIndexIfExists("recipes", "recipe_name_text");
    await dropIndexIfExists("ingredients", "ingredient_name_text");
    await dropIndexIfExists("types", "type_name_text");

    // Créer les indexes après avoir supprimé les anciens, s'ils existaient
    await db.collection("recipes").createIndex({ recipe_name: "text" });
    console.log("Index de texte créé sur 'recipe_name' dans 'recipes'.");
    await db.collection("ingredients").createIndex({ ingredient_name: "text" });
    console.log(
      "Index de texte créé sur 'ingredient_name' dans 'ingredients'.",
    );
    await db.collection("types").createIndex({ type_name: "text" });
    console.log("Index de texte créé sur 'type_name' dans 'types'.");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
  }
}

module.exports = initMongo;
