import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/router";
import React, { useEffect } from "react";

//Mise en place socketIo
import io from "socket.io-client";
const socket = io("http://localhost:4700");

const App: React.FC = () => {
  useEffect(() => {
    socket.on("userLoggedIn", (data) => {
      console.log("Un utilisateur s'est connecté:", data);
    });

    return () => {
      socket.off("userLoggedIn");
    };
  }, []);

  if (localStorage.getItem("token")) {
    console.log(localStorage.getItem("token"));
  } else {
  }
  return <RouterProvider router={router} />;
};

export default App;
