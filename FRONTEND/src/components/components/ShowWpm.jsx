import React, { useEffect, useState } from "react";
import TypingTestInterface from "./TypingTestInterface";
import { useFinalDom } from "../../context/FinalDomContext";
import { saveTypingResult, saveRaceResult } from "../../apis/typing";
import { useSelector } from "react-redux";

function ShowWpm({ timerVal, typedChars, onReset, isTypingOver, mode, wordCount, multiplayer, roomId, roomName }) {

  const [words, setWords] = useState([]);
  const [wordErrors, setWordErrors] = useState({});
  let correctWords = [];
  let incorrectWords = [];
  const correctChars = typedChars.filter((char) => char.correct).length;

  const { finalDOM } = useFinalDom(); 

  useEffect(() => {
    if (finalDOM) {
      const allWords = [];
      const errors = {};

      finalDOM.querySelectorAll('.formatted').forEach((wordEl) => {
        const wordText = wordEl.textContent.trim();
        allWords.push(wordText);
        
        const isCorrect = [...wordEl.querySelectorAll('.letter')].every(
          (letter) => letter.classList.contains('correct')
        );
        
        if (!isCorrect) {
          errors[wordText] = (errors[wordText] || 0) + 1;
          incorrectWords.push(wordText);
        } else {
          correctWords.push(wordText);
        }
      });

      setWords(allWords);
      setWordErrors(errors);
      console.log('Correct:', correctWords, 'Incorrect:', incorrectWords);
    }
  }, [finalDOM]);


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

  const totalChars = typedChars.length;
  const correct = typedChars.filter((c) => c.correct).length;
  const incorrect = totalChars - correct;


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

  const { isAuthenticated } = useSelector((state) => state.auth || {});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isTypingOver && isAuthenticated && !saved) {
      const saveResult = async () => {
        try {
          if (multiplayer && roomId) {
            
            await saveRaceResult({
              roomId,
              roomName: roomName || "Untitled Room",
              wpm,
              accuracy,
              errors: incorrect,
              position: 1,
              totalPlayers: 1, 
            });
            console.log("Race result saved successfully");
          } else {
            await saveTypingResult({
              wpm,
              accuracy,
              errors: incorrect,
              correctChars: correct,
              incorrectChars: incorrect,
              totalChars: totalChars,
              time: Math.round(durationInSeconds),
              mode: mode || 'words',
              wordCount: wordCount || 0,
              words: words,
              wordErrors: wordErrors,
            });
            console.log("Typing result saved successfully");
          }
          setSaved(true);
        } catch (error) {
          console.error("Failed to save result:", error);
        }
      };
      saveResult();
    }
  }, [isTypingOver, isAuthenticated, saved, multiplayer, roomId, roomName, wpm, accuracy, incorrect, correct, totalChars, durationInSeconds, mode, wordCount, words, wordErrors]);

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
