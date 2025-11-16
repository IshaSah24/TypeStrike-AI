import { Bell, LogIn, Settings, User } from "lucide-react";
import React from "react";
import { useNavigate } from "@tanstack/react-router"; 


const HeaderOptions = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("clicking...");
    navigate({ to: "/login" }); 
  };

  return (
    <div className="flex items-center justify-betwesen mt-4 h-16">
      <div className="flex items-center space-x-2">
        <button className="p-4 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-4 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">
          <Settings className="w-5 h-5" />
        </button>

        <button
        onClick={handleClick}
          className="flex items-center space-x-2 text-gray-500 hover:text-gray-300 transition-colors pr-6 cursor-pointer"
        >
          
          <User className="w-5 h-5" />
          <span className="hidden sm:inline text-sm">Login</span>
        </button>
      </div>
    </div>
  );
};

export default HeaderOptions;
