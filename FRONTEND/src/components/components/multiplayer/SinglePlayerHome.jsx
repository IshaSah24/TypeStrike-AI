// components/SinglePlayerHome.jsx
import React, { useEffect } from "react";
import { useTypingGame } from "../../../context/TypingGameContext";
import { useTheme } from "../../../context/ThemeContext";
import { useFinalDom } from "../../../context/FinalDomContext";
import { useRouterState } from "@tanstack/react-router";

import Header from "../Header";
import ShowWpm from "../ShowWpm";
import TypingArea from "../TypingArea";
import LandingPage from "../LandingPage";
import TypeLogo from "../TypeLogo";
import ThemeSwitcher from "../ThemeSwitcher";

function SinglePlayerHome() {
  // Use the centralized context
  const typingGame = useTypingGame();
  
  // Use other contexts
  const { setFinalDOM } = useFinalDom();
  const { theme } = useTheme();
  const { location } = useRouterState();

  // Destructure everything from the context
  const {
    // State
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
  } = typingGame;

  useEffect(() => {
    // Initialize on mount
    setHasStarted(true);
    initializeGame();

    // Cleanup on unmount
    return () => {
      setHasStarted(false);
      setIsTypingOver(false);
      resetGame();
      
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

  if (!hasStarted) {
    return <LandingPage onStartGame={startGame} />;
  }

  return (
    <div
      id="app"
      data-theme={theme}
      className="w-screen items-center justify-start flex flex-col"
    >
      <TypeLogo
        showHeader={showHeader}
        onClick={handleLogoClick}
      />
      
      {!isTypingOver && (
        <div
          className={`transition-all duration-500 ease-in-out w-full ${
            showHeader ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Header
            selectedMode={mode}
            onSelectMode={handleModeSelect}
            onSelectOpt={handleOptionSelect}
            SelectedOpt={option}
            showHeader={showHeader}
            onSelectTime={setTimeDuration}
            selectedTime={timeDuration}
            onSelectCount={setWordCount}
            selectedCount={wordCount}
          />
        </div>
      )}
      
      {isTypingOver ? (
        <ShowWpm
          timerVal={totalGameTime / 1000}
          typedChars={typedChars}
          onReset={resetGame}
          isTypingOver={isTypingOver}
        />
      ) : (
        <TypingArea
          showkey={option === "keyboard"}
          handleReset={resetGame}
          focusHereRef={focusHereRef}
          cursorRef={cursorRef}
          wordsRef={wordsRef}
          timerRef={timerRef}
          lastChar={lastEntry?.char}
          lastCorrect={lastEntry?.correct}
          timeDuration={timeDuration}
          mode={mode}
          onKeyPress={typingGame.handleKeyPress}
        />
      )}
      
      <div className="absolute bottom-8 right-34 z-50">
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default SinglePlayerHome;