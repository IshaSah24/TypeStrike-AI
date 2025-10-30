import React, { useEffect, useState } from "react";
import TypingTestInterface from "./TypingTestInterface";
import { useFinalDom } from "../../context/FinalDomContext";

function ShowWpm({ timerVal, typedChars, onReset, isTypingOver}) {

  let correctWords = [];
  let incorrectWords = [];
  const correctChars = typedChars.filter((char) => char.correct).length;
/*   ACCESSING DOM FROM CONTEXT  OF CLONED DOM
------------------------------------------------*/
  const { finalDOM } = useFinalDom(); 

  useEffect(() => {
    if (finalDOM) {
     

      finalDOM.querySelectorAll('.formatted').forEach((wordEl) => {
        const isCorrect = [...wordEl.querySelectorAll('.letter')].every(
          (letter) => letter.classList.contains('correct')
        );
        isCorrect 
          ? correctWords.push(wordEl.textContent) 
          : incorrectWords.push(wordEl.textContent);
      });

      console.log('Correct:', correctWords, 'Incorrect:', incorrectWords);
    }
  }, [finalDOM]);


// FINDING THE  EXACT TIME WHEN USER FINISHES TYPING
// ---------------------------------------------------
  let durationInSeconds = timerVal;
  if (typedChars.length > 1) {
    const firstTime = typedChars[0].timestamp;
    const lastTime = typedChars[typedChars.length - 1].timestamp;
    durationInSeconds = (lastTime - firstTime) / 1000;
  }

  const wpm = Math.round((correctChars / 5 / durationInSeconds) * 60);


  // STORING  DATA:wpm,error IN EACH SECOND TO DESIGN GRAPH POINTS
  // ----------------------------------------------------------------
  const graphData = [];
  if (typedChars.length > 0) {
    const startTime = typedChars[0].timestamp;
    const lastTime = typedChars[typedChars.length - 1].timestamp;
    const totalSeconds = Math.ceil((lastTime - startTime) / 1000);

    for (let i = 1; i <= totalSeconds; i++) {
      const currentTime = startTime + i * 1000; // this  helps to find  in  which  second how many characters are typed
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

  const totalChars = typedChars.length;
  const correct = typedChars.filter((c) => c.correct).length;
  const incorrect = totalChars - correct;

  //consistancy

  let consistency = 100;

  if (graphData.length > 1) {
    const wpms = graphData.map((d) => d.wpm);
    const avg = wpms.reduce((a, b) => a + b, 0) / wpms.length;

    const deviation =
      wpms.reduce((sum, w) => sum + Math.abs(w - avg), 0) / wpms.length;
    consistency = Math.max(0, Math.round(100 - deviation));
  }

  const stats = {
    raw: totalChars,
    characters: {
      correct,
      incorrect,
      extra: 0,
      missed: 0,
    },
    consistency: consistency,
    time: Math.round(durationInSeconds),
  };

  const accuracy =
    correct + incorrect === 0
      ? 100
      : Math.round((correct / (correct + incorrect)) * 100);

  return (
    <div className="w-full text-center mt-18">
      {console.log(incorrect, correct, accuracy, consistency)}

      <TypingTestInterface
        graphData={graphData}
        stats={stats}
        wpm={wpm}
        accuracy={accuracy}
        typedChars={typedChars}
        correctWords={correctWords}
        incorrectWords={incorrectWords}
      />
    </div>
  );
}

export default ShowWpm;
