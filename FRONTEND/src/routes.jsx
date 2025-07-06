// src/routes.jsx
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import LandingPage from "./components/components/LandingPage";
import { Outlet } from "@tanstack/react-router";

// Root Layout
const RootRoute = createRootRoute({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
  notFoundComponent: () => (
    <div className="text-center mt-40 text-2xl text-gray-500">
      404 - Page Not Found
    </div>
  ),
});

// /login route
const LoginRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/login",
  component: LoginPage,
});

// /register route
const RegisterRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/register",
  component: RegisterPage,
});

// Add route for "/"
const HomeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",
  component: LandingPage,
});

const TypingAreaRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/typing",
  component: Home,
});

// Setup router
export const router = createRouter({
  routeTree: RootRoute.addChildren([LoginRoute, RegisterRoute,HomeRoute,TypingAreaRoute]),
});
