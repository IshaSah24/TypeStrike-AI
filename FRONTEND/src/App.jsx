// src/App.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";
import { fetchCurrentUser } from "./features/auth/authSlice";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (!isAuthenticated) {
    console.log("User is not authenticated");
    console.log(user);
  }
  
  return <RouterProvider router={router} />;
}

export default App;