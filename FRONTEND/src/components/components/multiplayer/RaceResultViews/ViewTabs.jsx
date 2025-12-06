import { Users, Activity, BarChart3 } from "lucide-react";

export default function ViewTabs({ view, setView }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-1 inline-flex gap-2">
        <TabButton
          active={view === "leaderboard"}
          onClick={() => setView("leaderboard")}
          icon={<Users className="w-4 h-4" />}
          label="Leaderboard"
        />
        <TabButton
          active={view === "graph"}
          onClick={() => setView("graph")}
          icon={<Activity className="w-4 h-4" />}
          label="Race Graph"
        />
        <TabButton
          active={view === "stats"}
          onClick={() => setView("stats")}
          icon={<BarChart3 className="w-4 h-4" />}
          label="Statistics"
        />
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-md font-medium transition-all flex items-center gap-2 ${
        active
          ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
          : "text-neutral-400 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}