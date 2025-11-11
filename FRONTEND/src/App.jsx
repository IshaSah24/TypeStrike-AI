// src/App.jsx
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";
import { fetchCurrentUser } from "./features/auth/authSlice";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();

  // keep socket in a ref so re-renders don't recreate it

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  // connect socket after component mounts

  if (!isAuthenticated) {
    console.log("User is not authenticated");
    console.log(user);
  }

  return <RouterProvider router={router} />;
}

export default App;
