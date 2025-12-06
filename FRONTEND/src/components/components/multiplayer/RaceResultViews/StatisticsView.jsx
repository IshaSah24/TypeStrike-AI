import { Zap, Target, Trophy, BarChart3 } from "lucide-react";

export default function StatisticsView({ sortedResults, maxWpm, avgWpm, avgAccuracy, getPlayerColor }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Avg WPM"
          value={avgWpm.toFixed(0)}
          description="Average Words Per Minute"
          icon={<Zap className="w-6 h-6 text-purple-400" />}
          gradient="from-purple-600/20 to-purple-800/20"
          borderColor="border-purple-500/30"
          iconBg="bg-purple-500/20"
        />
        <StatCard 
          title="Avg Accuracy"
          value={`${avgAccuracy.toFixed(1)}%`}
          description="Average Accuracy"
          icon={<Target className="w-6 h-6 text-green-400" />}
          gradient="from-green-600/20 to-green-800/20"
          borderColor="border-green-500/30"
          iconBg="bg-green-500/20"
        />
        <StatCard 
          title="Highest WPM"
          value={maxWpm}
          description="Highest Words Per Minute"
          icon={<Trophy className="w-6 h-6 text-yellow-400" />}
          gradient="from-yellow-600/20 to-yellow-800/20"
          borderColor="border-yellow-500/30"
          iconBg="bg-yellow-500/20"
        />
      </div>

      <ComparisonChart 
        sortedResults={sortedResults}
        maxValue={maxWpm}
        metric="wpm"
        title="WPM Comparison"
        icon={<BarChart3 className="w-5 h-5 text-purple-400" />}
        gradient="from-purple-500 to-purple-600"
      />

      <ComparisonChart 
        sortedResults={sortedResults}
        maxValue={100}
        metric="accuracy"
        title="Accuracy Comparison"
        icon={<Target className="w-5 h-5 text-green-400" />}
        gradient="from-green-500 to-green-600"
        isPercentage
      />

      <DetailedStatsTable sortedResults={sortedResults} />
    </div>
  );
}

function StatCard({ title, value, description, icon, gradient, borderColor, iconBg }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} border ${borderColor} rounded-xl p-6 backdrop-blur-sm`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <div className="text-3xl font-black text-white">{value}</div>
          <div className="text-sm text-neutral-300">{title}</div>
        </div>
      </div>
    </div>
  );
}

function ComparisonChart({ sortedResults, maxValue, metric, title, icon, gradient, isPercentage = false }) {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <div className="space-y-4">
        {sortedResults.map((player, index) => (
          <div key={player.userId} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-neutral-400 font-mono w-6">#{index + 1}</span>
                <span className="text-white font-medium">{player.name}</span>
              </div>
              <span className="text-purple-400 font-bold">
                {isPercentage ? `${player[metric]?.toFixed(1)}%` : `${player[metric]} ${metric === 'wpm' ? 'WPM' : ''}`}
              </span>
            </div>
            <div className="relative h-8 bg-neutral-800/50 rounded-full overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 bg-gradient-to-r ${gradient}`}
                style={{
                  width: `${(player[metric] / maxValue) * 100}%`,
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailedStatsTable({ sortedResults }) {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 p-4">
        <h3 className="text-xl font-bold text-white">Detailed Statistics</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-neutral-300 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-neutral-300 uppercase tracking-wider">Player</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-neutral-300 uppercase tracking-wider">WPM</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-neutral-300 uppercase tracking-wider">Accuracy</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-neutral-300 uppercase tracking-wider">Correct</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-neutral-300 uppercase tracking-wider">Errors</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-neutral-300 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {sortedResults.map((player, index) => (
              <tr key={player.userId} className="hover:bg-neutral-800/30 transition-colors">
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold ${
                    index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                    index === 1 ? 'bg-neutral-600/20 text-neutral-300' :
                    index === 2 ? 'bg-amber-600/20 text-amber-400' :
                    'bg-neutral-800 text-neutral-400'
                  }`}>
                    {index + 1}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-lg">
                      {player.avatar || "👤"}
                    </div>
                    <span className="text-white font-medium">{player.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-purple-400 font-bold text-lg">{player.wpm}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-green-400 font-bold">{player.accuracy?.toFixed(1)}%</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-blue-400 font-medium">{player.correctChars}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-red-400 font-medium">{player.errors}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  {player.finished ? (
                    <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs font-bold">
                      FINISHED
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-xs font-bold">
                      DNF
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}