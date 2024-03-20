import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Searchbar } from "../../components/Searchbar";
import { CarrousselRecipe } from "../../components/CarrousselRecipe";
import { Recipe } from "../../components/Recipe";
import { fetchRecipes } from "../../calls/mongo/recipe";
import { RecipeModel } from "../../models/Recipe";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);

  useEffect(() => {
    fetchRecipes()
      .then((data: RecipeModel[]) => {
        const reversedData = [...data].reverse();
        console.log(reversedData);
        setRecipes(reversedData);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="homePage">
      <Header />
      <Searchbar />
      <CarrousselRecipe recipes={recipes} />
      <Recipe />
    </div>
  );
};

export default HomePage;
