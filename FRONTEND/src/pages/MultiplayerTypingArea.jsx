import React, { useEffect, useState, useRef, useCallback } from "react";
import "../styles/type.css";
import { useTheme } from "../context/ThemeContext";
import MultiplayerArea from "./MultiplayerArea";
import PlayersList from "../components/components/PlayersList";
import { useFinalDom } from "../context/FinalDomContext";
import { useRouterState } from "@tanstack/react-router";
import { useRoomSocket } from "../hooks/useRoomSocket";
import { useSelector } from "react-redux";
import { useMultiplayerProvider } from "../context/MultiplayerContext";
import MultiplayerWpm from "./MultiplayerWpm";

export default function MultiplayerTypingArea({
  roomId: propRoomId,
  words: initialWords,
  playerProgress: initialProgress,
}) {
  const { theme } = useTheme();
  const { setFinalDOM } = useFinalDom();
  const { location } = useRouterState();
  const { user } = useSelector((state) => state.auth || {});
  const { socket } = useRoomSocket();

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
    initializeGame,
    handleKeyPress,
    sendProgressForce,
    players: contextPlayers,
    room,
  } = useMultiplayerProvider();

  const [words, setWords] = useState(Array.isArray(initialWords) ? initialWords : []);
  const [players, setPlayers] = useState(initialProgress || {});
  const [raceStarted, setRaceStarted] = useState(false);
  const [startTimestamp, setStartTimestamp] = useState(null);

  const lastProgressEmitRef = useRef(0);
  const currentRoomId = propRoomId || location.state?.roomId || room?.id;

  useEffect(() => {
    if (contextPlayers) setPlayers(contextPlayers);
  }, [contextPlayers]);

  useEffect(() => {
    if (Array.isArray(initialWords)) setWords(initialWords);
  }, [initialWords]);
  useEffect(() => {
    if (!socket) return;

    const handleRaceStart = (data) => {
      setWords(Array.isArray(data.words) ? data.words : []);
      setStartTimestamp(data.startTimestamp || Date.now());
      setHasStarted(true);
      setTypedChars([]);
      setIsTypingOver(false);
      setRaceStarted(false);

      setTimeout(() => {
        initializeGame?.();
      }, 0);
    };

    const handleRaceRunning = (data) => {
      setRaceStarted(true);
      if (data?.startedAt) setStartTimestamp(data.startedAt);
    };

    const handlePlayerProgress = (data) => {
      setPlayers((prev) => ({ ...prev, [data.userId]: data }));
    };

    const handlePlayerFinished = (data) => {
      setPlayers((prev) => ({
        ...prev,
        [data.userId]: { ...(prev[data.userId] || {}), ...data, finished: true },
      }));
    };

    const handleRaceComplete = (data) => {
      const updatedPlayers = {};
      data.results.forEach((p) => (updatedPlayers[p.userId] = p));
      setPlayers(updatedPlayers);
      setIsTypingOver(true);
    };

    socket.on("raceStart", handleRaceStart);
    socket.on("raceRunning", handleRaceRunning);
    socket.on("playerProgress", handlePlayerProgress);
    socket.on("playerFinished", handlePlayerFinished);
    socket.on("raceComplete", handleRaceComplete);

    return () => {
      socket.off("raceStart", handleRaceStart);
      socket.off("raceRunning", handleRaceRunning);
      socket.off("playerProgress", handlePlayerProgress);
      socket.off("playerFinished", handlePlayerFinished);
      socket.off("raceComplete", handleRaceComplete);
    };
  }, [socket, initializeGame, setHasStarted, setTypedChars, setIsTypingOver]);

  useEffect(() => {
    if (isTypingOver && wordsRef?.current) {
      try {
        const clonedDOM = wordsRef.current.cloneNode(true);
        setFinalDOM(clonedDOM);
      } catch (err) {
        console.warn("Could not clone final DOM:", err);
      }
    }
  }, [isTypingOver, wordsRef, setFinalDOM]);

  useEffect(() => {
    return () => resetGameState?.();
  }, [resetGameState]);

  useEffect(() => {
    if (raceStarted) {
      try {
        focusHereRef?.current?.focus?.();
      } catch {}
    }
  }, [raceStarted, focusHereRef]);
  const computeCurrentPosition = useCallback(() => {
    const root = wordsRef.current;
    if (!root) return { wordIndex: 0, charIndex: 0 };

    const wordEls = root.querySelectorAll?.(".formatted") || [];
    if (!wordEls.length) return { wordIndex: 0, charIndex: 0 };

    let wordIndex = 0;
    for (let i = 0; i < wordEls.length; i++) {
      if (wordEls[i].classList.contains("current")) {
        wordIndex = i;
        break;
      }
    }

    const letters = [...(wordEls[wordIndex]?.children || [])];
    let charIndex = 0;
    for (let i = 0; i < letters.length; i++) {
      if (letters[i].classList.contains("current")) {
        charIndex = i;
        break;
      }
    }

    return { wordIndex, charIndex };
  }, [wordsRef]);

  const emitProgress = useCallback(() => {
    const now = Date.now();
    if (now - lastProgressEmitRef.current < 200) return;
    lastProgressEmitRef.current = now;

    if (!socket?.connected || !currentRoomId) return;

    const { wordIndex, charIndex } = computeCurrentPosition();
    console.log("word index : ", wordIndex);
    console.log("char index : ", charIndex);
    
    const correctChars = typedChars.filter((t) => t?.correct).length;
    const incorrectChars = typedChars.length - correctChars;

    socket.emit("updateProgress", {
      roomId: currentRoomId,
      wordIndex,
      charIndex,
      correctChars,
      incorrectChars,
    });
  }, [socket, currentRoomId, computeCurrentPosition, typedChars]);

  const onKeyDown = (e) => {
    handleKeyPress?.(e);

    setTimeout(() => {
      //testing local 
      // sendProgressForce?.();

      emitProgress();
    }, 0);
  };

  return (
    <div id="app" data-theme={theme} className="min-h-screen">
      <div className="mt-8">
        {isTypingOver ? (
          <MultiplayerWpm wordsRef={wordsRef} players={players} />
        ) : (
          <>
            <MultiplayerArea
              showkey={false}
              handleReset={() => {
                resetGameState?.();
                initializeGame?.();
              }}
              focusHereRef={focusHereRef}
              cursorRef={cursorRef}
              wordsRef={wordsRef}
              timerRef={timerRef}
              lastChar={lastEntry?.char}
              lastCorrect={lastEntry?.correct}
              timeDuration={0}
              mode="words"
              onKeyPress={onKeyDown}
              isMultiplayer={true}
              words={words}
            />
            <div className="mb-4">
              <PlayersList playerProgress={players} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
