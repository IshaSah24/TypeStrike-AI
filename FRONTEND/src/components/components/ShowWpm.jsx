import React from "react";
import TypingGraph from "./TypingGraph";
import TypingStats from "./TypingStats";
import TypingTestInterface from "./TypingTestInterface";

function ShowWpm({ timerVal, typedChars, onReset }) {
  const correctChars = typedChars.filter((char) => char.correct).length;

  let durationInSeconds = timerVal;
  if (typedChars.length > 1) {
    const firstTime = typedChars[0].timestamp;
    const lastTime = typedChars[typedChars.length - 1].timestamp;
    durationInSeconds = (lastTime - firstTime) / 1000;
  }

  const wpm = Math.round((correctChars / 5 / durationInSeconds) * 60);

  const graphData = [];
  if (typedChars.length > 0) {
    const startTime = typedChars[0].timestamp;
    const lastTime = typedChars[typedChars.length - 1].timestamp;
    const totalSeconds = Math.ceil((lastTime - startTime) / 1000);

    for (let i = 1; i <= totalSeconds; i++) {
      const currentTime = startTime + i * 1000;
      const charsTillNow = typedChars.filter(
        (char) => char.timestamp <= currentTime
      );
      const correctTillNow = charsTillNow.filter((c) => c.correct).length;
      const incorrectTillNow = charsTillNow.filter((c) => !c.correct).length;
      const raw = charsTillNow.length;

      const currentWpm = Math.round((correctTillNow / 5 / i) * 60);

      graphData.push({
        second: i,
        wpm: currentWpm,
        errors: incorrectTillNow,
        raw: raw,
      });
    }
  }

  return (
    <div className="w-full text-center mt-18">
     <TypingTestInterface />
    </div>
  );
}

export default ShowWpm;
