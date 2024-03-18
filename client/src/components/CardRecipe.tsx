import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface CardRecipeProps {
  name: string;
}

// interface CardRecipeProps {
//   name: string;
//   ingredients: {
//     food_name: string;
//     ingredient_description: string;
//     ingredient_url: string;
//     measurement_description: string;
//     number_of_units: string;
//     serving_id: string;
//   };
//   preparation_time_min: string;
//   cooking_time_min: string;
//   rating: string;
//   recipe_description: string;
//   recipe_id: string;
//   recipe_images: [
//     {
//       url: string;
//     },
//   ];
//   recipe_url: string;
//   serving_sizes: [
//     {
//       calcium: string;
//       calories: string;
//       carbohydrate: string;
//       cholesterol: string;
//       fat: string;
//       fiber: string;
//       iron: string;
//       monounsaturated_fat: string;
//       polyunsaturated_fat: string;
//       potassium: string;
//       protein: string;
//       saturated_fat: string;
//       serving_size: string;
//       sodium: string;
//       sugar: string;
//       trans_fat: string;
//       vitamin_a: string;
//       vitamin_c: string;
//     },
//   ];
//   creator: string;
// }

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
