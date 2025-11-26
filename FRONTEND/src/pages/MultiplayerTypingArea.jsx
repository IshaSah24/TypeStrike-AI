
import React, { useEffect, useState, useRef } from "react";
import "../styles/type.css";
import { useTheme } from "../context/ThemeContext";
import ShowWpm from "../components/components/ShowWpm";
import MultiplayerArea from "./MultiplayerArea";
import PlayersList from "../components/components/PlayersList";
import { useFinalDom } from "../context/FinalDomContext";
import { useRouterState } from "@tanstack/react-router";
import { useRoomSocket } from "../hooks/useRoomSocket";
import { useSelector } from "react-redux";
import { useMultiplayerProvider } from "../context/MultiplayerContext";

function MultiplayerTypingArea({
  roomId: propRoomId,
  words: initialWords,
  playerProgress: initialProgress,
}) {
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
    initializeGame,
    handleKeyPress,
    endGame,
  } = useMultiplayerProvider();
  const [words, setWords] = useState(Array.isArray(initialWords) ? initialWords : []);
  const [playerProgress, setPlayerProgress] = useState(initialProgress || {});
  const [raceStarted, setRaceStarted] = useState(false);
  const [startTimestamp, setStartTimestamp] = useState(null);

  const lastProgressEmitRef = useRef(0);

  const currentRoomId = propRoomId || location.state?.roomId;

  useEffect(() => {
    if (Array.isArray(initialWords)) {
      setWords(initialWords);
    }
  }, [initialWords]);

  useEffect(() => {
    if (!socket) return;

    const handleRaceStart = (data) => {
      console.log("Race started, words received:", data.words);
      const incomingWords = Array.isArray(data.words) ? data.words : [];
      setWords(incomingWords);

      setStartTimestamp(data.startTimestamp || Date.now());
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
    if (isTypingOver && wordsRef?.current) {
      try {
        const clonedDOM = wordsRef.current.cloneNode(true);
        setFinalDOM(clonedDOM);
        console.log("Final DOM set for results display.");
      } catch (err) {
        console.warn("Could not clone final DOM:", err);
      }
    }
  }, [isTypingOver, setFinalDOM, wordsRef]);

  useEffect(() => {
    return () => {
      resetGameState();
    };
  }, [resetGameState]);

  useEffect(() => {
    if (raceStarted) {
      try {
        focusHereRef?.current?.focus?.();
      } catch (err) {
  
      }
    }
  }, [raceStarted, focusHereRef]);

  return (
    <div id="app" data-theme={theme} className="min-h-screen">
      <div className="mt-8">
        {isTypingOver ? (
          <ShowWpm
            timerVal={
              startTimestamp
                ? (Date.now() - startTimestamp) / 1000
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
            {/* MultiplayerArea is responsible for rendering the words DOM,
                wiring refs (wordsRef, cursorRef, focusHereRef, timerRef)
                and forwarding keyboard events to the provider's handleKeyPress.
                We pass words[] so it can render the incoming words. */}
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
