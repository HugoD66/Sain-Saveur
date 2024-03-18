import React from 'react';
import TitleCategory from './TitleCategory';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import { CardRecipe } from './CardRecipe';

export const CarrousselRecipe = () => {
  return (
    <div className="carrousselRecipe">
      <TitleCategory title={'Nos 10 dernières recettes'} />
      <ScrollingCarousel>
        <CardRecipe name={'Salade'} />
        <CardRecipe name={'Poulet'} />
        <CardRecipe name={'Poisson'} />
        <CardRecipe name={'Dessert'} />
        <CardRecipe name={'Boisson'} />
        <CardRecipe name={'Boisson'} />
        <CardRecipe name={'Boisson'} />
        <CardRecipe name={'Boisson'} />
        <CardRecipe name={'Boisson'} />
        <CardRecipe name={'Boisson'} />
      </ScrollingCarousel>
    </div>
  );
};
