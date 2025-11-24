import React, { useEffect, useState, useRef } from "react";
import "../styles/type.css";
import { useTheme } from "../context/ThemeContext";
import ShowWpm from "../components/components/ShowWpm";
import TypingArea from "../components/components/TypingArea";
import { useFinalDom } from "../context/FinalDomContext";
import { useRouterState } from "@tanstack/react-router";
import { useRoomSocket } from "../hooks/useRoomSocket";
import { useSelector } from "react-redux";
import PlayersList from "../components/components/PlayersList";
import MultiplayerArea from "./MultiplayerArea";
import { useMultiplayerProvider } from "../context/MultiplayerContext";

function MultiplayerTypingArea({ roomId, words: initialWords, playerProgress: initialProgress }) {
  const { theme } = useTheme();
  const { setFinalDOM } = useFinalDom();
  const { location } = useRouterState();
  const { user } = useSelector((state) => state.auth || {});
  const { socket, finishRace } = useRoomSocket();
  const {
    wordsRef,
    focusHereRef,
    cursorRef,
    timerRef,
    typedChars,
    setTypedChars,
    isTypingOver,
    setIsTypingOver,
    hasStarted,
    setHasStarted,
    lastEntry,
    resetGameState,
  } = useMultiplayerProvider();

  console.log("testing  in :",wordsRef.current);
  console.log("testing  cursor  ref",  cursorRef.current);
  

  const [words, setWords] = useState(initialWords || []);
  const [playerProgress, setPlayerProgress] = useState(initialProgress || {});
  const [raceStarted, setRaceStarted] = useState(false);
  const [startTimestamp, setStartTimestamp] = useState(null);

  const lastProgressEmitRef = useRef(0);
  const startedTypingTimeRef = useRef(null);

  const currentRoomId = roomId || location.state?.roomId;

  useEffect(() => {
    if (Array.isArray(initialWords)) {
      setWords(initialWords);
    }
  }, [initialWords]);

  useEffect(() => {
    if (!socket) return;

    const handleRaceStart = (data) => {
      console.log("Race started, words received:", data.words);
      setWords(data.words || []);
      setStartTimestamp(data.startTimestamp);
      setHasStarted(true);
       setTypedChars([]);
       setIsTypingOver(false);
      setRaceStarted(false);
    };

    const handleRaceRunning = (data) => {
      console.log("Race is now running");
      setRaceStarted(true);
      if (data.startedAt) {
        setStartTimestamp(data.startedAt);
      }
    };

    const handlePlayerProgress = (data) => {
      setPlayerProgress((prev) => ({
        ...prev,
        [data.userId]: data,
      }));
    };

    const handlePlayerFinished = (data) => {
      setPlayerProgress((prev) => ({
        ...prev,
        [data.userId]: {
          ...prev[data.userId],
          ...data,
          finished: true,
        },
      }));
    };

    socket.on("raceStart", handleRaceStart);
    socket.on("raceRunning", handleRaceRunning);
    socket.on("playerProgress", handlePlayerProgress);
    socket.on("playerFinished", handlePlayerFinished);

    return () => {
      socket.off("raceStart", handleRaceStart);
      socket.off("raceRunning", handleRaceRunning);
      socket.off("playerProgress", handlePlayerProgress);
      socket.off("playerFinished", handlePlayerFinished);
    };
  }, [socket, setHasStarted, setTypedChars, setIsTypingOver]);

  useEffect(() => {
    const app = document.getElementById("app");
    if (app) app.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (isTypingOver && wordsRef.current) {
      const clonedDOM = wordsRef.current.cloneNode(true);
      setFinalDOM(clonedDOM);
      console.log("TEST : Final DOM set for results display.", clonedDOM);
      
    }
  }, [isTypingOver, setFinalDOM]);

  useEffect(() => {
    return () => {
      resetGameState();
    };
  }, [resetGameState]);

  const getCurrentPosition = () => {
    const wordsEls = wordsRef.current?.querySelectorAll?.(".formatted") || [];
    if (!wordsEls.length) return { wordIndex: 0, charIndex: 0 };

    let wordIndex = 0;
    for (let i = 0; i < wordsEls.length; i += 1) {
      if (wordsEls[i].classList.contains("current")) {
        wordIndex = i;
        break;
      }
    }

    const currentWord = wordsEls[wordIndex];
    const letters = [...(currentWord?.children || [])];
    let charIndex = 0;
    for (let i = 0; i < letters.length; i += 1) {
      if (letters[i].classList.contains("current")) {
        charIndex = i;
        break;
      }
    }

    return { wordIndex, charIndex };
  };

  const sendProgress = (force = false) => {
    if (!currentRoomId || !socket?.connected || !raceStarted) return;

    const now = Date.now();
    if (!force && now - lastProgressEmitRef.current < 150) return;
    lastProgressEmitRef.current = now;

    const { wordIndex, charIndex } = getCurrentPosition();

    let wpm = 0;
    const typed = typedChars.filter((t) => t && t.timestamp);
    if (typed.length >= 5 && startedTypingTimeRef.current) {
      const minutes = Math.max(
        1 / 60,
        (Date.now() - startedTypingTimeRef.current) / 1000 / 60
      );
      const correctChars = typed.filter((t) => t.correct).length;
      wpm = Math.round(correctChars / 5 / minutes);
    }

    const correctChars = typed.filter((t) => t.correct).length;
    const incorrectChars = typed.filter((t) => !t.correct).length;
    const totalChars = typed.length;
    const accuracy =
      totalChars === 0
        ? 100
        : Math.round((correctChars / totalChars) * 100);

    socket.emit("updateProgress", {
      roomId: currentRoomId,
      wordIndex,
      charIndex,
      wpm,
      errors: incorrectChars,
      accuracy,
      correctChars,
      incorrectChars,
    });
  };

  const handleKeyPress = (e) => {
    if (isTypingOver || !raceStarted || !hasStarted) return;

    const key = e.key;
    const ignoredKeys = [
      "Shift",
      "Control",
      "Alt",
      "Meta",
      "CapsLock",
      "Escape",
      "Tab",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Enter",
      "PageUp",
      "PageDown",
      "Home",
      "End",
      "Insert",
      "Delete",
      "NumLock",
      "ScrollLock",
      "Pause",
      "PrintScreen",
      "ContextMenu",
    ];
    if (ignoredKeys.includes(key)) return;

    if (!startedTypingTimeRef.current) {
      startedTypingTimeRef.current = Date.now();
    }

    const currentWord = document.querySelector(".formatted.current");
    const currentLetter = document.querySelector(".letter.current");
    const expectedKey = currentLetter?.textContent || " ";

    if (key.length === 1 && key !== " ") {
      handleLetter(key, expectedKey, currentLetter, currentWord);
    }
    if (key === " ") {
      handleSpace(currentWord, currentLetter, expectedKey);
    }
    if (key === "Backspace") {
      handleBackspace(currentWord, currentLetter);
    }

    updateCursorPosition();
    trackTypingMetrics(key, expectedKey);
  };

  const handleLetter = (typed, expected, letterEl, wordEl) => {
    if (letterEl) {
      letterEl.classList.add(typed === expected ? "correct" : "incorrect");
      letterEl.classList.remove("current");
      if (letterEl.nextSibling) {
        letterEl.nextSibling.classList.add("current");
      }
    } else if (wordEl) {
      const extra = document.createElement("span");
      extra.className = "incorrect extra letter";
      extra.textContent = typed;
      wordEl.appendChild(extra);
    }
    checkIfTypingCompleted(wordEl);
  };

  const handleSpace = (wordEl, letterEl) => {
    if (!wordEl) return;
    if (letterEl === wordEl.firstChild) return;

    let nextLetter = letterEl;
    while (nextLetter) {
      if (!nextLetter.classList.contains("correct")) {
        nextLetter.classList.add("incorrect");
      }
      nextLetter = nextLetter.nextSibling;
    }

    wordEl.classList.remove("current");
    if (wordEl.classList.contains("incorrect") || [...wordEl.children].some((c) => c.classList.contains("incorrect"))) {
      wordEl.classList.add("errorLine");
    }

    if (wordEl.nextSibling) {
      wordEl.nextSibling.classList.add("current");
      const nextFirstLetter = wordEl.nextSibling.querySelector(".letter");
      if (nextFirstLetter) {
        nextFirstLetter.classList.add("current");
        if (letterEl) letterEl.classList.remove("current");
      }
    }

    checkIfTypingCompleted(wordEl);
  };

  const handleBackspace = (wordEl, letterEl) => {
    if (!wordEl) return;
    if (wordEl.classList.contains("current")) {
      wordEl.classList.remove("errorLine");
    }

    if (letterEl === wordEl.firstChild) {
      wordEl.classList.remove("current");
      if (wordEl.previousSibling) {
        wordEl.previousSibling.classList.add("current");
        const lastLetter = wordEl.previousSibling.lastChild;
        if (lastLetter) {
          letterEl?.classList.remove("current");
        }
      }
      return;
    }

    if (letterEl?.previousSibling) {
      letterEl.classList.remove("current", "incorrect", "correct");
      letterEl.previousSibling.classList.add("current");
      letterEl.previousSibling.classList.remove("incorrect", "correct");
    } else if (wordEl.lastChild?.classList.contains("extra")) {
      wordEl.removeChild(wordEl.lastChild);
    } else if (wordEl.lastChild) {
      wordEl.lastChild.classList.add("current");
      wordEl.lastChild.classList.remove("incorrect", "correct");
    }

    if (wordEl.classList.contains("current")) {
      wordEl.classList.remove("errorLine");
    }
  };

  const checkIfTypingCompleted = (wordEl) => {
    if (!wordEl) return;
    const isLastWord = !wordEl.nextSibling;
    if (isLastWord) {
      const letters = [...wordEl.querySelectorAll(".letter")];
      const allTyped = letters.every(
        (l) =>
          l.classList.contains("correct") || l.classList.contains("incorrect")
      );
      if (allTyped) {
        endGame();
      }
    }
  };

  const trackTypingMetrics = (typed, expected) => {
    if (typed.length !== 1 || typed === " ") {
      if (typed === " ") sendProgress();
      return;
    }

    setTypedChars((prev) => [
      ...prev,
      { char: typed, correct: typed === expected, timestamp: Date.now() },
    ]);

    sendProgress();
  };

  const updateCursorPosition = () => {
    const currentLetter = document.querySelector(".letter.current");
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (currentLetter) {
      const letterRect = currentLetter.getBoundingClientRect();
      const containerRect = cursor.parentElement.getBoundingClientRect();
      cursor.style.top = `${letterRect.top - containerRect.top}px`;
      cursor.style.left = `${letterRect.left - containerRect.left}px`;
    } else {
      const currentWord = document.querySelector(".formatted.current");
      if (currentWord) {
        const wordRect = currentWord.getBoundingClientRect();
        const containerRect = cursor.parentElement.getBoundingClientRect();
        cursor.style.top = `${wordRect.top - containerRect.top}px`;
        cursor.style.left = `${
          wordRect.left - containerRect.left + currentWord.offsetWidth
        }px`;
      }
    }
  };

  const endGame = async () => {
    setIsTypingOver(true);

    const correctChars = typedChars.filter((c) => c.correct).length;
    const incorrectChars = typedChars.filter((c) => !c.correct).length;
    const totalChars = typedChars.length;
    const accuracy =
      totalChars === 0
        ? 100
        : Math.round((correctChars / totalChars) * 100);

    const duration = startedTypingTimeRef.current
      ? (Date.now() - startedTypingTimeRef.current) / 1000 / 60
      : 1 / 60;
    const wpm = Math.round(correctChars / 5 / duration);

    if (currentRoomId && socket?.connected) {
      try {
        await finishRace(currentRoomId, {
          wpm,
          accuracy,
          errors: incorrectChars,
          correctChars,
          incorrectChars,
          totalChars,
          time: duration * 60,
        });
      } catch (error) {
        console.error("Error finishing race:", error);
      }
    }
  };

  useEffect(() => {
    if (!hasStarted || !raceStarted) return;

    const handleKeyUp = (e) => handleKeyPress(e);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [hasStarted, raceStarted, isTypingOver]);

  useEffect(() => {
    updateCursorPosition();
  }, [typedChars]);

  return (
    <div id="app" data-theme={theme} className="min-h-screen">
      <div className="mt-8">
        {isTypingOver ? (
          <ShowWpm
            timerVal={
              startedTypingTimeRef.current
                ? (Date.now() - startedTypingTimeRef.current) / 1000
                : 0
            }
            typedChars={typedChars}
            onReset={() => {}}
            isTypingOver={isTypingOver}
            mode="words"
            wordCount={words.length}
            multiplayer={true}
            roomId={currentRoomId}
            roomName={location.state?.roomName}
          />
        ) : (
          <>
            <MultiplayerArea
              showkey={false}
              handleReset={() => {}}
              focusHereRef={focusHereRef}
              cursorRef={cursorRef}
              wordsRef={wordsRef}
              timerRef={timerRef}
              lastChar={lastEntry?.char}
              lastCorrect={lastEntry?.correct}
              timeDuration={0}
              mode="words"
              onKeyPress={handleKeyPress}
              isMultiplayer={true}
              words={words}
            />
            <div className="mb-4">
              <PlayersList playerProgress={playerProgress} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default MultiplayerTypingArea;
