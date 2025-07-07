import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

function TypingGraph({ data }) {
  return (
    <div className="w-full mt-8 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-center text-white mb-4">Performance Graph</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis domain={[0, 100]} stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="wpm" stroke="#f7ff4f" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TypingGraph;
