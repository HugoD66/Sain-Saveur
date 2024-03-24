import React from "react";
import { Notification } from "../notifications/NotificationsType";
import ClosePicture from "../assets/close.png";
import { useNavigate } from "react-router";
import recipePicture from "../assets/recipe.png";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, notifications }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const renderNotificationContent = (notification: Notification) => {
    switch (notification.type) {
      case "user":
        return (
          <>
            <p className="description-notif">
              Pseudo: {notification.content.pseudo}
            </p>
            <p className="description-notif">
              Email: {notification.content.email}
            </p>
          </>
        );
      case "recipe":
        return (
          <>
            <p
              className="description-notif-recipe"
              onClick={() => navitageOnRecipe(notification.content.recipeId)}
            >
              <img src={recipePicture} alt="" className="icon-detail-recipe" />
              Nom de la recette: {notification.content.recipeName}
            </p>
          </>
        );
      case "user-welcome":
        return (
          <>
            <p>Bienvenu sur l'application ! </p>
          </>
        );
      default:
        return <p>Notification inconnue</p>;
    }
  };
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };
  const navitageOnRecipe = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          <img src={ClosePicture} alt="Close" className="close-modal-icon" />
        </button>
        <h2>Vos dernières notifications</h2>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="notification-unit">
              <h3>{notification.title}</h3>
              {renderNotificationContent(notification)}
              <p className="date">{formatDate(notification.date)}</p>
            </div>
          ))
        ) : (
          <p>Aucune notification.</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
