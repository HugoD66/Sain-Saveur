const express = require("express");
const router = express.Router();
const { upload } = require("../calls/picture/multer");
const {
  getRecipe,
  getRecipes,
  addRecipe,
  removeRecipe,
  removeAllRecipes,
  updateRecipe,
  getRecipesByIngredient,
  getRecipesByType,
} = require("../calls/callRecipes");

router.get("/:recipeId", getRecipe);
router.get("/", getRecipes);
router.get("/by-ingredient/:ingredientId", getRecipesByIngredient);
router.get("/by-type/:typeId", getRecipesByType);
router.post("/add", upload.single("recipe_picture"), addRecipe);
router.patch("/update/:recipeId", updateRecipe);
router.delete("/:recipeId", removeRecipe);
router.delete("/", removeAllRecipes);

module.exports = router;
