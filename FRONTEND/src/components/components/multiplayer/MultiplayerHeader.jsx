import { ExternalLink, Settings, Trophy, Users, Zap } from "lucide-react";
import { useSelector } from "react-redux";
import React from "react";

const getLevel = (games = 0) => {
  if (games >= 200) return "Master";
  if (games >= 100) return "Pro";
  if (games >= 40) return "Intermediate";
  if (games >= 10) return "Rookie";
  return "Beginner";
};

const MultiplayerHeader = () => {
  const { user, loading } = useSelector((state) => state.auth);

  const name = user?.name || "Guest";
  const gamesPlayed = user?.games?.length || 0;
  const level = getLevel(gamesPlayed);
  const avatarLetter = name?.charAt(0).toUpperCase();

  return (
    <div className="flex items-center justify-between">
      <div className="md:col-span-4 space-y-6">
        <div className="inline-flex items-center space-x-4 group cursor-pointer">
          <div className="inline-flex items-center space-x-2 group cursor-pointer">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-600/10 via-slate-700/5 to-slate-800/5 blur-md group-hover:blur-xl transition-all duration-500"></div>

              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-900 via-black to-slate-900 border border-slate-700/30 backdrop-blur-sm shadow-lg group-hover:border-slate-500/50 transition-all duration-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 group-hover:from-white group-hover:via-slate-100 group-hover:to-slate-300 transition-all duration-500">
                  T
                </span>
              </div>
            </div>

            <div className="flex flex-col -space-y-1">
              <div className="flex items-baseline">
                <span className="text-md font-extralight text-slate-300 tracking-widest group-hover:tracking-wider transition-all duration-500">
                  Type
                </span>
                <span className="text-xl font-bold text-slate-100 group-hover:text-white tracking-wide transition-all duration-500 ml-1">
                  Strike
                </span>
                <span className="text-md font-light text-slate-400 group-hover:text-slate-300 ml-1">
                  .Ai
                </span>
              </div>
              <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-slate-300/50 to-transparent transition-all duration-500 mt-1"></div>
            </div>
          </div>
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

        {/* User */}
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-neutral-700/50">
          <div className="text-right">
            {loading ? (
              <div className="w-20 h-4 bg-neutral-700/50 rounded animate-pulse" />
            ) : (
              <>
                <p className="text-sm text-white font-light">{name}</p>
                <p className="text-xs text-neutral-500 font-extralight">
                  {level} • {gamesPlayed} games
                </p>
              </>
            )}
          </div>

          <div className="w-10 h-10 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-full border-2 border-neutral-600/30 flex items-center justify-center text-white font-light text-sm hover:scale-105 transition-transform duration-300 cursor-pointer">
            {avatarLetter}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiplayerHeader;
