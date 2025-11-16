import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";

const getStoredUser = () => {
  const stored = localStorage.getItem("user");
  if (!stored) return null; 
  try {
    return JSON.parse(stored); 
  } catch {
    return null; // agar corrupt JSON ho
  }
};

const preloadedState = {
  auth: {
    user: getStoredUser(),
    isAuthenticated: !!getStoredUser(),
    loading: false,
    error: null,
  }
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
});

export default store;
