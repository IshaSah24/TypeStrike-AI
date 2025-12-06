import { Trophy, Crown, Zap, Target, TrendingUp } from "lucide-react";
import PodiumView from "./PodiumView";

export default function LeaderboardView({ sortedResults, animationPhase, getPlayerColor }) {
  return (
    <>
      <PodiumView 
        sortedResults={sortedResults}
        animationPhase={animationPhase}
      />

      <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-neutral-800 p-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-purple-400" />
            Final Rankings
          </h2>
        </div>
        <div className="divide-y divide-neutral-800">
          {sortedResults.map((player, index) => (
            <LeaderboardRow
              key={player.userId}
              player={player}
              index={index}
              animationPhase={animationPhase}
              getPlayerColor={getPlayerColor}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function LeaderboardRow({ player, index, animationPhase, getPlayerColor }) {
  return (
    <div
      className={`p-5 hover:bg-neutral-800/30 transition-all duration-300 ${index < 3 ? 'bg-neutral-800/10' : ''}`}
      style={{
        animationDelay: `${index * 50}ms`,
        opacity: animationPhase >= 1 ? 1 : 0,
        transform: animationPhase >= 1 ? 'translateX(0)' : 'translateX(-20px)',
        transition: 'all 0.5s ease-out'
      }}
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-black ${
            index === 0 ? 'bg-yellow-500/20 text-yellow-400 border-2 border-yellow-500' :
            index === 1 ? 'bg-neutral-600/20 text-neutral-300 border-2 border-neutral-500' :
            index === 2 ? 'bg-amber-600/20 text-amber-400 border-2 border-amber-600' :
            'bg-neutral-800 text-neutral-400'
          }`}>
            {index + 1}
          </div>

          <div className="w-14 h-14 bg-neutral-800 rounded-full flex items-center justify-center text-2xl border-2 border-neutral-700">
            {player.avatar || "👤"}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white font-semibold text-lg truncate">
                {player.name || "Player"}
              </span>
              {index === 0 && (
                <span className="px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/30 rounded text-yellow-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Champion
                </span>
              )}
              {!player.finished && (
                <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-xs font-bold uppercase">
                  DNF
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 mt-2 flex-wrap text-sm">
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 font-bold">{player.wpm || 0}</span>
                <span className="text-neutral-400">WPM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-green-400" />
                <span className="text-green-300 font-bold">{player.accuracy?.toFixed(1) || 0}%</span>
                <span className="text-neutral-400">Acc</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 font-bold">{player.correctChars || 0}</span>
                <span className="text-neutral-400">Correct</span>
              </div>
              <div className="text-red-300">
                <span className="font-bold">{player.errors || 0}</span>
                <span className="text-neutral-400"> Errors</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}