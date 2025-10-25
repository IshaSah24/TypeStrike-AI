import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";

// Safe function to get user from localStorage
const getStoredUser = () => {
  const stored = localStorage.getItem("user");
  if (!stored) return null; // agar null ya undefined ho to
  try {
    return JSON.parse(stored); // valid JSON parse
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
