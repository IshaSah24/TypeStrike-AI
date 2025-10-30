// src/routes.jsx
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import LoginPage from "./pages/LoginPage";

import LandingPage from "./components/components/LandingPage";
import { Outlet } from "@tanstack/react-router";
import Layout from "./context/Layout";
import ComingSoon from "./pages/ComingSoon";
import ShowWpm from "./components/components/ShowWpm";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import CreateJoinRoomPage from "./pages/CreateJoinRoomPage.jsx";
import SinglePlayerHome from "./components/components/multiplayer/SinglePlayerHome.jsx";
import MultiplayerHome from "./components/components/multiplayer/MultiplayerHome.jsx";
import MultiplayerTypingArea from "./pages/MultiplayerTypingArea.jsx";
import InRoom from "./components/components/multiplayer/Lobby/InRoom.jsx";

// Root Layout
const RootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
  notFoundComponent: () => (
    <div className="text-center mt-40 text-2xl text-gray-500">
      404 - Page Not Found
    </div>
  ),
});

// Routes
const LoginRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/login",
  component: LoginPage,
});

const HomeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: LandingPage,
});

const ShowWpmRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/wpm",
  component: ShowWpm,
});

const SinglePlayerRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/play/single",
  component: SinglePlayerHome,
});
const MultiplayerTypingAreaRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/multiplayer/area",
  component: MultiplayerTypingArea,
});
const InRoomRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/multiplayer/area/inroom",
  component: InRoom,
});

const MultiplayerLobbyRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/play/multiplayer",
  component: () => (
    <ProtectedRoute>
      <CreateJoinRoomPage />
    </ProtectedRoute>
  ),
});

const MultiplayerGameRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/play/multiplayer/game",
  component: () => (
    <ProtectedRoute>
      <MultiplayerHome />
    </ProtectedRoute>
  ),
});

// Setup router
export const router = createRouter({
  routeTree: RootRoute.addChildren([
    LoginRoute,
    HomeRoute,
    ShowWpmRoute,
    SinglePlayerRoute,
    MultiplayerLobbyRoute,
    MultiplayerGameRoute,
    MultiplayerTypingAreaRoute,
    InRoomRoute
  ]),
});