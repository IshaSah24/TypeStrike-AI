import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function TypedWords({ incorrectWords }) {
  const [uniqueIncorrect, setUniqueIncorrect] = useState([]);
  const [showHistory, setShowHistory] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  
  useEffect(() => {
    if (!incorrectWords || incorrectWords.length === 0) return;

    // IMPLEMENTING  LOCAL STORAGE  HERE  TO  SOTRE THE INCORRECT WORDS  AND TRACK THE FREQUENTLY TYPED INCOORECT WORDS + NEW
    const pastMistakes = JSON.parse(
      localStorage.getItem("typingMistakes") || "{}"
    );
    incorrectWords.forEach((word) => {
      pastMistakes[word] = (pastMistakes[word] || 0) + 1;
    });
    localStorage.setItem("typingMistakes", JSON.stringify(pastMistakes));

    setUniqueIncorrect([...new Set(incorrectWords)]);

    // Force re-render  -  as the localstorage is not  the  state of react  so  it  doesn't have any  idea when  when  its gets updated..
    setRefreshKey((prev) => prev + 1);
  }, [incorrectWords]);

  console.log(incorrectWords);
  return (
    <div className="w-full text-center mt-4">
      {/* Button */}

      <button
        onClick={() => setShowHistory(!showHistory)}
        className="p-4 py-2 text-[var(--other-text-color)] rounded-md transition-all cursor-pointer flex items-center gap-2 "
      >
        {showHistory ? "Hide Incorrect Words" : "View Incorrect Words"}
        {showHistory ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Incorrect Words */}
      {showHistory && (
        <div className="m-4 mb-6 p-4 rounded-lg max-w-6xl mx-auto transition-all duration-300">
          <div className="flex flex-wrap gap-5 justify-center text-2xl">
            {uniqueIncorrect.map((word, i) => (
              <span
                key={`i-${i}`}
                className="px-4 rounded bg-red-500/20 text-red-400 font-mono"
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
