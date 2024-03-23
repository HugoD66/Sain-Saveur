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
    ingredients_id: ["12", "21", "22", "30"],
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
    ingredients_id: ["3", "43", "44", "30"],
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
    ingredients_id: ["8", "64", "77", "30"],
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
    ingredients_id: ["64", "61", "63", "30"],
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
    ingredients_id: ["51", "56", "57", "30"],
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
    ingredients_id: ["38", "54", "57", "30"],
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
    ingredients_id: ["1", "18", "20", "30"],
  },

  {
    recipe_name: "Curry de lentilles",
    directions: [
      {
        direction_description:
          "Faites revenir un oignon émincé avec de l'ail et du gingembre.",
        direction_number: 1,
      },
      {
        direction_description:
          "Ajoutez les lentilles, le lait de coco et le curry en poudre.",
        direction_number: 2,
      },
      {
        direction_description:
          "Laissez mijoter jusqu'à ce que les lentilles soient tendres.",
        direction_number: 3,
      },
      {
        direction_description: "Servez chaud, garni de coriandre fraîche.",
        direction_number: 4,
      },
    ],
    preparation_time_min: "15",
    cooking_time_min: "45",
    recipe_description: "Un curry végétarien réconfortant et plein de saveurs.",
    recipe_picture: "uploads/curry_lentilles.png",
    type_id: "Vegetarien",
    ingredients_id: ["1", "18", "20", "30"],
  },
  {
    recipe_name: "Lasagnes à la bolognaise",
    directions: [
      {
        direction_description:
          "Faites revenir la viande hachée avec des oignons.",
        direction_number: 1,
      },
      {
        direction_description: "Ajoutez la sauce tomate et laissez mijoter.",
        direction_number: 2,
      },
      {
        direction_description:
          "Montez les lasagnes en alternant pâtes, sauce et béchamel.",
        direction_number: 3,
      },
      {
        direction_description: "Cuisez au four pendant 40 minutes à 180°C.",
        direction_number: 4,
      },
    ],
    preparation_time_min: "30",
    cooking_time_min: "40",
    recipe_description: "Des lasagnes classiques riches et gourmandes.",
    recipe_picture: "uploads/lasagnes_bolognaise.png",
    type_id: "Vegetarien",
    ingredients_id: ["1", "18", "20", "30", "8", "78"],
  },
  {
    recipe_name: "Salade César",
    directions: [
      {
        direction_description:
          "Préparez la sauce César avec du yaourt, de l'ail, et du parmesan.",
        direction_number: 1,
      },
      {
        direction_description:
          "Coupez la salade romaine et mélangez avec la sauce.",
        direction_number: 2,
      },
      {
        direction_description:
          "Ajoutez des croûtons et des morceaux de poulet grillé.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "15",
    cooking_time_min: "10",
    recipe_description: "Une salade César légère et savoureuse.",
    recipe_picture: "uploads/salade_cesar.png",
    type_id: "Vegetarien",
    ingredients_id: ["1", "18", "20", "30", "8", "78"],
  },
  {
    recipe_name: "Crêpes sucrées",
    directions: [
      {
        direction_description:
          "Mélangez la farine, les œufs, le lait et une pincée de sel.",
        direction_number: 1,
      },
      {
        direction_description: "Laissez reposer la pâte 1 heure.",
        direction_number: 2,
      },
      {
        direction_description:
          "Cuisez les crêpes dans une poêle chaude huilée.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "10",
    cooking_time_min: "20",
    recipe_description: "Des crêpes légères à garnir selon vos envies.",
    recipe_picture: "uploads/crepes_sucrees.png",
    type_id: "Vegetarien",
    ingredients_id: ["1", "18", "20", "30", "8", "78"],
  },
  {
    recipe_name: "Gazpacho",
    directions: [
      {
        direction_description:
          "Mixez des tomates, un concombre, un poivron vert, de l'ail, et du pain rassis.",
        direction_number: 1,
      },
      {
        direction_description:
          "Ajoutez du vinaigre et de l'huile d'olive, puis assaisonnez.",
        direction_number: 2,
      },
      {
        direction_description: "Réfrigérez au moins 2 heures avant de servir.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "15",
    cooking_time_min: "0",
    recipe_description: "Un potage froid espagnol rafraîchissant et léger.",
    recipe_picture: "uploads/gazpacho.png",
    type_id: "Vegetarien",
    ingredients_id: ["1", "18", "20", "30", "8", "78"],
  },

  {
    recipe_name: "Soupe de potiron",
    directions: [
      {
        direction_description:
          "Coupez le potiron en cubes et faites-le revenir avec de l'oignon.",
        direction_number: 1,
      },
      {
        direction_description:
          "Ajoutez du bouillon de légumes et laissez mijoter.",
        direction_number: 2,
      },
      {
        direction_description:
          "Mixez la soupe jusqu'à obtenir une texture lisse.",
        direction_number: 3,
      },
      {
        direction_description:
          "Servez chaud avec une cuillère de crème fraîche.",
        direction_number: 4,
      },
    ],
    preparation_time_min: "20",
    cooking_time_min: "30",
    recipe_description:
      "Une soupe onctueuse parfaite pour les soirées d'automne.",
    recipe_picture: "uploads/soupe_potiron.png",
    type_id: "Vegetarien",
    ingredients_id: ["1", "18", "20", "30", "8", "78"],
  },
  {
    recipe_name: "Tarte aux pommes",
    directions: [
      {
        direction_description:
          "Étalez la pâte dans un moule à tarte et piquez le fond avec une fourchette.",
        direction_number: 1,
      },
      {
        direction_description: "Disposez les pommes tranchées sur la pâte.",
        direction_number: 2,
      },
      {
        direction_description:
          "Saupoudrez de sucre et de cannelle avant de cuire au four.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "30",
    cooking_time_min: "45",
    recipe_description: "Une tarte traditionnelle gourmande et croustillante.",
    recipe_picture: "uploads/tarte_pommes.png",
    type_id: "Vegetarien",
    ingredients_id: ["1", "18", "20", "30", "8", "78"],
  },
  {
    recipe_name: "Bœuf bourguignon",
    directions: [
      {
        direction_description:
          "Faites dorer les morceaux de bœuf dans une cocotte.",
        direction_number: 1,
      },
      {
        direction_description:
          "Ajoutez des oignons, des carottes et du vin rouge.",
        direction_number: 2,
      },
      {
        direction_description:
          "Laissez mijoter à feu doux pendant plusieurs heures.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "20",
    cooking_time_min: "180",
    recipe_description: "Un plat traditionnel français, riche et savoureux.",
    recipe_picture: "uploads/boeuf_bourguignon.png",
    type_id: "Vegetarien",
    ingredients_id: ["1", "18", "20", "30", "8", "78"],
  },

  {
    recipe_name: "Gaspacho andalou",
    directions: [
      {
        direction_description:
          "Mixez les tomates, le poivron, le concombre, et l'ail jusqu'à obtenir un mélange lisse.",
        direction_number: 1,
      },
      {
        direction_description:
          "Ajoutez du vinaigre, de l'huile d'olive, salez et poivrez selon le goût.",
        direction_number: 2,
      },
      {
        direction_description:
          "Laissez reposer au réfrigérateur pendant au moins 2 heures avant de servir bien frais.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "15",
    cooking_time_min: "0",
    recipe_description:
      "Un potage froid espagnol, parfait pour les chaudes journées d'été.",
    recipe_picture: "uploads/gaspacho_andalou.png",
    type_id: "Vegetarien",
    ingredients_id: ["1", "18", "20", "30", "8", "78"],
  },
  {
    recipe_name: "Risotto aux champignons",
    directions: [
      {
        direction_description:
          "Faites revenir les champignons et l'oignon dans du beurre jusqu'à ce qu'ils soient dorés.",
        direction_number: 1,
      },
      {
        direction_description:
          "Ajoutez le riz et laissez-le devenir translucide avant de verser le vin blanc.",
        direction_number: 2,
      },
      {
        direction_description:
          "Incorporez petit à petit le bouillon de légumes chaud, jusqu'à cuisson complète du riz.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "10",
    cooking_time_min: "30",
    recipe_description: "Un plat italien crémeux riche en saveurs.",
    recipe_picture: "uploads/risotto_champignons.png",
    type_id: "Vegetarien",
    ingredients_id: ["1", "18", "20", "30", "8", "78"],
  },
  {
    recipe_name: "Ceviche péruvien",
    directions: [
      {
        direction_description:
          "Coupez le poisson en petits dés et placez-le dans un grand bol.",
        direction_number: 1,
      },
      {
        direction_description:
          "Ajoutez le jus de citron vert, l'oignon rouge émincé, le piment et la coriandre.",
        direction_number: 2,
      },
      {
        direction_description:
          "Laissez mariner au réfrigérateur pendant environ 20 minutes avant de servir.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "25",
    cooking_time_min: "0",
    recipe_description:
      "Un plat frais à base de poisson cru, mariné dans du jus de citron.",
    recipe_picture: "uploads/ceviche_peruvien.png",
    type_id: "Vegetarien",
    ingredients_id: ["1", "18", "20", "30", "8", "78"],
  },
  {
    recipe_name: "Brownies au chocolat",
    directions: [
      {
        direction_description:
          "Faites fondre le chocolat et le beurre au bain-marie.",
        direction_number: 1,
      },
      {
        direction_description:
          "Incorporez le sucre, les œufs et ensuite la farine.",
        direction_number: 2,
      },
      {
        direction_description:
          "Versez la pâte dans un moule et faites cuire au four préchauffé.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "15",
    cooking_time_min: "25",
    recipe_description:
      "Des carrés de chocolat fondant avec une croûte craquante.",
    recipe_picture: "uploads/brownies_chocolat.png",
    type_id: "Vegetarien",
    ingredients_id: ["1", "18", "20", "30", "8", "78"],
  },

  {
    recipe_name: "Pancakes moelleux",
    directions: [
      {
        direction_description:
          "Dans un bol, mélangez la farine, le sucre, la levure, et une pincée de sel.",
        direction_number: 1,
      },
      {
        direction_description:
          "Ajoutez les œufs, le lait et le beurre fondu. Mélangez jusqu'à obtenir une pâte lisse.",
        direction_number: 2,
      },
      {
        direction_description:
          "Faites cuire les pancakes dans une poêle chaude légèrement huilée jusqu'à ce qu'ils soient dorés de chaque côté.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "10",
    cooking_time_min: "15",
    recipe_description:
      "Des pancakes aériens et moelleux pour un petit-déjeuner gourmand.",
    recipe_picture: "uploads/pancakes_moelleux.png",
    type_id: "Vegetarien",
    ingredients_id: ["1", "18", "20", "30", "8", "78"],
  },
  {
    recipe_name: "Tajine de poulet aux pruneaux",
    directions: [
      {
        direction_description:
          "Faites dorer les morceaux de poulet dans une cocotte avec de l'huile d'olive.",
        direction_number: 1,
      },
      {
        direction_description:
          "Ajoutez les oignons émincés, les épices, les pruneaux, et un peu d'eau. Couvrez et laissez mijoter.",
        direction_number: 2,
      },
      {
        direction_description:
          "Servez le tajine bien chaud, accompagné de couscous.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "20",
    cooking_time_min: "60",
    recipe_description: "Un plat sucré-salé marocain, riche en saveurs.",
    recipe_picture: "uploads/tajine_poulet_pruneaux.png",
    type_id: "Vegetarien",
    ingredients_id: ["1", "18", "20", "30", "8", "78"],
  },
  {
    recipe_name: "Salade de quinoa aux légumes",
    directions: [
      {
        direction_description:
          "Rincez et faites cuire le quinoa comme indiqué sur le paquet.",
        direction_number: 1,
      },
      {
        direction_description:
          "Coupez les légumes de votre choix en petits dés et faites-les revenir rapidement.",
        direction_number: 2,
      },
      {
        direction_description:
          "Mélangez le quinoa cuit, les légumes, et assaisonnez avec du jus de citron, de l'huile d'olive, du sel et du poivre.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "15",
    cooking_time_min: "20",
    recipe_description:
      "Une salade de quinoa fraîche et nourrissante, idéale pour un déjeuner léger.",
    recipe_picture: "uploads/salade_quinoa_legumes.png",
    type_id: "Vegetarien",
    ingredients_id: ["1", "18", "20", "30", "8", "78"],
  },
  {
    recipe_name: "Gratin de pâtes au fromage",
    directions: [
      {
        direction_description:
          "Faites cuire les pâtes al dente dans une casserole d'eau bouillante salée.",
        direction_number: 1,
      },
      {
        direction_description:
          "Dans un saladier, mélangez les pâtes avec de la crème fraîche, du fromage râpé, du sel et du poivre.",
        direction_number: 2,
      },
      {
        direction_description:
          "Versez le tout dans un plat à gratin et saupoudrez de fromage râpé supplémentaire. Faites gratiner au four jusqu'à ce que le dessus soit doré.",
        direction_number: 3,
      },
    ],
    preparation_time_min: "15",
    cooking_time_min: "20",
    recipe_description:
      "Un gratin de pâtes croustillant sur le dessus et fondant à l'intérieur.",
    recipe_picture: "uploads/gratin_pates_fromage.png",
    type_id: "Vegetarien",
    ingredients_id: ["1", "18", "20", "30", "8", "78"],
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
