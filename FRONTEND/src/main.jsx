// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { FinalDomProvider } from "./context/FinalDomContext.jsx";
// import { AuthProvider } from "./context/authContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <FinalDomProvider>
        <RouterProvider router={router} />
      </FinalDomProvider>
    </ThemeProvider>
  </React.StrictMode>
);
