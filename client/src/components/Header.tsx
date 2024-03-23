// Dans Header.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Modal from "./Modal";
import Logo from "../logo.svg";
import { Link } from "react-router-dom";
import { Notification } from "../notifications/NotificationsType";
import { useNavigate } from "react-router";
export const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:4700");
    socket.on("notification", (notification: Notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    });
    return () => {
      socket.off("notification");
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
        <button onClick={() => setIsModalOpen(true)}>
          Notifications ({notifications.length})
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notifications={notifications}
      />
    </div>
  );
};
