import React, { useState, useEffect } from 'react';
import { fetchExternalRecipes, fetchLocalRecipes, removeRecipe } from '../calls/services/recipe';

const RecipesDisplay = () => {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Charger les recettes externes ou locales
    const loadRecipes = async () => {
        setLoading(true);
        try {
            const externalRecipes = await fetchExternalRecipes();
            const localRecipes = await fetchLocalRecipes();
            setRecipes([...externalRecipes, ...localRecipes]);
        } catch (error) {
            console.error("Erreur lors du chargement des recettes :", error);
        } finally {
            setLoading(false);
        }
    };

    // Supprimer une recette
    const handleRemoveRecipe = async (recipeId: number) => {
        try {
            await removeRecipe(recipeId);
            loadRecipes();
        } catch (error) {
            console.error("Erreur lors de la suppression de la recette :", error);
        }
    };

    useEffect(() => {
        loadRecipes();
    }, []);

    if (loading) return <div>Chargement des recettes...</div>;

    return (
        <div>
            <h1>Liste des Recettes</h1>
            {recipes.map((recipe) => (
                <div key={recipe.recipe_id}>
                    <h2>{recipe.recipe_name}</h2>
                    <p>{recipe.recipe_description}</p>
                    <p>{recipe.recipe_origin}</p>
                    <p>{recipe.recipe_type}</p>
                    <p>{recipe.recipe_ingredients}</p>
                    <p>{recipe.recipe_instructions}</p>
                    <p>{recipe.recipe_image}</p>
                    <button onClick={() => handleRemoveRecipe(recipe.recipe_id)}>Supprimer</button>
                </div>
            ))}
        </div>
    );
};

export default RecipesDisplay;