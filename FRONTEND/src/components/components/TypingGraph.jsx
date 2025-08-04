import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceDot,
} from "recharts";

// Custom Tooltip UI
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
        <p className="text-white font-semibold mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-red-400">errors: {data.errors}</p>
          <p className="text-yellow-400">wpm: {data.wpm}</p>
          <p className="text-green-400">raw: {data.raw}</p>
        </div>
      </div>
    );
  }
  return null;
};

function TypingGraph({ data, currentWpm, currentAccuracy }) {
  const errorPoints = data.filter((point) => point.errors > 0);

  return (
    <div className="w-full h-80 relative">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#374151" 
            strokeOpacity={0.3}
          />
          <XAxis 
            dataKey="second" 
            tick={{ fontSize: 12, fill: '#9CA3AF' }}
            tickLine={{ stroke: '#374151' }}
            axisLine={{ stroke: '#374151' }}
          />
          <YAxis 
            domain={[0, 'auto']}
            tick={{ fontSize: 12, fill: '#9CA3AF' }}
            tickLine={{ stroke: '#374151' }}
            axisLine={{ stroke: '#374151' }}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Raw WPM Line (Teal) */}
          <Line 
            type="monotone" 
            dataKey="raw" 
            stroke="#06B6D4" 
            strokeWidth={2}
            dot={false}
            strokeOpacity={0.7}
          />

          {/* Final WPM Line (Yellow) */}
          <Line 
            type="monotone" 
            dataKey="wpm" 
            stroke="#EAB308" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 4, fill: "#EAB308" }}
          />

          {/* Error Points */}
          {errorPoints.map((point, index) => (
            <ReferenceDot
              key={index}
              x={point.second}
              y={point.wpm}
              r={3}
              fill="#EF4444"
              stroke="#EF4444"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Current stats overlay */}
      <div className="absolute top-4 left-[-16px] text-left">
        <div className="text-6xl font-bold text-yellow-400 leading-none">
          {currentWpm}
        </div>
        <div className="text-xl font-semibold text-yellow-400 mt-1">
          {currentAccuracy}%
        </div>
        <div className="text-sm text-gray-400 mt-2">
          <div>WPM</div>
          <div>acc</div>
        </div>
      </div>
    </div>
  );
}

export default TypingGraph;
