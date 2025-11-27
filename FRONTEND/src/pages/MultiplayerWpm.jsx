import React, { useMemo } from "react";
import { useMultiplayerProvider } from "../context/MultiplayerContext";

function MultiplayerWpm({ wordsRef }) {
  const { players, room } = useMultiplayerProvider();

  const playersStats = useMemo(() => {
    if (!players) return [];

    return Object.values(players)
      .map((player) => {
        const typedChars = player.typedChars || [];
        const totalChars = typedChars.length;
        const correct = typedChars.filter((c) => c.correct).length;
        const incorrect = totalChars - correct;

        const startTs = player.startTimestamp || room?.startTimestamp || Date.now();
        const endTs = player.finishedAt || Date.now();

        const durationInSeconds = Math.max((endTs - startTs) / 1000, 1 / 60);
        const wpm =
          typedChars.length > 0
            ? Math.round((correct / 5 / durationInSeconds) * 60)
            : player.wpm || 0;

        const accuracy =
          totalChars === 0 ? player.accuracy || 100 : Math.round((correct / totalChars) * 100);

        return {
          userId: player.id,
          wpm,
          accuracy,
          correct,
          incorrect,
          name: player.name || "Anonymous",
          finished: !!player.finishedAt,
        };
      })
      .sort((a, b) => {
        if (b.wpm !== a.wpm) return b.wpm - a.wpm;
        return (a.finished ? 0 : 1) - (b.finished ? 0 : 1);
      });
  }, [players, room]);

  return (
    <div className="w-full text-center mt-4">
      <h2 className="text-xl font-semibold mb-4">Multiplayer Race Results</h2>
      <div className="flex flex-col gap-4">
        {playersStats.map((stat) => (
          <div
            key={stat.userId}
            className="border rounded p-3 flex justify-between items-center bg-gray-50 dark:bg-gray-800"
          >
            <div className="font-medium">{stat.name}</div>
            <div className="flex gap-6">
              <div>WPM: {stat.wpm}</div>
              <div>Accuracy: {stat.accuracy}%</div>
              <div>Errors: {stat.incorrect}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiplayerWpm;
