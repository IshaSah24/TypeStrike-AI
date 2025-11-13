import React, { useEffect } from "react";
import "../styles/type.css";
// import { useTypingGame } from "../context/TypingGameContext";
import { useTheme } from "../context/ThemeContext";
import ShowWpm from "../components/components/ShowWpm";
import TypingArea from "../components/components/TypingArea";
import { useFinalDom } from "../context/FinalDomContext";
import { useRouterState } from "@tanstack/react-router";
import { useMultiplayerProvider } from "../context/MultiplayerContext";
import MultiplayerArea from "./MultiplayerArea";

function MultiplayerTypingArea() {










  const multiplayerTyping = useMultiplayerProvider();

  const { theme } = useTheme();
    const { setFinalDOM } = useFinalDom();
    const { location } = useRouterState();
    
  const {
    // State
    showkey,
    hasStarted,
    isTypingOver,
    showHeader,
    mode,
    option,
    timeDuration,
    wordCount,
    typedChars,
    lastEntry,
    
    // Refs
    wordsRef,
    focusHereRef,
    cursorRef,
    timerRef,
    
    // Functions
    startGame,
    resetGame,
    handleModeSelect,
    handleOptionSelect,
    handleLogoClick,
    setTimeDuration,
    setWordCount,
    setHasStarted,
    setIsTypingOver,
    setTypedChars,
    initializeGame,
    
    // Derived values
    totalGameTime,
  } = multiplayerTyping;


  useEffect(() => {
    // Initialize on mount
    setHasStarted(true);
    initializeGame();

    // Cleanup on unmount
    return () => {
      setHasStarted(false);
      setIsTypingOver(false);
      setTypedChars([]);
      if (wordsRef.current) {
        wordsRef.current.innerHTML = '';
      }
    };
  }, []);

  // Router effect
  useEffect(() => {
    if (location.pathname === "/play/single") {
      setHasStarted(true);
    }
  }, [location.pathname, setHasStarted]);

  // Theme effect
  useEffect(() => {
    const app = document.getElementById("app");
    if (app) app.setAttribute("data-theme", theme);
  }, [theme]);

  // Final DOM effect
  useEffect(() => {
    if (isTypingOver && wordsRef.current) {
      const clonedDOM = wordsRef.current.cloneNode(true);
      setFinalDOM(clonedDOM);
    }
  }, [isTypingOver, setFinalDOM]);



  return (
    <div id="app" data-theme={theme} className="min-h-screen">
      <div className="mt-8">
        {" "}
        <MultiplayerArea
          showkey={showkey}
          handleReset={resetGame}
          focusHereRef={focusHereRef}
          cursorRef={cursorRef}
          wordsRef={wordsRef}
          timerRef={timerRef}
          lastChar={lastEntry?.char}
          lastCorrect={lastEntry?.correct}
          timeDuration={timeDuration}
          mode={mode}
          onKeyPress={multiplayerTyping.handleKeyPress}
          isMultiplayer={true}
        />
      </div>
    </div>
  );
}

export default MultiplayerTypingArea;
