import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/router";
import React, { useEffect } from "react";

import io from "socket.io-client";
const socket = io("http://localhost:4700");

const App: React.FC = () => {
  useEffect(() => {
    socket.on("notification", (notification) => {
      console.log("Notification reçue:", notification);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  if (localStorage.getItem("token")) {
    console.log(localStorage.getItem("token"));
  } else {
  }
  return <RouterProvider router={router} />;
};

export default App;
