import React from "react";
import { Notification } from "../notifications/NotificationsType";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, notifications }) => {
  if (!isOpen) return null;

  const renderNotificationContent = (notification: Notification) => {
    switch (notification.type) {
      case "user":
        return (
          <>
            <p>Pseudo: {notification.content.pseudo}</p>
            <p>Email: {notification.content.email}</p>
          </>
        );
      case "recipe":
        return (
          <>
            <p>Nom de la recette: {notification.content.recipeName}</p>
          </>
        );
      default:
        return <p>Notification inconnue</p>;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        <h2>Notifications</h2>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="notification">
              <h3>{notification.title}</h3>
              {renderNotificationContent(notification)}
              <p>Date: {notification.date}</p>
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
