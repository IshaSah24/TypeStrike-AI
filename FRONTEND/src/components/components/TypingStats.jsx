import React from "react";

function TypingStats({ 
  testType, 
  language, 
  wordCount, 
  rawWpm, 
  characters, 
  consistency, 
  time 
}) {
  return (
    <div className="flex justify-between items-center text-sm text-gray-400 mt-6 px-4">
      <div className="flex flex-col items-start">
        <span className="text-gray-500">test type</span>
        <span className="text-yellow-400 font-semibold">
          {testType} {wordCount}
        </span>
        <span className="text-yellow-400 font-semibold">
          {language}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-gray-500">raw</span>
        <span className="text-yellow-400 font-semibold text-lg">
          {rawWpm}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-gray-500">characters</span>
        <span className="text-yellow-400 font-semibold text-lg">
          {characters.correct}/{characters.incorrect}/{characters.extra}/{characters.missed}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-gray-500">consistency</span>
        <span className="text-yellow-400 font-semibold text-lg">
          {consistency}%
        </span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-gray-500">time</span>
        <span className="text-yellow-400 font-semibold text-lg">
          {time}s
        </span>
        <span className="text-xs text-gray-500">
          {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')} session
        </span>
      </div>
    </div>
  );
}

export default TypingStats;
