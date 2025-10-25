import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";

const LandingProfileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate({ to: "/" });
  };

  return (
    <div className="relative">
      {/* Avatar */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white font-semibold uppercase hover:bg-gray-800"
      >
        {user?.name?.charAt(0) || user?.email?.charAt(0)}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
          <p className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b">
            {user?.name || user?.email}
          </p>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingProfileMenu;
