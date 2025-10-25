import React, { useEffect } from "react";
import "../styles/type.css";
import { useTypingGame } from "../context/TypingGameContext";
import { useTheme } from "../context/ThemeContext";
import ShowWpm from "../components/components/ShowWpm";
import TypingArea from "../components/components/TypingArea";

function MultiplayerTypingArea() {
  const { theme } = useTheme();
  const typingGame = useTypingGame();
  const {
    showkey,
    focusHereRef,
    cursorRef,
    wordsRef,
    timerRef,
    timeDuration,
    mode,
    initializeGame,
    hasStarted,
    setHasStarted,
    handleKeyPress,
    isTypingOver,
    typedChars,
    totalGameTime,
    setIsTypingOver,
    setTypedChars,
    resetGameState,
  } = typingGame;

  const handleLocalReset = () => {
    resetGameState();
    if (wordsRef.current) {
      wordsRef.current.style.transition = "opacity 200ms ease-in-out";
      wordsRef.current.style.opacity = "0";
    }
    setTimeout(() => {
      setHasStarted(true);
      initializeGame();
      if (wordsRef.current) {
        void wordsRef.current.offsetHeight;
        wordsRef.current.style.opacity = "1";
      }
    }, 200);
  };

  // Theme effect
  useEffect(() => {
    const app = document.getElementById("app");
    if (app) {
      app.setAttribute("data-theme", theme);
      void app.offsetHeight;
    }
  }, [theme]);

  // Initialization effect
  useEffect(() => {
    setHasStarted(false);
    setIsTypingOver(false);
    setTypedChars([]);
    
    const initTimer = setTimeout(() => {
      setHasStarted(true);
      initializeGame();
      if (wordsRef.current) {
        void wordsRef.current.offsetHeight;
      }
    }, 100);

    return () => {
      clearTimeout(initTimer);
      setHasStarted(false);
      setIsTypingOver(false);
      setTypedChars([]);
      if (wordsRef.current) {
        wordsRef.current.innerHTML = "";
      }
    };
  }, []);

  // Keyboard listener
  useEffect(() => {
    document.addEventListener("keyup", handleKeyPress);
    return () => document.removeEventListener("keyup", handleKeyPress);
  }, [handleKeyPress]);

  if (isTypingOver) {
    return (
      <div id="app" data-theme={theme} className="min-h-screen">
        <div className="mt-8"> {/* Add consistent wrapper */}
          <ShowWpm
            timerVal={totalGameTime / 1000}
            typedChars={typedChars}
            onReset={handleLocalReset}
            isTypingOver={isTypingOver}
          />
        </div>
      </div>
    );
  }

  return (
    <div id="app" data-theme={theme} className="min-h-screen">
      <div className="mt-8"> {/* Change pt-16 to mt-8 to match TypingArea */}
        <TypingArea
          showkey={showkey}
          handleReset={handleLocalReset}
          focusHereRef={focusHereRef}
          cursorRef={cursorRef}
          wordsRef={wordsRef}
          timerRef={timerRef}
          timeDuration={timeDuration}
          mode={mode}
          onKeyPress={handleKeyPress}
          isMultiplayer={true} // Add this prop
        />
      </div>
    </div>
  );
}

export default MultiplayerTypingArea;
