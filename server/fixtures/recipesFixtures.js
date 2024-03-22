const mongoose = require("mongoose");
const Recipe = require("../models/RecipeModel");
const Type = require("../models/TypeModel");
const Ingredient = require("../models/IngredientModel");

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
    recipe_description:
      "Un délicieux poulet au curry, parfait pour un repas en famille.",
    recipe_picture: "uploads/poulet_curry.jpg",
    type_id: "1",
    ingredients_id: ["12", "21", "22"],
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
    recipe_picture: "uploads/quiche_epinards.jpg",
    type_id: "Vegetarien",
    ingredients_id: ["3", "43", "44"],
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
    recipe_description: "Des sushis Maki frais et délicieux.",
    recipe_picture: "uploads/sushi_maki.jpg",
    type_id: "Japonaise",
    ingredients_id: ["8", "64", "77"],
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
    recipe_description: "Un plat végétarien riche en couleurs et en saveurs.",
    recipe_picture: "uploads/ratatouille_nicoise.jpg",
    type_id: "Vegetarien",
    ingredients_id: ["64", "61", "63"],
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
    recipe_picture: "uploads/falafels.jpg",
    type_id: "Végan",
    ingredients_id: ["51", "56", "57"],
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
    recipe_description:
      "Un classique de la cuisine thaïlandaise, riche en saveurs.",
    recipe_picture: "uploads/pad_thai.jpg",
    type_id: "Thaï",
    ingredients_id: ["38", "54", "57"],
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
    recipe_picture: "uploads/pizza_sans_gluten.jpg",
    type_id: "Sans gluten",
    ingredients_id: ["1", "18", "20"],
  },
];

async function insertRecipes() {
  try {
    const types = await Type.find({});
    const ingredients = await Ingredient.find({});

    if (types.length === 0 || ingredients.length === 0) {
      throw new Error("Types ou ingrédients non trouvés.");
    }

    const modifiedRecipes = recipes.map((recipe) => {
      const type = types[Math.floor(Math.random() * types.length)];

      const selectedIngredientIds = recipe.ingredients_id
        .map((tempId) => {
          const foundIngredient = ingredients.find(
            (ingredient) => ingredient.ingredient_id === tempId,
          );
          return foundIngredient ? foundIngredient._id : null;
        })
        .filter((id) => id !== null);
      return {
        ...recipe,
        recipe_types: type._id,
        recipe_ingredients: selectedIngredientIds,
      };
    });

    const createdRecipes = await Recipe.insertMany(modifiedRecipes);
    console.log(`Recettes ajoutées avec succès: ${createdRecipes.length}`);
  } catch (error) {
    console.error("Erreur lors de l'ajout des recettes:", error);
  }
}

module.exports = insertRecipes;
