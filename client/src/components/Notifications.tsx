import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { RecipeModel } from "../models/Recipe";
import { UserModel } from "../models/User";

interface Notification {
  title: string;
  content: UserModel | RecipeModel | string;
  date: string;
  seen: boolean;
}

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:4700");

    socket.on(
      "notification",
      (notificationData: {
        type: "user" | "recipe" | "user-welcome";
        title: string;
        content: UserModel | RecipeModel;
        date: string;
      }) => {
        const newNotification: Notification = {
          ...notificationData,
          seen: false,
        };
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          newNotification,
        ]);
      },
    );

    return () => {
      socket.off("newUserNotification");
    };
  }, []);

  const handleNotificationClick = (index: number) => {
    // Marquez la notification comme vue
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification, i) =>
        i === index ? { ...notification, seen: true } : notification,
      ),
    );
  };

  return (
    <div>
      {notifications
        .filter((notification) => !notification.seen)
        .map((notification, index) => (
          <div key={index} onClick={() => handleNotificationClick(index)}>
            <strong>{notification.title}</strong>
            <small>{notification.date}</small>
          </div>
        ))}
    </div>
  );
};

export default NotificationComponent;
