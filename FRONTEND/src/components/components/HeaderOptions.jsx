import { Bell, Settings, User } from "lucide-react";
import React from "react";

const HeaderOptions = () => {
  return (
    <div className="flex items-center justify-between mt-4 h-16">
      <div
        className="flex items-center pace-x-2"
      >
        <button className="p-4 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-4 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">
          <Settings className="w-5 h-5" />
        </button>
        <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-300 transition-colors pr-20 cursor-pointer">
          <User className="w-5 h-5" />
          <span className="hidden sm:inline text-sm">guest</span>
        </button>
      </div>
    </div>
  );
};

export default HeaderOptions;
