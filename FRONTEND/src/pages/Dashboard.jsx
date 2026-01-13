import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Eye } from "lucide-react";
import { getDashboard } from "../apis/dashboard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDashboard();
        setData(result);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate({ to: "/" })}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <h1 className="text-4xl font-light mb-8">Dashboard</h1>

        {data && (
          <>
            <div className="grid grid-cols-4 gap-6 mb-12">
              <div className="bg-white text-black p-6 rounded">
                <div className="text-sm text-gray-600 mb-2">Total Games</div>
                <div className="text-3xl font-medium">{data.totalGames}</div>
              </div>
              <div className="bg-white text-black p-6 rounded">
                <div className="text-sm text-gray-600 mb-2">Avg WPM</div>
                <div className="text-3xl font-medium">{data.avgWpm}</div>
              </div>
              <div className="bg-white text-black p-6 rounded">
                <div className="text-sm text-gray-600 mb-2">Avg Accuracy</div>
                <div className="text-3xl font-medium">{data.avgAccuracy}%</div>
              </div>
              <div className="bg-white text-black p-6 rounded">
                <div className="text-sm text-gray-600 mb-2">Best WPM</div>
                <div className="text-3xl font-medium">{data.bestWpm}</div>
              </div>
            </div>

            <div className="bg-white text-black rounded overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">Mode</th>
                    <th className="text-left p-4 font-medium">WPM</th>
                    <th className="text-left p-4 font-medium">Accuracy</th>
                    <th className="text-left p-4 font-medium">Position</th>
                    <th className="text-left p-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.lastMatches.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500">
                        No games yet
                      </td>
                    </tr>
                  ) : (
                    data.lastMatches.map((match) => (
                      <tr key={match.id} className="border-t border-gray-200">
                        <td className="p-4">{formatDate(match.date)}</td>
                        <td className="p-4 capitalize">{match.mode}</td>
                        <td className="p-4">{match.wpm}</td>
                        <td className="p-4">{match.accuracy}%</td>
                        <td className="p-4">
                          {match.position ? `#${match.position}` : "-"}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() =>
                              navigate({ to: `/dashboard/${match.id}` })
                            }
                            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

