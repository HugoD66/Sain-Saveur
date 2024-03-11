import React from 'react';

interface CardRecipeProps {
  name: string;
  // image: string;
  // creator: string;
}

export const CardRecipe: React.FC<CardRecipeProps> = ({ name }) => {
  return (
    <div className="card">
      {/* <img
        src={'../assets/background2.jpg'} //image
        alt={name}
        className="recipe-image"
      /> */}

      <div className="card-hidden">
        <p className="title-in">{name}</p>
        <button className="button">View Recipe</button>
      </div>
    </div>
  );
};
