import { Bell, Settings } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";

const HeaderOptions = () => {
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  const name = user?.name || "";
  const avatarLetter = name.charAt(0)?.toUpperCase();

  return (
    <div className="flex items-center">

      <button className="p-3 text-gray-500 hover:text-gray-300 transition">
        <Bell size={18} />
      </button>

      <button className="p-3 text-gray-500 hover:text-gray-300 transition">
        <Settings size={18} />
      </button>

      {loading && (
        <div className="ml-2 w-8 h-8 bg-neutral-700/60 rounded-full animate-pulse" />
      )}


      {/* {!loading && !user && (
        <button
          onClick={() => navigate({ to: "/login" })}
          className="text-sm text-gray-400 hover:text-gray-200 px-3 transition"
        >
          Login
        </button>
      )} */}

      {!loading && user && (
        <div
          onClick={() => navigate({ to: "/dashboard" })}
          className="ml-3 w-9 h-9 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-full border border-neutral-600/40 flex items-center justify-center text-white text-sm font-light cursor-pointer hover:scale-105 transition"
        >
          {avatarLetter}
        </div>
      )}
    </div>
  );
};

export default HeaderOptions;
