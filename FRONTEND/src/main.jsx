
import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "./context/ThemeContext.jsx";
import { FinalDomProvider } from "./context/FinalDomContext.jsx";
import { TypingGameProvider } from "./context/TypingGameContext.jsx"; 

import store from "./redux/store.js";
import { router } from "./routes.jsx";
import { RouterProvider } from "@tanstack/react-router";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { MultiplayerProvider } from "./context/MultiplayerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <FinalDomProvider>
        <MultiplayerProvider>
          <TypingGameProvider>
            <App />
          </TypingGameProvider>
        </MultiplayerProvider>
      </FinalDomProvider>
    </ThemeProvider>
  </Provider>
);