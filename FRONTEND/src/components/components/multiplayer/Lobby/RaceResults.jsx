import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { Crown } from "lucide-react";

export default function RaceResults({ results, roomCode, onBackToLobby }) {
  const navigate = useNavigate();

  if (!results || results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No results to display.
      </div>
    );
  }

  // Sort players: finished first, then by WPM descending
  const sortedResults = [...results].sort((a, b) => {
    if (a.finished && !b.finished) return -1;
    if (!a.finished && b.finished) return 1;
    return (b.wpm || 0) - (a.wpm || 0);
  });

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-2 tracking-tight">
            Final Results
          </h1>
          <p className="text-neutral-400 text-sm">
            Room Code: {roomCode}
          </p>
        </div>

        {/* Players List */}
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden shadow-2xl">
          <div className="divide-y divide-neutral-800">
            {sortedResults.map((player, index) => {
              const isTop = index === 0;
              return (
                <div
                  key={player.userId}
                  className="flex items-center justify-between p-5 hover:bg-neutral-800 transition-all"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 bg-neutral-700 rounded-full flex items-center justify-center text-2xl border border-neutral-600">
                      {player.avatar || "👤"}
                    </div>

                    {/* Player info */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium text-lg">
                          {player.name || "Player"}
                        </span>
                        {isTop && (
                          <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-amber-400 text-xs flex items-center gap-1 uppercase tracking-wide">
                            <Crown className="w-3 h-3" />
                            Winner
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-yellow-400">
                          {player.wpm || 0} WPM
                        </span>
                        <span className="text-sm text-green-400">
                          {player.accuracy?.toFixed(1) || 0}% Accuracy
                        </span>
                        <span className="text-sm text-neutral-500">
                          {player.progress?.toFixed(1) || 0}% Progress
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Finish status */}
                  <div className="text-sm text-neutral-400 font-mono">
                    {player.finished ? "Finished" : "DNF"}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Back to Lobby Button */}
          <div className="p-6 border-t border-neutral-800 flex justify-center">
            <button
              onClick={onBackToLobby || (() => navigate({ to: "/play/multiplayer" }))}
              className="px-8 py-4 bg-white hover:bg-neutral-100 rounded-lg text-black font-medium transition-all"
            >
              Back to Lobby
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
