import React, { useState } from "react";
import TypingGraph from "./TypingGraph";
import TypingStats from "./TypingStats";
import { Play, RotateCcw, Settings, BarChart3 } from "lucide-react";
import TypedWords from "./TypedWords";

function TypingTestInterface({ graphData, stats, wpm, accuracy, correctWords, incorrectWords }) {
  const [isActive, setIsActive] = useState(false);
  // Dummy data for testing purpose
  // const sampleData = [
  //   { second: 1, wpm: 8, raw: 12, accuracy: 90, errors: 0 },
  //   { second: 2, wpm: 15, raw: 20, accuracy: 88, errors: 1 },
  //   { second: 3, wpm: 22, raw: 28, accuracy: 85, errors: 0 },
  //   { second: 4, wpm: 28, raw: 35, accuracy: 87, errors: 1 },
  //   { second: 5, wpm: 32, raw: 38, accuracy: 89, errors: 0 },
  //   { second: 6, wpm: 35, raw: 42, accuracy: 90, errors: 0 },
  //   { second: 7, wpm: 38, raw: 45, accuracy: 91, errors: 2 },
  //   { second: 8, wpm: 36, raw: 43, accuracy: 88, errors: 0 },
  //   { second: 9, wpm: 34, raw: 41, accuracy: 87, errors: 0 },
  //   { second: 10, wpm: 36, raw: 44, accuracy: 89, errors: 0 },
  //   { second: 11, wpm: 38, raw: 46, accuracy: 90, errors: 0 },
  //   { second: 12, wpm: 37, raw: 45, accuracy: 91, errors: 0 },
  //   { second: 13, wpm: 39, raw: 47, accuracy: 92, errors: 0 },
  //   { second: 14, wpm: 38, raw: 46, accuracy: 92, errors: 1 },
  //   { second: 15, wpm: 40, raw: 48, accuracy: 93, errors: 0 },
  //   { second: 16, wpm: 38, raw: 46, accuracy: 92, errors: 0 },
  //   { second: 17, wpm: 38, raw: 46, accuracy: 92, errors: 0 },
  // ];

  const handleStart = () => {
    setIsActive(true);
  };

  const handleRestart = () => {
    setIsActive(false);
  };

  return (
    <div className="text-white p-4 px-20">
      <div className="max-w-8xl mx-auto p-8">
        {/* <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4 absolute right-0 top-8">
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div> */}


        <div className=" rounded-xl p-6 mb-6 ">
          <TypingGraph
            data={graphData}
            currentWpm={wpm}
            currentAccuracy={accuracy}
          />
          <TypingStats
            testType="words"
            language="english"
            wordCount={10}
            rawWpm={stats.raw}
            characters={stats.characters}
            consistency={stats.consistency}
            time={stats.time}
          />
        </div>
       <TypedWords correctWords={correctWords} incorrectWords={incorrectWords}/>


        <div className="flex justify-center space-x-4 mb-8 mt-8">
          <button
            onClick={handleStart}
            disabled={isActive}
            className="flex items-center space-x-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
          >
            <Play className="w-5 h-5" />
            <span>{isActive ? "Testing..." : "Start Test"}</span>
          </button>

          <button
            onClick={handleRestart}
            className="flex items-center space-x-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Restart</span>
          </button>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className=" rounded-xl p-6 ">
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Performance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Best WPM</span>
                <span className="text-white font-semibold">42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Average WPM</span>
                <span className="text-white font-semibold">35</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Peak Accuracy</span>
                <span className="text-white font-semibold">98%</span>
              </div>
            </div>
          </div>

          <div className=" rounded-xl p-6 ">
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Session
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Tests Completed</span>
                <span className="text-white font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Time Spent</span>
                <span className="text-white font-semibold">8m 34s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Words</span>
                <span className="text-white font-semibold">342</span>
              </div>
            </div>
          </div>

          <div className=" rounded-xl p-6 ">
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Accuracy
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Correct Characters</span>
                <span className="text-white font-semibold">1,423</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Errors</span>
                <span className="text-white font-semibold">127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Error Rate</span>
                <span className="text-white font-semibold">8.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypingTestInterface;
