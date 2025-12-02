import React, { useEffect, useMemo } from "react";
import { useRoomSocket } from "../../hooks/useRoomSocket";

const PlayersList = ({ playerProgress = {} }) => {
  const { socket, users = [], playerProgress: contextProgress = {} } = useRoomSocket();

  const socketId = socket?.id;

  const progressSource =
    playerProgress && Object.keys(playerProgress).length > 0
      ? playerProgress
      : contextProgress || {};

  const playersWithProgress = useMemo(() => {
    return users.map((user) => {
      const progress = progressSource[user.id] || {};
      return {
        ...user,
        ...progress,
      };
    });
  }, [users, progressSource]);


  
// incoming  socket testing logs...
  useEffect(() => {
    console.log("PlayersList mounted");
    // console.log("socket id:", socketId);
    // console.log("users:", users);
    console.log("prop playerProgress:", playerProgress);
    // console.log("contextProgress:", contextProgress);
    // console.log("derived progressSource keys:",Object.keys(progressSource));
  }, []);




  return (
    <div className="max-w-4xl mx-auto mb-6">
      <div className="bg-neutral-900/80 backdrop-blur-sm rounded-lg border border-neutral-800 p-4">
        <h3 className="text-sm font-medium text-neutral-400 mb-3 uppercase tracking-wider">
          Live Progress
        </h3>
        <div className="space-y-2">
          {playersWithProgress.length === 0 && (
            <div className="text-sm text-neutral-500 text-center py-4">
              No players connected
            </div>
          )}



          {playersWithProgress.map((player) => {
            console.log("---------- PLAYER ---------");
            console.log("Player:", player.userId );
            console.log("serverWpm:", player.wpm);
            console.log("estWpm:", player.estWpm);


            const isSelf = socketId && player.id === socketId;

            const progress = typeof player.progress === "number" ? player.progress : 0;
            const serverWpm = typeof player.wpm === "number" ? player.wpm : null;
            const estWpm = typeof player.estWpm === "number" ? player.estWpm : null;
            const wpmToShow = serverWpm != null ? serverWpm : (estWpm != null ? estWpm : 0);
            const isEst = serverWpm == null && estWpm != null;
            const accuracyRaw = typeof player.accuracy === "number" ? player.accuracy : 100;
            const accuracy = Number.isFinite(accuracyRaw) ? accuracyRaw : 100;
            const errors = typeof player.errors === "number" ? player.errors : (player.incorrectChars || 0);
            const finished = !!player.finished;

            return (
              <div
                key={player.id}
                className={`player-row flex items-center gap-4 p-3 rounded-lg border transition-all ${
                  isSelf
                    ? "bg-blue-500/10 border-blue-500/30"
                    : "bg-neutral-800/50 border-neutral-700/50"
                } ${finished ? "opacity-75" : ""}`}
              >
                <div className="w-32 text-sm font-medium truncate text-white">
                  {isSelf ? `${player.name} (You)` : player.name}
                  {player.isOwner && <span className="ml-2 text-xs text-amber-400">👑</span>}
                </div>

                <div className="w-20 text-xs text-yellow-400 font-semibold">
                  {wpmToShow} WPM {isEst ? <span className="text-[10px] ml-1 text-neutral-400">(est)</span> : null}
                </div>

                <div className="w-20 text-xs text-green-400">{accuracy.toFixed(1)}% acc</div>

                <div className="w-16 text-xs text-red-400">{errors} err</div>

                <div className="flex-1">
                  <div className="w-full bg-neutral-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-150 ${
                        finished ? "bg-emerald-500" : isSelf ? "bg-blue-500" : "bg-neutral-500"
                      }`}
                      style={{
                        width: `${Math.min(100, Math.max(0, progress))}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="w-12 text-right text-xs text-neutral-400">
                  {finished ? "✓" : `${Math.round(progress)}%`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlayersList;
