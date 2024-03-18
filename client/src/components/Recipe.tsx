import React, { useEffect } from 'react';
import TitleCategory from './TitleCategory';
import { CardRecipe } from './CardRecipe';

export const Recipe = () => {
  //ex
  const recipes = [
    { name: 'Recipe 1' },
    { name: 'Recipe 2' },
    { name: 'Recipe 3' },
    { name: 'Recipe 4' },
    { name: 'Recipe 5' },
    { name: 'Recipe 6' },
    { name: 'Recipe 7' },
    { name: 'Recipe 8' },
    { name: 'Recipe 9' },
    { name: 'Recipe 10' },
    { name: 'Recipe 11' },
    { name: 'Recipe 12' },
    { name: 'Recipe 13' },
    { name: 'Recipe 14' },
    { name: 'Recipe 15' },
    { name: 'Recipe 16' },
    { name: 'Recipe 17' },
    { name: 'Recipe 18' },
    { name: 'Recipe 19' },
    { name: 'Recipe 20' },
  ];

  return (
    <div>
      <TitleCategory title={'Nos Recettes'} />
      <div className="cards-container">
        {recipes.map((recipe, index) => (
          <CardRecipe key={index} name={recipe.name} />
        ))}
      </div>
    </div>
  );
};
