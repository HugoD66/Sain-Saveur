const express = require("express");
const router = express.Router();
const {
  getIngredients,
  getIngredient,
  addIngredient,
  removeIngredient,
  removeIngredients,
} = require("../calls/callIngredients");

router.get("/:Ingredient_id", getIngredient);
router.get("/", getIngredients);
router.post("/add", addIngredient);
router.delete("/:IngredientId", removeIngredient);
router.delete("/", removeIngredients);

module.exports = router;
