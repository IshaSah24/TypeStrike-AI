import { Bell, Settings } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const HeaderOptions = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center">
      <button className="p-3 text-gray-500 hover:text-gray-300">
        <Bell size={18} />
      </button>

      <button className="p-3 text-gray-500 hover:text-gray-300">
        <Settings size={18} />
      </button>

      {!user && (
        <button
          onClick={() => navigate({ to: "/login" })}
          className="text-sm text-gray-400 hover:text-gray-200 px-3"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default HeaderOptions;
