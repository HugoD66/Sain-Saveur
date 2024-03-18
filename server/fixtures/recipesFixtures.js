const publishRecipeCreated = require("../db/redis/subscribeOnCreateRecipe");
const mongoose = require("mongoose");
const Recipe = require("../models/RecipeModel");

const recipe = [
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
    recipe_picture: "upload/...",
    recipe_types: {
      recipe_type: ["Vege"],
    },
    created_by: "Hugo",
    created_at: new Date(),
  },
  {
    recipe_id: "92",
    recipe_name: "Salade César",
    directions: [
      {
        direction_description:
          "Coupez la laitue et disposez-la dans un grand saladier.",
        direction_number: 1,
      },
      {
        direction_description:
          "Ajoutez le poulet grillé, les croûtons, le parmesan, et la sauce César.",
        direction_number: 2,
      },
    ],
    preparation_time_min: "10",
    cooking_time_min: "0",
    isFavorite: false,
    recipe_description: "Une salade César classique et rafraîchissante.",
    recipe_picture: "upload/salade_cesar.jpg",
    recipe_types: {
      recipe_type: ["Salade", "Poulet"],
    },
    created_by: "Marie",
    created_at: new Date(),
  },
  {
    recipe_id: "93",
    recipe_name: "Lasagnes à la bolognaise",
    directions: [
      {
        direction_description:
          "Préparez la sauce bolognaise en faisant revenir la viande avec les oignons et la tomate.",
        direction_number: 1,
      },
      {
        direction_description:
          "Montez les lasagnes en alternant couches de pâtes, de sauce bolognaise, et de béchamel.",
        direction_number: 2,
      },
    ],
    preparation_time_min: "30",
    cooking_time_min: "60",
    isFavorite: true,
    recipe_description:
      "Des lasagnes à la bolognaise, un plat réconfortant pour toute la famille.",
    recipe_picture: "upload/lasagnes_bolognaise.jpg",
    recipe_types: {
      recipe_type: ["Pâtes", "Viande"],
    },
    created_by: "Lucas",
    created_at: new Date(),
  },
  {
    recipe_id: "94",
    recipe_name: "Tarte aux pommes",
    directions: [
      {
        direction_description:
          "Étalez la pâte dans un moule à tarte et piquez le fond avec une fourchette.",
        direction_number: 1,
      },
      {
        direction_description:
          "Disposez les tranches de pommes sur la pâte et saupoudrez de sucre et de cannelle avant de cuire.",
        direction_number: 2,
      },
    ],
    preparation_time_min: "20",
    cooking_time_min: "45",
    isFavorite: false,
    recipe_description:
      "Une tarte aux pommes classique, croustillante et dorée.",
    recipe_picture: "upload/tarte_aux_pommes.jpg",
    recipe_types: {
      recipe_type: ["Dessert", "Végétarien"],
    },
    created_by: "Emilie",
    created_at: new Date(),
  },
  {
    recipe_id: "95",
    recipe_name: "Soupe de lentilles",
    directions: [
      {
        direction_description:
          "Faites revenir les oignons et l'ail dans une grande casserole.",
        direction_number: 1,
      },
      {
        direction_description:
          "Ajoutez les lentilles, l'eau, et les épices, puis laissez mijoter jusqu'à ce que les lentilles soient tendres.",
        direction_number: 2,
      },
    ],
    preparation_time_min: "10",
    cooking_time_min: "40",
    isFavorite: true,
    recipe_description:
      "Une soupe de lentilles nourrissante, riche en saveurs et en nutriments.",
    recipe_picture: "upload/soupe_de_lentilles.jpg",
    recipe_types: {
      recipe_type: ["Soupe", "Végan"],
    },
    created_by: "Jean",
    created_at: new Date(),
  },
  {
    recipe_id: "96",
    recipe_name: "Risotto aux champignons",
    directions: [
      {
        direction_description:
          "Faites revenir les champignons et l'oignon dans une poêle avec un peu d'huile.",
        direction_number: 1,
      },
      {
        direction_description:
          "Ajoutez le riz et le bouillon progressivement, en remuant constamment, jusqu'à cuisson complète.",
        direction_number: 2,
      },
    ],
    preparation_time_min: "15",
    cooking_time_min: "30",
    isFavorite: false,
    recipe_description:
      "Un risotto crémeux aux champignons, plein de goût et facile à préparer.",
    recipe_picture: "upload/risotto_aux_champignons.jpg",
    recipe_types: {
      recipe_type: ["Plat principal", "Végétarien"],
    },
    created_by: "Sophie",
    created_at: new Date(),
  },
  {
    recipe_id: "97",
    recipe_name: "Gâteau au chocolat",
    directions: [
      {
        direction_description:
          "Préchauffez votre four et mélangez les ingrédients secs dans un bol.",
        direction_number: 1,
      },
      {
        direction_description:
          "Ajoutez les ingrédients humides et mélangez jusqu'à obtenir une pâte lisse avant de cuire.",
        direction_number: 2,
      },
    ],
    preparation_time_min: "20",
    cooking_time_min: "35",
    isFavorite: true,
    recipe_description:
      "Un gâteau au chocolat moelleux et riche, idéal pour les amateurs de chocolat.",
    recipe_picture: "upload/gateau_au_chocolat.jpg",
    recipe_types: {
      recipe_type: ["Dessert", "Végétarien"],
    },
    created_by: "Clara",
    created_at: new Date(),
  },
];

async function insertRecipes() {
  try {
    const createdRecipes = await Recipe.insertMany(recipe);
    console.log(`Recettes ajoutées avec succès: ${createdRecipes.length}`);
  } catch (error) {
    console.error(`Erreur lors de l'ajout des recettes:`, error);
  }
}
module.exports = insertRecipes;
