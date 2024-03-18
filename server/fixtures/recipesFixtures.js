const mongoose = require("mongoose");
const Recipe = require("../models/RecipeModel");
const Type = require("../models/TypeModel");

const recipes = [
  {
    recipe_id: "91",
    recipe_name: "Poulet au curry",
    directions: [
      {
        direction_description: "Préchauffez votre four à 180°C.",
        direction_number: 1,
      },
      {
        direction_description:
          "Mélangez le poulet avec le curry et faites cuire au four pendant 45 minutes.",
        direction_number: 2,
      },
    ],
    preparation_time_min: "15",
    cooking_time_min: "45",
    isFavorite: true,
    recipe_description:
      "Un délicieux poulet au curry, parfait pour un repas en famille.",
    recipe_picture: "upload/poulet_curry.jpg",
    type_id: "1", // Ceci sera remplacé par un _id de type existant
    created_by: "Hugo",
    created_at: new Date(),
  },
  {
    recipe_name: "Quiche aux épinards",
    directions: [
      {
        direction_description: "Préchauffez votre four à 200°C.",
        direction_number: 1,
      },
      {
        direction_description:
          "Mélangez les œufs, les épinards, la crème fraîche et assaisonnez.",
        direction_number: 2,
      },
      {
        direction_description:
          "Versez la préparation dans une pâte brisée et enfournez pendant 25 minutes.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "15",
    cooking_time_min: "25",
    isFavorite: false,
    recipe_description: "Une quiche savoureuse riche en légumes.",
    recipe_picture: "upload/quiche_epinards.jpg",
    type_id: "Vegetarien",
    created_by: "Alice",
    created_at: new Date(),
  },
  {
    recipe_name: "Sushi Maki",
    directions: [
      {
        direction_description: "Préparez le riz à sushi.",
        direction_number: 1,
      },
      {
        direction_description: "Étalez le riz sur une feuille d'algue nori.",
        direction_number: 2,
      },
      {
        direction_description:
          "Ajoutez du poisson cru et des légumes, puis roulez.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "30",
    cooking_time_min: "0",
    isFavorite: true,
    recipe_description: "Des sushis Maki frais et délicieux.",
    recipe_picture: "upload/sushi_maki.jpg",
    type_id: "Japonaise",
    created_by: "Ben",
    created_at: new Date(),
  },
  {
    recipe_name: "Ratatouille niçoise",
    directions: [
      {
        direction_description: "Coupez les légumes en rondelles fines.",
        direction_number: 1,
      },
      {
        direction_description:
          "Faites-les revenir séparément, puis assemblez-les dans une grande casserole.",
        direction_number: 2,
      },
      {
        direction_description: "Laissez mijoter à feu doux pendant 45 minutes.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "20",
    cooking_time_min: "45",
    isFavorite: true,
    recipe_description: "Un plat végétarien riche en couleurs et en saveurs.",
    recipe_picture: "upload/ratatouille_nicoise.jpg",
    type_id: "Vegetarien",
    created_by: "Claire",
    created_at: new Date(),
  },
  {
    recipe_name: "Falafels",
    directions: [
      {
        direction_description:
          "Mixez les pois chiches avec des herbes et des épices.",
        direction_number: 1,
      },
      {
        direction_description: "Formez des boulettes et faites-les frire.",
        direction_number: 2,
      },
    ],
    preparation_time_min: "15",
    cooking_time_min: "5",
    isFavorite: false,
    recipe_description:
      "Des falafels croustillants et savoureux, parfaits en sandwich ou en salade.",
    recipe_picture: "upload/falafels.jpg",
    type_id: "Végan",
    created_by: "Daniel",
    created_at: new Date(),
  },
  {
    recipe_name: "Pad Thaï",
    directions: [
      {
        direction_description: "Faites cuire les nouilles de riz.",
        direction_number: 1,
      },
      {
        direction_description:
          "Sauté de nouilles avec des crevettes, des œufs, et des légumes.",
        direction_number: 2,
      },
      {
        direction_description:
          "Ajoutez des cacahuètes concassées avant de servir.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "10",
    cooking_time_min: "15",
    isFavorite: true,
    recipe_description:
      "Un classique de la cuisine thaïlandaise, riche en saveurs.",
    recipe_picture: "upload/pad_thai.jpg",
    type_id: "Thaï",
    created_by: "Eva",
    created_at: new Date(),
  },
  {
    recipe_name: "Pizza sans gluten",
    directions: [
      {
        direction_description: "Préparez une pâte à pizza sans gluten.",
        direction_number: 1,
      },
      {
        direction_description:
          "Garnissez de sauce tomate, fromage, et vos toppings préférés.",
        direction_number: 2,
      },
      {
        direction_description:
          "Faites cuire au four à 220°C pendant 15 minutes.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "20",
    cooking_time_min: "15",
    isFavorite: false,
    recipe_description:
      "Une pizza savoureuse adaptée aux intolérants au gluten.",
    recipe_picture: "upload/pizza_sans_gluten.jpg",
    type_id: "Sans gluten",
    created_by: "François",
    created_at: new Date(),
  },
];

async function insertRecipes() {
  try {
    // C'est pour la génération des types de recettes, à garder jusqu'au prochain commentaire
    const types = await Type.find({});
    if (types.length === 0) {
      throw new Error("Aucun type trouvé.");
    }
    const typeIds = types.map((type) => type._id);
    console.log(typeIds);
    const modifiedRecipes = recipes.map((recipe) => ({
      ...recipe,
      recipe_types: [typeIds[Math.floor(Math.random() * typeIds.length)]],
    }));
    // Fin

    const createdRecipes = await Recipe.insertMany(modifiedRecipes);
    console.log(`Recettes ajoutées avec succès: ${createdRecipes.length}`);
  } catch (error) {
    console.error("Erreur lors de l'ajout des recettes:", error);
  }
}

module.exports = insertRecipes;
