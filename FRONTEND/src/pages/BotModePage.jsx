import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Bot, Play, ArrowLeft } from "lucide-react";
import { useRoomSocket } from "../hooks/useRoomSocket";
import { useSelector } from "react-redux";
import { generateRaceWords } from "../utils/generateRaceWords";

export default function BotModePage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth || {});
  const { createRoom, connectSocket, isConnected, sendWords, startRace } = useRoomSocket();
  
  const [difficulty, setDifficulty] = useState("medium");
  const [wordCount, setWordCount] = useState(25);
  const [loading, setLoading] = useState(false);

  const wordCountOptions = [10, 25, 50, 100];

  const handleStart = async () => {
    if (!isConnected) {
      connectSocket();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    setLoading(true);
    try {
      const gameSettings = {
        mode: "bot",
        botLevel: difficulty,
        wordCount: wordCount,
        option: wordCount,
      };

      const roomName = `AI Race - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`;
      
      const roomData = await createRoom(roomName, user?.name || "Player", gameSettings);
      
      const raceWords = generateRaceWords({
        mode: "words",
        wordCount: wordCount,
        option: wordCount,
      });

      await sendWords(roomData.id, raceWords);
      
      navigate({
        to: "/multiplayer/area/inroom",
        state: {
          roomId: roomData.id,
          roomCode: roomData.code,
          roomName: roomData.name,
          gameSettings: roomData.gameSettings || gameSettings,
        },
      });

      setTimeout(async () => {
        try {
          await startRace(roomData.id, 3000, raceWords.length);
        } catch (err) {
          console.error("Error starting race:", err);
        }
      }, 500);
    } catch (error) {
      console.error("Error creating bot room:", error);
      alert(error.error || "Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <button
          onClick={() => navigate({ to: "/" })}
          className="mb-8 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-neutral-800 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full mb-4 border border-purple-500/30">
              <Bot className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-4xl font-light text-white mb-2">Compete With AI</h1>
            <p className="text-neutral-400">Race against an AI typing bot</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-3">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["easy", "medium", "hard"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`px-6 py-4 rounded-lg border transition-all ${
                      difficulty === level
                        ? "bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500/50 text-white"
                        : "bg-neutral-800/50 border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300"
                    }`}
                  >
                    <div className="text-lg font-medium capitalize mb-1">{level}</div>
                    <div className="text-xs text-neutral-500">
                      {level === "easy" && "35-45 WPM"}
                      {level === "medium" && "55-70 WPM"}
                      {level === "hard" && "80-100 WPM"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-3">
                Word Count
              </label>
              <div className="grid grid-cols-4 gap-3">
                {wordCountOptions.map((count) => (
                  <button
                    key={count}
                    onClick={() => setWordCount(count)}
                    className={`px-4 py-3 rounded-lg border transition-all ${
                      wordCount === count
                        ? "bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500/50 text-white"
                        : "bg-neutral-800/50 border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={loading || !isConnected}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-medium text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Starting...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Start Race</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

