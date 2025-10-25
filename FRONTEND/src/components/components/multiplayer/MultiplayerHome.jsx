// components/MultiplayerHome.jsx
import React, { useEffect } from "react";
import { useTypingGame } from "../../../context/TypingGameContext";
import { useTheme } from "../../../context/ThemeContext";
import { useFinalDom } from "../../../context/FinalDomContext";
import { useLocation } from "@tanstack/react-router";

import TypingArea from "../TypingArea";
import ShowWpm from "../ShowWpm";
import TypeLogo from "../TypeLogo";
import ThemeSwitcher from "../ThemeSwitcher";
import MultiplayerHeader from "././MultiplayerHeader";
// import PlayerList from "./multiplayer/PlayerList";

function MultiplayerHome() {
  const location = useLocation();
  const roomSettings = location.state;
  
  // Use the SAME centralized context
  const typingGame = useTypingGame();
  const { setFinalDOM } = useFinalDom();
  const { theme } = useTheme();

  const {
    // State
    hasStarted,
    isTypingOver,
    showHeader,
    mode,
    option,
    timeDuration,
    typedChars,
    lastEntry,
    
    // Refs
    wordsRef,
    focusHereRef,
    cursorRef,
    timerRef,
    
    // Functions
    resetGame,
    handleLogoClick,
    setMode,
    setOption,
    setTimeDuration,
    setWordCount,
    
    // Derived values
    totalGameTime,
  } = typingGame;

  // Apply room settings when component mounts
  useEffect(() => {
    if (roomSettings?.gameSettings) {
      const { mode, option, wordCount, timeDuration } = roomSettings.gameSettings;
      setMode(mode);
      setOption(option);
      
      if (mode === 'words' || mode === 'numbers') {
        setWordCount(wordCount);
      } else if (mode === 'Time') {
        setTimeDuration(timeDuration);
      }
    }
  }, [roomSettings, setMode, setOption, setWordCount, setTimeDuration]);

  // Set final DOM when game ends
  useEffect(() => {
    if (isTypingOver && wordsRef.current) {
      const clonedDOM = wordsRef.current.cloneNode(true);
      setFinalDOM(clonedDOM);
    }
  }, [isTypingOver, setFinalDOM]);

  // Set theme
  useEffect(() => {
    const app = document.getElementById("app");
    if (app) app.setAttribute("data-theme", theme);
  }, [theme]);

  // Mock multiplayer data
  const [players] = React.useState([
    { id: 1, name: 'You', progress: 75, wpm: 65, accuracy: 98, isCurrent: true },
    { id: 2, name: 'ProTyper99', progress: 82, wpm: 72, accuracy: 96 },
    { id: 3, name: 'SpeedDemon', progress: 45, wpm: 58, accuracy: 92 },
    { id: 4, name: 'KeyboardWizard', progress: 68, wpm: 63, accuracy: 94 },
  ]);

  const [roomInfo] = React.useState({
    roomCode: roomSettings?.roomCode || 'ABC123',
    roomName: roomSettings?.roomName || 'Speed Race',
    maxPlayers: roomSettings?.maxPlayers || 4,
    isPrivate: roomSettings?.isPrivate || false,
  });

  return (
    <div
      id="app"
      data-theme={theme}
      className="w-screen min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800"
    >
      <TypeLogo
        showHeader={showHeader}
        onClick={handleLogoClick}
      />
      
      <MultiplayerHeader
        roomInfo={roomInfo}
        showHeader={showHeader}
        players={players}
      />

      <div className="flex w-full max-w-7xl mx-auto">
        {/* Player list sidebar */}
        <div className="w-80 p-6">
          {/* <PlayerList 
            players={players} 
            showProgress={!isTypingOver}
          /> */}
        </div>

        {/* Main typing area */}
        <div className="flex-1 py-8 px-4">
          {isTypingOver ? (
            <ShowWpm
              timerVal={totalGameTime / 1000}
              typedChars={typedChars}
              onReset={resetGame}
              isTypingOver={isTypingOver}
              multiplayer={true}
              players={players}
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
              multiplayer={true}
            />
          )}
        </div>
      </div>
      
      <div className="absolute bottom-8 right-8 z-50">
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default MultiplayerHome;