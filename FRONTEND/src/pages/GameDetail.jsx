import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getGame } from "../apis/dashboard";

export default function GameDetail() {
  const navigate = useNavigate();
  const { gameId } = useParams({
    from: "/dashboard/$gameId", 
  });
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const result = await getGame(gameId);
        setGame(result);
      } catch (error) {
        console.error("Failed to load game:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [gameId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>Game not found</div>
      </div>
    );
  }

  const wordErrors = game.wordErrors || {};
  const errorEntries = Object.entries(wordErrors).sort(([, a], [, b]) => b - a);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate({ to: "/dashboard" })}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <h1 className="text-4xl font-light mb-8">Game Details</h1>

        <div className="bg-white text-black rounded p-8 mb-8">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <div className="text-sm text-gray-600 mb-2">Mode</div>
              <div className="text-2xl font-medium capitalize">{game.mode}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Date</div>
              <div className="text-2xl font-medium">{formatDate(game.date)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">WPM</div>
              <div className="text-2xl font-medium">{game.wpm}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Accuracy</div>
              <div className="text-2xl font-medium">{game.accuracy}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Errors</div>
              <div className="text-2xl font-medium">{game.errors}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Duration</div>
              <div className="text-2xl font-medium">
                {(game.durationMs / 1000).toFixed(1)}s
              </div>
            </div>
            {game.position && (
              <div>
                <div className="text-sm text-gray-600 mb-2">Position</div>
                <div className="text-2xl font-medium">#{game.position}</div>
              </div>
            )}
          </div>

          {game.opponents && game.opponents.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">Opponents</h2>
              <div className="space-y-2">
                {game.opponents.map((opp, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-100 rounded"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{opp.name}</span>
                      {opp.isBot && (
                        <span className="text-xs bg-gray-300 px-2 py-1 rounded">
                          Bot
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span>{opp.wpm} WPM</span>
                      <span>{opp.accuracy}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {errorEntries.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">Word Errors</h2>
              <div className="space-y-2">
                {errorEntries.map(([word, count]) => (
                  <div
                    key={word}
                    className="flex items-center justify-between p-3 bg-gray-100 rounded"
                  >
                    <span className="font-medium">{word}</span>
                    <span className="text-red-600">{count} errors</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {game.recommendedWords && game.recommendedWords.length > 0 && (
            <div>
              <h2 className="text-xl font-medium mb-4">
                Practice These Words
              </h2>
              <div className="flex flex-wrap gap-2">
                {game.recommendedWords.map((word) => (
                  <span
                    key={word}
                    className="px-3 py-1 bg-gray-200 rounded text-sm font-medium"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

