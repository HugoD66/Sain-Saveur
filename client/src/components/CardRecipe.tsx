import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface CardRecipeProps {
  name: string;
  // image: string;
  // creator: string;
}

export const CardRecipe: React.FC<CardRecipeProps> = ({ name }) => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  return (
    <div data-aos="fade-up" className="card">
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
