import { Trophy, Medal, Award, RotateCcw } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function RaceResults({ results, roomCode, onBackToLobby }) {
  const navigate = useNavigate();

  const getPositionIcon = (position) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-neutral-400 font-bold">#{position}</span>;
    }
  };

  const getPositionColor = (position) => {
    switch (position) {
      case 1:
        return "from-yellow-400/20 to-yellow-600/10 border-yellow-400/30";
      case 2:
        return "from-gray-300/20 to-gray-400/10 border-gray-300/30";
      case 3:
        return "from-amber-600/20 to-amber-700/10 border-amber-600/30";
      default:
        return "from-neutral-800/50 to-neutral-900/50 border-neutral-700/30";
    }
  };

  const chartData = results.map((result) => ({
    name: result.name,
    wpm: result.wpm,
    accuracy: Number((result.accuracy?.toFixed?.(1)) ?? (result.accuracy || 0)),
  }));

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden shadow-2xl">
          <div className="bg-black border-b border-neutral-800 p-8 text-center">
            <h1 className="text-4xl font-light text-white mb-2 tracking-tight">
              Race Complete!
            </h1>
            <p className="text-neutral-400 text-sm">Room: {roomCode}</p>
          </div>

          <div className="p-8">
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={result.userId || index}
                  className={`bg-gradient-to-r ${getPositionColor(
                    result.position
                  )} border rounded-lg p-6 transition-all hover:scale-[1.02]`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getPositionIcon(result.position)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-medium text-white">
                            {result.name}
                          </h3>
                          {result.position <= 3 && (
                            <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">
                              Top {result.position}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-neutral-400">WPM</span>
                            <p className="text-yellow-400 font-bold text-lg">
                              {result.wpm}
                            </p>
                          </div>
                          <div>
                            <span className="text-neutral-400">Accuracy</span>
                            <p className="text-green-400 font-bold text-lg">
                              {result.accuracy.toFixed(1)}%
                            </p>
                          </div>
                          <div>
                            <span className="text-neutral-400">Errors</span>
                            <p className="text-red-400 font-bold text-lg">
                              {result.errors}
                            </p>
                          </div>
                          <div>
                            <span className="text-neutral-400">Chars</span>
                            <p className="text-blue-400 font-bold text-lg">
                              {result.correctChars}/{result.incorrectChars}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {chartData.length > 0 && (
              <div className="mt-10 bg-neutral-950/40 border border-neutral-800 rounded-lg p-6 shadow-inner">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-light text-white mb-1">
                      WPM Overview
                    </h2>
                    <p className="text-neutral-500 text-sm">
                      Compare race performance across all players
                    </p>
                  </div>
                  <div className="text-sm text-neutral-400">
                    Average:{" "}
                    <span className="text-yellow-400 font-semibold">
                      {Math.round(
                        chartData.reduce((sum, item) => sum + item.wpm, 0) /
                          chartData.length
                      ) || 0}
                      {" WPM"}
                    </span>
                  </div>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis
                        dataKey="name"
                        stroke="#9ca3af"
                        tick={{ fill: "#9ca3af", fontSize: 12 }}
                      />
                      <YAxis
                        stroke="#9ca3af"
                        tick={{ fill: "#9ca3af", fontSize: 12 }}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0b0f19",
                          border: "1px solid #1f2937",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Bar dataKey="wpm" fill="#fde047" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <button
                onClick={onBackToLobby}
                className="flex-1 px-6 py-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-3"
              >
                <RotateCcw className="w-5 h-5" />
                Back to Lobby
              </button>
              <button
                onClick={() => navigate({ to: "/play/multiplayer" })}
                className="flex-1 px-6 py-4 bg-white hover:bg-neutral-100 rounded-lg text-black font-medium transition-colors"
              >
                Create New Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

