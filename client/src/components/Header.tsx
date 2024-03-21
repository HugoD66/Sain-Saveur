import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import Logo from "../logo.svg";
import searchIcon from "../assets/searchIcon.svg";
import { RecipeModel } from "../models/Recipe";
import { useNavigate } from "react-router";

const socket = io("http://localhost:4700");

export const Header = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<RecipeModel[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeModel | null>(
    null,
  );

  useEffect(() => {
    socket.on("recipeCreated", (message) => {
      const data = JSON.parse(message);
      const newRecipe: RecipeModel = data.recipe;
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newRecipe,
      ]);
    });

    return () => {
      socket.off("recipeCreated");
    };
  }, []);

  const navigateToHomePage = () => {
    navigate("/homePage");
  };
  return (
    <div className="header">
      <div className="logoPannel" onClick={() => navigateToHomePage()}>
        <img className="logo" src={Logo} alt="Logo" />
        <p className="logoName">Sain Saveur</p>
      </div>
      <div className="pagePannel">
        <Link to="/add-recipe">
          <button className="add-recipe">Ajouter une recette</button>
        </Link>
      </div>
      <div className="loginPannel">
        {notifications.length > 0 && (
          <div
            className="notification-icon"
            onClick={() => setSelectedRecipe(notifications[0])}
          >
            {notifications.length}
          </div>
        )}
      </div>
      {selectedRecipe && (
        <Modal
          isOpen={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        >
          <h2>{selectedRecipe.recipe_name}</h2>
        </Modal>
      )}
    </div>
  );
};
