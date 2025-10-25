import { Settings, Trophy, Users, Zap } from "lucide-react";
import React from "react";

const MultiplayerHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
          <div className="relative w-10 h-10 bg-gradient-to-br from-white/20 to-white/5 rounded-xl backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Zap className="w-5 h-5 text-white/90" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-light text-white tracking-tight group-hover:tracking-wide transition-all duration-300">
            TypeRace
            <span className="text-neutral-400 font-extralight ml-1">Pro</span>
          </h1>
          <p className="text-xs text-neutral-500 font-extralight tracking-wider">
            Multiplayer Typing Arena
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800/50 transition-all duration-300 group">
          <Trophy className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-light tracking-wide">Leaderboard</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800/50 transition-all duration-300 group">
          <Users className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-light tracking-wide">Friends</span>
        </button>

        <div className="w-px h-6 bg-neutral-700/50 mx-2"></div>

        <button className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800/50 transition-all duration-300 group">
          <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
        </button>

        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-neutral-700/50">
          <div className="text-right">
            <p className="text-sm text-white font-light">Guest User</p>
            <p className="text-xs text-neutral-500 font-extralight">Level 1</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-full border-2 border-neutral-600/30 flex items-center justify-center text-white font-light text-sm hover:scale-105 transition-transform duration-300 cursor-pointer">
            G
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerHeader;
