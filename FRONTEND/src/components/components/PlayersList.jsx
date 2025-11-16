import React, { useMemo } from "react";
import { useMultiplayerProvider } from "../../context/MultiplayerContext";

const PlayersList = () => {
  const { players, socketRef, wordsRef } = useMultiplayerProvider();

  const socketId = socketRef?.current?.id || null;

  const totalWords = useMemo(() => {
    try {
      return Math.max(1, (wordsRef.current?.querySelectorAll?.(".formatted")?.length) || 1);
    } catch (e) {
      return 1;
    }
  }, [wordsRef.current]);

  const playersArray = useMemo(() => {
    return Object.entries(players || {}).map(([id, p]) => ({ id, ...p }));
  }, [players]);

  return (
    <div className="players-list space-y-2">
      {playersArray.length === 0 && (
        <div className="text-sm text-gray-500">No players connected</div>
      )}

      {playersArray.map((p) => {
        const name = p.name || p.id?.slice(0, 6);
        const wordIndex = p.wordIndex || 0;
        const charIndex = p.charIndex || 0;
        
        const pct = Math.max(0, Math.min(100, Math.round(((wordIndex + (charIndex / 10)) / totalWords) * 100)));

        const isSelf = socketId && p.id === socketId;

        return (
          <div key={p.id} className={`player-row flex items-center gap-3 p-2 rounded ${isSelf ? "bg-blue-50 border-blue-200" : "bg-white border-gray-100"}`}>
            <div className="w-24 text-sm font-medium truncate">
              {isSelf ? `${name} (you)` : name}
            </div>

            <div className="w-16 text-xs text-gray-600">
              {p.wpm ?? 0} WPM
            </div>

            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
                <div
                  className="h-full"
                  style={{
                    width: `${pct}%`,
                    transition: "width 0.15s linear",
                    background: isSelf ? "#2563eb" : "#999", 
                  }}
                />
              </div>
            </div>

            <div className="w-10 text-right text-xs text-gray-600">
              {pct}%
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayersList;
