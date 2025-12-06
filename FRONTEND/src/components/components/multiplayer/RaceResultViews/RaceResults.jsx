import { useState, useEffect } from "react";
import PodiumView from "./PodiumView";
import LeaderboardView from "./LeaderboardView";
import GraphView from "./GraphView";
import StatisticsView from "./StatisticsView";
import ViewTabs from "./ViewTabs";
import { Trophy } from "lucide-react";

export default function RaceResults({ results, roomCode, onBackToLobby }) {
  const [view, setView] = useState("leaderboard");
  const [animationPhase, setAnimationPhase] = useState(0);
  const [hoveredPlayer, setHoveredPlayer] = useState(null);
  const [graphMetric, setGraphMetric] = useState("wpm");

  useEffect(() => {
    const timer = setTimeout(() => setAnimationPhase(1), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!results || results.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#131313" }}
      >
        <div className="text-white text-xl">No results to display.</div>
      </div>
    );
  }

  const sortedResults = [...results].sort((a, b) => {
    if (a.finished && !b.finished) return -1;
    if (!a.finished && b.finished) return 1;
    return (b.wpm || 0) - (a.wpm || 0);
  });

  const maxWpm = Math.max(...sortedResults.map((p) => p.wpm || 0));
  const avgWpm =
    sortedResults.reduce((sum, p) => sum + (p.wpm || 0), 0) /
    sortedResults.length;
  const avgAccuracy =
    sortedResults.reduce((sum, p) => sum + (p.accuracy || 0), 0) /
    sortedResults.length;

  const getPlayerColor = (index) => {
    const playerColors = [
      "#F59E0B",
      "#06B6D4",
      "#EC4899",
      "#10B981",
      "#8B5CF6",
      "#F97316",
      "#14B8A6",
      "#EF4444",
    ];
    return playerColors[index % playerColors.length];
  };

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{ backgroundColor: "#131313" }}
    >
      <div className="max-w-7xl mx-auto">
        <RaceHeader
          animationPhase={animationPhase}
          roomCode={roomCode}
          sortedResults={sortedResults}
        />

        <ViewTabs view={view} setView={setView} />

        {view === "leaderboard" && (
          <LeaderboardView
            sortedResults={sortedResults}
            animationPhase={animationPhase}
            getPlayerColor={getPlayerColor}
          />
        )}

        {view === "graph" && (
          <GraphView
            sortedResults={sortedResults}
            graphMetric={graphMetric}
            setGraphMetric={setGraphMetric}
            hoveredPlayer={hoveredPlayer}
            setHoveredPlayer={setHoveredPlayer}
            getPlayerColor={getPlayerColor}
          />
        )}

        {view === "stats" && (
          <StatisticsView
            sortedResults={sortedResults}
            maxWpm={maxWpm}
            avgWpm={avgWpm}
            avgAccuracy={avgAccuracy}
            getPlayerColor={getPlayerColor}
          />
        )}

        <BackToLobbyButton onBackToLobby={onBackToLobby} />
      </div>
    </div>
  );
}

function RaceHeader({ animationPhase, roomCode, sortedResults }) {
  return (
    <div
      className={`text-center mb-8 transition-all duration-1000 ${
        animationPhase >= 1
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="inline-flex items-center justify-center gap-3 mb-4">
        <Trophy className="w-12 h-12 text-yellow-400 animate-pulse" />
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          Race Complete!
        </h1>
        <Trophy className="w-12 h-12 text-yellow-400 animate-pulse" />
      </div>
      <p className="text-neutral-400 text-lg">
        Room:{" "}
        <span className="text-purple-400 font-mono font-semibold">
          {roomCode}
        </span>
      </p>
      <p className="text-neutral-500 text-sm mt-2">
        {sortedResults.length} {sortedResults.length === 1 ? "racer" : "racers"}{" "}
        competed
      </p>
    </div>
  );
}

function BackToLobbyButton({ onBackToLobby }) {
  return (
    <div className="mt-8 flex justify-center gap-4">
      <button
        onClick={onBackToLobby || (() => console.log("Back to lobby"))}
        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-bold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50"
      >
        Back to Lobby
      </button>
    </div>
  );
}
