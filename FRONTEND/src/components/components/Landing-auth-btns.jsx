import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";

const LandingAuthBtns = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth || {});
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const avatarLetter = React.useMemo(() => {
    return (user?.name ?? user?.email ?? "?").charAt(0).toUpperCase();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate({ to: "/" });
  };

  // auto-close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------- CASE 1: not logged in ----------
  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-3">
        <button
          onClick={() => navigate({ to: "/login" })}
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-1.5 text-sm transition-colors"
        >
          Login
        </button>

        <button
          onClick={() => navigate({ to: "/login" })}
          className="border border-gray-400 bg-black dark:bg-[#0009] text-white px-3 py-1.5 text-sm rounded-full transition-colors hover:bg-gray-900 dark:hover:bg-gray-900"
        >
          Sign Up
        </button>
      </div>
    );
  }

  // ---------- CASE 2: logged in but user not loaded yet ----------
  // if (isAuthenticated && !user) {
  //   return (
  //     <div className="fixed top-6 right-6 z-50">
  //       <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
  //     </div>
  //   );
  // }

  // ---------- CASE 3: logged in and user exists ----------
  // safe avatar letter (we're guaranteed user exists here)

  
  return (
    <div className="flex items-center space-x-3" ref={dropdownRef}>
      {/* Avatar */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black font-semibold uppercase hover:bg-gray-800 hover:text-white transition"
        aria-label="User menu"
      >
        {avatarLetter}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-2">
          <p className="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 border-b">
            {user?.name || user?.email || "Unknown user"}
          </p>
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
