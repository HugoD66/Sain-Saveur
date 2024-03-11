const express = require("express");
const router = express.Router();
const {
  getRecipe,
  getRecipes,
  addRecipe,
  removeRecipe,
  removeAllRecipes,
} = require("../calls/callRecipes");

router.get("/:recipeId", getRecipe);
router.get("/", getRecipes);
router.post("/add", addRecipe);
router.delete("/:recipeId", removeRecipe);
router.delete("/", removeAllRecipes);

module.exports = router;
