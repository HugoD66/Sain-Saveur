import { IngredientModel } from "./Ingredient";
import { TypeModel } from "./Type";

export interface DirectionModel {
  direction_description?: string;
  direction_number?: number;
}
export interface RecipeModel {
  recipe_id?: string;
  recipe_name: string;
  directions?: DirectionModel[];
  preparation_time_min?: string;
  cooking_time_min?: string;
  isFavorite?: boolean;
  recipe_description?: string;
  recipe_picture?: string;
  recipe_ingredients?: IngredientModel[];
  recipe_types?: TypeModel[];
}
