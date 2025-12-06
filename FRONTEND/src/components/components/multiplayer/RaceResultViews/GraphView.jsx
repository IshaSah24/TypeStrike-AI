import RaceGraph from "./RaceGraph";
import { Activity } from "lucide-react";

export default function GraphView({ 
  sortedResults, 
  graphMetric, 
  setGraphMetric, 
  hoveredPlayer, 
  setHoveredPlayer, 
  getPlayerColor 
}) {
  return (
    <div className="space-y-6">
      <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-neutral-800 p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-purple-400" />
              Race Performance Graph
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setGraphMetric("wpm")}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  graphMetric === "wpm"
                    ? "bg-purple-600 text-white"
                    : "bg-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                WPM
              </button>
              <button
                onClick={() => setGraphMetric("correct")}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  graphMetric === "correct"
                    ? "bg-purple-600 text-white"
                    : "bg-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                Correct
              </button>
              <button
                onClick={() => setGraphMetric("errors")}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  graphMetric === "errors"
                    ? "bg-purple-600 text-white"
                    : "bg-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                Errors
              </button>
            </div>
          </div>
        </div>
        <div className="p-8">
          <RaceGraph
            sortedResults={sortedResults}
            graphMetric={graphMetric}
            hoveredPlayer={hoveredPlayer}
            setHoveredPlayer={setHoveredPlayer}
            getPlayerColor={getPlayerColor}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedResults.map((player, index) => (
          <PlayerCard
            key={player.userId}
            player={player}
            index={index}
            hoveredPlayer={hoveredPlayer}
            setHoveredPlayer={setHoveredPlayer}
            getPlayerColor={getPlayerColor}
          />
        ))}
      </div>
    </div>
  );
}

function PlayerCard({ player, index, hoveredPlayer, setHoveredPlayer, getPlayerColor }) {
  return (
    <div
      onMouseEnter={() => setHoveredPlayer(player.userId)}
      onMouseLeave={() => setHoveredPlayer(null)}
      className={`bg-neutral-900/50 backdrop-blur-sm border-2 rounded-xl p-4 transition-all cursor-pointer ${
        hoveredPlayer === player.userId
          ? 'border-purple-500 shadow-lg shadow-purple-500/20 scale-105'
          : 'border-neutral-800 hover:border-neutral-700'
      }`}
      style={{ borderLeftColor: getPlayerColor(index), borderLeftWidth: '4px' }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center text-xl border-2 border-neutral-700">
          {player.avatar || "👤"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-bold truncate">{player.name}</div>
          <div className="text-neutral-400 text-xs">Rank #{index + 1}</div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-neutral-400 text-sm">WPM</span>
          <span className="text-purple-400 font-bold">{player.wpm}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-400 text-sm">Accuracy</span>
          <span className="text-green-400 font-bold">{player.accuracy?.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-400 text-sm">Errors</span>
          <span className="text-red-400 font-bold">{player.errors}</span>
        </div>
      </div>
    </div>
  );
}