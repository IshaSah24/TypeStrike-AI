import { Crown, Trophy, Medal } from "lucide-react";

export default function PodiumView({ sortedResults, animationPhase }) {
  const getPodiumHeight = (position) => {
    if (position === 0) return "h-64";
    if (position === 1) return "h-48";
    if (position === 2) return "h-40";
    return "h-32";
  };

  const getPodiumColor = (position) => {
    if (position === 0) return "from-yellow-500/20 to-yellow-600/5 border-yellow-500/50";
    if (position === 1) return "from-neutral-600/20 to-neutral-700/5 border-neutral-500/50";
    if (position === 2) return "from-amber-700/20 to-amber-800/5 border-amber-600/50";
    return "from-neutral-800/20 to-neutral-900/5 border-neutral-700/50";
  };

  const getPodiumIcon = (position) => {
    if (position === 0) return <Crown className="w-8 h-8 text-yellow-400" />;
    if (position === 1) return <Trophy className="w-7 h-7 text-neutral-300" />;
    if (position === 2) return <Medal className="w-6 h-6 text-amber-600" />;
    return <Medal className="w-5 h-5 text-neutral-500" />;
  };

  if (sortedResults.length < 1) return null;

  return (
    <div className="mb-12">
      <div className="flex items-end justify-center gap-4 mb-8">
        {sortedResults[1] && (
          <PodiumPlayer 
            player={sortedResults[1]}
            position={1}
            podiumHeight={getPodiumHeight(1)}
            podiumColor={getPodiumColor(1)}
            podiumIcon={getPodiumIcon(1)}
            animationPhase={animationPhase}
            delay="delay-100"
            rank="2"
          />
        )}

        <PodiumPlayer 
          player={sortedResults[0]}
          position={0}
          podiumHeight={getPodiumHeight(0)}
          podiumColor={getPodiumColor(0)}
          podiumIcon={getPodiumIcon(0)}
          animationPhase={animationPhase}
          delay=""
          rank="1"
          isChampion
        />

        {sortedResults[2] && (
          <PodiumPlayer 
            player={sortedResults[2]}
            position={2}
            podiumHeight={getPodiumHeight(2)}
            podiumColor={getPodiumColor(2)}
            podiumIcon={getPodiumIcon(2)}
            animationPhase={animationPhase}
            delay="delay-200"
            rank="3"
          />
        )}
      </div>
    </div>
  );
}

function PodiumPlayer({ player, position, podiumHeight, podiumColor, podiumIcon, animationPhase, delay, rank, isChampion = false }) {
  const borderColor = isChampion ? "border-yellow-400" : position === 2 ? "border-amber-600" : "border-neutral-600";
  const textColor = isChampion ? "text-yellow-400" : position === 2 ? "text-amber-300" : "text-neutral-200";
  const bgColor = isChampion ? "bg-yellow-600" : position === 2 ? "bg-amber-800" : "bg-neutral-800";
  const accentColor = isChampion ? "yellow" : position === 2 ? "amber" : "neutral";

  return (
    <div className={`flex-1 max-w-xs transition-all duration-1000 ${delay} ${animationPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className={`${podiumHeight} bg-gradient-to-t ${podiumColor} border rounded-t-2xl p-6 flex flex-col items-center justify-end relative overflow-hidden`}>
        {isChampion ? (
          <>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(234,179,8,0.1),transparent)]"></div>
          </>
        ) : (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neutral-500 to-transparent"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="relative z-10 text-center">
          <div className={`mb-3 ${isChampion ? 'animate-bounce' : ''}`}>
            {podiumIcon}
          </div>
          <div className={`w-${position === 0 ? '20' : '16'} h-${position === 0 ? '20' : '16'} ${bgColor} rounded-full flex items-center justify-center text-${position === 0 ? '4xl' : '3xl'} mb-3 border-${position === 0 ? '4' : '2'} ${borderColor} mx-auto ${isChampion ? 'shadow-xl shadow-yellow-500/50' : ''}`}>
            {player.avatar || "👤"}
          </div>
          <h3 className="text-white font-bold text-lg mb-1 truncate max-w-full px-2">
            {player.name}
          </h3>
          <div className={`text-3xl font-bold ${textColor} mb-1`}>
            {player.wpm} <span className="text-sm text-neutral-400">WPM</span>
          </div>
          <div className="text-sm text-neutral-300">
            {player.accuracy?.toFixed(1)}% Accuracy
          </div>
        </div>
        <div className={`absolute bottom-2 right-2 text-${position === 0 ? '7xl' : '6xl'} font-black text-${accentColor}-500/20`}>
          {rank}
        </div>
      </div>
    </div>
  );
}