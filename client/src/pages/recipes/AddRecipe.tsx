import React from "react";

const AddRecipe = () => {
  return (
    <>
      <div className="content-form">
        <form>
          <label>
            Temps de cuisson
            <input type="text" name="cooking_time_min" />
          </label>

          <label>
            Temps de préparation
            <input type="text" name="preparation_time_min" />
          </label>

          <label>
            Description
            <textarea name="preparation_time_min" />
          </label>

          <label>
            Nom
            <input type="text" name="recipe_name" />
          </label>

          <label>
            Type de plat
            <input type="text" name="recipe_type" />
          </label>

          <input type="submit" value="Envoyer" />
        </form>
      </div>
      <div className="back-form"></div>
    </>
  );
};

export default AddRecipe;
