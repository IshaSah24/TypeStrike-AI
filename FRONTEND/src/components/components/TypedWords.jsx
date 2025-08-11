import React, { useState } from "react";

export default function TypedWords({ incorrectWords }) {
  const [showHistory, setShowHistory] = useState(false);

  console.log(incorrectWords);

  return (
    <div className="w-full text-center mt-4">
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition-all"
      >
        {showHistory ? "Hide Incorrect Words" : "View Incorrect Words"}
      </button>

      {showHistory && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-lg max-w-3xl mx-auto transition-all duration-300">
          <div className="flex flex-wrap gap-1 justify-center">
            {incorrectWords.map((word, i) => (
              <span
                key={`i-${i}`}
                className="px-1 rounded bg-red-500/20 text-red-400 font-mono"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
