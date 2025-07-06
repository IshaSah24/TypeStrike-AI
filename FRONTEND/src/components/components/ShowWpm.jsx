import React from "react";

function ShowWpm({ timerVal, typedChars, onReset }) {
  const correctChars = typedChars.filter((c) => c.correct).length;
  const wpm = Math.round((correctChars / 5) / (timerVal / 60));

  return (
    <div className="text-center mt-12">
      <h2 className="text-3xl font-semibold">Typing Test Complete</h2>
      <p className="mt-4 text-xl">Words Per Minute: <strong>{wpm}</strong></p>
      <button onClick={onReset} className="mt-6 px-4 py-2 bg-green-600 text-white rounded">Try Again</button>
    </div>
  );
}

export default ShowWpm;