import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Modal from "./Modal";
import Logo from "../logo.svg";
import { Link } from "react-router-dom";
import { Notification } from "../notifications/NotificationsType";
import { useNavigate } from "react-router";
import NotifGif from "../assets/notif.gif";
import NotifDown from "../assets/notif-down.png";
import Settings from "../assets/settings.png";
import UserInfos from "./UserInfos";

export const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isModalOpenSettings, setIsModalOpenSettings] = useState(false);

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
  const unseenNotificationsCount = notifications.filter(
    (notif) => !notif.seen
  ).length;

  const markNotificationsAsSeen = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, seen: true }))
    );
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
        <div className="loginPannel">
          <button
            className="notificationButton"
            onClick={() => setIsModalOpen(true)}
          >
            {unseenNotificationsCount > 0 ? (
              <>
                <img
                  src={NotifGif}
                  alt="Notifications"
                  className="notifPicture"
                />
                <span className="notifCount">{unseenNotificationsCount}</span>
              </>
            ) : (
              <img
                src={NotifDown}
                alt="No Notifications"
                className="notifPicture"
              />
            )}
          </button>
        </div>
      </div>
      <div className="loginPannel">
        <div className="loginPannel">
          <button
            className="notificationButton"
            onClick={() => setIsModalOpenSettings(true)}
          >
            <img src={Settings} alt="Settings" className="notifPicture" />
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          markNotificationsAsSeen();
        }}
        notifications={notifications.filter(
          (notification) => !notification.seen
        )}
      />
      <UserInfos
        isOpen={isModalOpenSettings}
        onClose={() => {
          setIsModalOpenSettings(false);
        }}
      />
    </div>
  );
};
