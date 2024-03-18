import React from 'react';
import { Header } from '../components/Header';
import { Searchbar } from '../components/Searchbar';
import { CarrousselRecipe } from '../components/CarrousselRecipe';
import { Recipe } from '../components/Recipe';

interface HomePageProps {
  onLoginClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLoginClick }) => {
  return (
    <div className="homePage">
      <Header />
      <Searchbar />
      <CarrousselRecipe />
      <Recipe />
    </div>
  );
};

export default HomePage;
