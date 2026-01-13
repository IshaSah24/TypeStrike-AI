import React, { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useRoomSocket } from "../hooks/useRoomSocket";

const MULTIPLAYER_PATHS = [/^\/play\/multiplayer/, /^\/play\/bot/, /^\/multiplayer\/area/];

const Layout = ({ children }) => {
  const { location } = useRouterState();
  const { connectSocket, disconnectSocket } = useRoomSocket();

  useEffect(() => {
    const isMultiplayerRoute = MULTIPLAYER_PATHS.some((regex) =>
      regex.test(location.pathname)
    );
    if (isMultiplayerRoute) {
      connectSocket();
    } else {
      disconnectSocket();
    }
  }, [location.pathname, connectSocket, disconnectSocket]);

  return (
    <div className="min-h-screen bg-red-300" id="app">
      {children}
    </div>
  );
};

export default Layout;