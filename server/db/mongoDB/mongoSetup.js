const mongoose = require("mongoose");
async function initMongo() {
  const url =
    "mongodb://127.0.0.1:27017/mydatabase" ||
    "'mongodb://localhost:27017/mydatabase";
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    console.log("Connecté à MongoDB avec succès.");

    const db = mongoose.connection.db;
    let indexes = await db.collection("recipes").indexes();

    if (indexes.length > 1) {
      await db.collection("recipes").dropIndex("recipe_name_text");
      console.log("Index de texte supprimé sur 'recipe_name' dans 'recipes'.");
    }
    indexes = await db.collection("ingredients").indexes();
    if (indexes.length > 1) {
      await db.collection("ingredients").dropIndex("ingredient_name_text");
      console.log(
        "Index de texte supprimé sur 'ingredient_name' dans 'ingredients'.",
      );
    }
    indexes = await db.collection("types").indexes();
    if (indexes.length > 1) {
      await db.collection("types").dropIndex("type_name_text");
      console.log("Index de texte supprimé sur 'type_name' dans 'types'.");
    }

    await db.collection("recipes").createIndex({ recipe_name: "text" });
    console.log("Index de texte créé sur 'recipe_name' dans 'recipes'.");
    await db.collection("ingredients").createIndex({ ingredient_name: "text" });
    console.log(
      "Index de texte créé sur 'ingredient_name' dans 'ingredients'.",
    );
    await db.collection("types").createIndex({ type_name: "text" });
    console.log("Index de texte créé sur 'type_name' dans 'types'.");

    console.log(indexes);
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
  }
}

module.exports = initMongo;
