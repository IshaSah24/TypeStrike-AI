import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, fetchCurrentUser } from "../../features/auth/authSlice";

const LandingAuthBtns = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🧠 Get avatar letter
  const avatarLetter = useMemo(() => {
    if (!user) return "";
    const source = user.name?.trim() || user.email?.trim() || "";
    return source.charAt(0).toUpperCase();
  }, [user]);

  // 🔄 Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 📡 Fetch current user on page load
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    setOpen(false);
    navigate({ to: "/" });
  };

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
    );
  }

  // ❌ Not logged in
  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-3">
        <button
          onClick={() => navigate({ to: "/login" })}
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-1.5 text-sm transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate({ to: "/login" })}
          className="border border-gray-400 bg-black text-white px-3 py-1.5 text-sm rounded-full hover:bg-gray-900 transition"
        >
          Sign Up
        </button>
      </div>
    );
  }

  // ✅ Logged in
  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="User menu"
        aria-expanded={open}
        className="w-10 h-10 bg-gradient-to-br from-neutral-700 to-neutral-800
                   rounded-full border border-neutral-600/30 flex items-center
                   justify-center text-white text-sm hover:scale-105 transition"
      >
        {avatarLetter}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-2">
          <p className="px-3 py-2 text-sm border-b">{user.name || user.email}</p>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingAuthBtns;
