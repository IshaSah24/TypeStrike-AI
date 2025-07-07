import React, { useEffect, useRef, useState } from "react";
import "../styles/type.css";
import { useLayoutEffect } from "react";
import { useCallback } from "react";
import Header from "../components/components/Header";
import ShowWpm from "../components/components/ShowWpm";
import TypingArea from "../components/components/TypingArea";
import LandingPage from "../components/components/LandingPage";

import { useRouterState } from "@tanstack/react-router";
// import { Zap } from "lucide-react";
import TypeLogo from "../components/components/TypeLogo";
import { useTheme } from "../context/ThemeContext";
import ThemeSwitcher from "../components/components/ThemeSwitcher";

// ========== CONSTANTS & UTILITIES ========== //
const PUNCTUATION_MARKS = [".", ",", ";", "!", "?", ":"];
const QUOTES = [
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  },
  { text: "Believe you can and you're halfway there." },
  { text: "Don't watch the clock; do what it does. Keep going." },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
  },
  {
    text: "Hardships often prepare ordinary people for an extraordinary destiny.",
  },
  {
    text: "Your time is limited so don't waste it living someone else's life.",
  },
  { text: "Start where you are. Use what you have. Do what you can." },
  { text: "It does not matter how slowly you go as long as you do not stop." },
  { text: "Great things never come from comfort zones." },
  { text: "Dream big and dare to fail." },
];

const CUSTOM_WORDS =
  "There are many variations passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.".split(
    " "
  );

const WORD_SOURCES = {
  custom: () => getRandomItem(CUSTOM_WORDS),
  words: () => getRandomItem(CUSTOM_WORDS),
  time: () => getRandomItem(CUSTOM_WORDS),
  zen: () => getRandomItem(CUSTOM_WORDS),
  quote: () => getRandomItem(QUOTES).text, // rename + extract text
  numbers: () => String(Math.floor(Math.random() * 100)),
  punctuation: () => getRandomItem(PUNCTUATION_MARKS),
  keyboard: () => getRandomItem(CUSTOM_WORDS),
};

// Helper functions
const getRandomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];
const addClass = (el, name) => el && el.classList.add(name);
const removeClass = (el, name) => el && el.classList.remove(name);
const addErrorLine = (el, className) => el && el.classList.add(className);
const removeErrorLine = (el, className) => el && el.classList.remove(className);

const formatWord = (word) =>
  `<div class="formatted">${word
    .split("")
    .map((l) => `<span class="letter">${l}</span>`)
    .join("")}</div>`;

// MAIN COMPONENT --------------------

function Home() {
  //  rendering  dynamic theme
  const { theme, setTheme } = useTheme();

  const [showKey, setShowKey] = useState(false);
  const [mode, setMode] = useState("words");
  const [option, setOption] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isTypingOver, setIsTypingOver] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [resetFlag, setResetFlag] = useState(false);
  const [typedChars, setTypedChars] = useState([]);
  const lastEntry = typedChars[typedChars.length - 1] || null;

  const [timeDuration, setTimeDuration] = useState(15);

  const { location } = useRouterState();

  const [wordCount, setWordCount] = useState(10);

  useEffect(() => {
    if (location.pathname === "/typing") {
      setHasStarted(true);
    }
  }, [location.pathname]);

  // hide header and other things to focus more on typing

  const [showHeader, setShowHeader] = useState(true);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  // ========== REFS ==========
  const wordsRef = useRef(null);
  const focusHereRef = useRef(null);
  const cursorRef = useRef(null);
  const timerRef = useRef(null);
  const quoteIndexRef = useRef(0);
  const isTimerRunningRef = useRef(false);
  const timerIntervalRef = useRef(null);
  const startedTypingTimeRef = useRef(null);
  const totalGameTimeRef = useRef(1000 * 10);

  const logoRef = useRef(null);

  // ========== GAME INITIALIZATION ========== //

  //  to  update the  word  cound  we have to  trigger  the initialize function after updating the state of  length of  word count called  "setWordCount"
  useEffect(() => {
    if (mode === "words") {
      initializeGame();
    }
  }, [wordCount]);

  const initializeGame = useCallback(() => {
    if (!wordsRef.current) return;

    wordsRef.current.innerHTML = "";

    setShowKey(option === "keyboard");

    if (mode === "quote") {
      console.log(`${mode} selected`);
      handleQuoteMode();
      return;
    }

    const count = mode === "words" ? wordCount : 15; // default for custom/zen

    renderWords(count, option);
    markFirstElement();
  }, [mode, option, wordCount]);

  const handleQuoteMode = () => {
    const quote = QUOTES[quoteIndexRef.current].text;
    quoteIndexRef.current = (quoteIndexRef.current + 1) % QUOTES.length;

    quote.split(" ").forEach((word) => {
      wordsRef.current.innerHTML += formatWord(word);
    });

    markFirstElement();
  };

  const renderWords = (count, option) => {
    let words = [];

    while (words.length < count) {
      let word = getRandomItem(CUSTOM_WORDS);

      if (option === "numbers" && Math.random() < 0.3) {
        word = `${Math.floor(Math.random() * 1000)}`; // Replace with number
      }

      if (option === "punctuation" && Math.random() < 0.3) {
        word = getRandomItem(PUNCTUATION_MARKS); // Replace with punctuation
      }

      words.push(word);
    }

    words.forEach((word) => {
      wordsRef.current.innerHTML += formatWord(word);
    });
  };

  const markFirstElement = () => {
    const firstWord = wordsRef.current.querySelector(".formatted");
    const firstLetter = wordsRef.current.querySelector(".letter");
    if (firstWord) addClass(firstWord, "current");
    if (firstLetter) addClass(firstLetter, "current");
    updateCursorPosition();
  };

  useLayoutEffect(() => {
    updateCursorPosition(); // already defined
  }, [typedChars]);

  // ========== TIMER FUNCTIONS =============
  const startTimer = () => {
    startedTypingTimeRef.current = startedTypingTimeRef.current || Date.now();

    clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      const elapsed = Math.round(
        (Date.now() - startedTypingTimeRef.current) / 1000
      );
      const remaining = totalGameTimeRef.current / 1000 - elapsed;

      if (timerRef.current) timerRef.current.textContent = remaining;

      if (remaining <= 0) {
        endGame();
      }
    }, 1000);
  };

  const endGame = () => {
    setInputDisabled(true);
    setIsTypingOver(true);
    clearInterval(timerIntervalRef.current);
    isTimerRunningRef.current = false;
  };

  // ========== TYPING LOGIC ============== /
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

  const handleKeyPress = (e) => {
    if (isTypingOver || inputDisabled) return;

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

    setHasStartedTyping(true);
    const currentWord = document.querySelector(".formatted.current");
    const currentLetter = document.querySelector(".letter.current");
    const expectedKey = currentLetter?.textContent || " ";

    // Handle different key types
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
      console.log(`Typed: ${typed}, Expected: ${expected}`);
      
      addClass(letterEl, typed === expected ? "correct" : "incorrect");
      removeClass(letterEl, "current");
      if (letterEl.nextSibling) {
        addClass(letterEl.nextSibling, "current");
      }
    } else if (wordEl) {
      const extra = document.createElement("span");
      extra.className = "incorrect extra letter";
      extra.textContent = typed;
      wordEl.appendChild(extra);
    }

    // show  wpm  when the  last letter of last word is typed
    checkIfTypingCompleted(letterEl?.parentElement, mode);
  };

  const handleSpace = (wordEl, letterEl, expected) => {
    if (!wordEl) return;

    // Preventing  space on first letter of the Word
    if (letterEl === wordEl.firstChild) return;

    // Mark remaining letters as incorrect
    let nextLetter = letterEl;
    while (nextLetter) {
      if (!nextLetter.classList.contains("correct")) {
        addClass(nextLetter, "incorrect");
      }
      nextLetter = nextLetter.nextSibling;
    }

    removeClass(wordEl, "current");

    // Add error line if any incorrect letters
    if (
      [...wordEl.children].some((child) =>
        child.classList.contains("incorrect")
      )
    ) {
      addErrorLine(wordEl, "errorLine");
    }
    // Move to next word
    // removeClass(wordEl, "current");
    if (wordEl.nextSibling) {
      addClass(wordEl.nextSibling, "current");
      const nextFirstLetter = wordEl.nextSibling.querySelector(".letter");
      if (nextFirstLetter) {
        addClass(nextFirstLetter, "current");
        removeClass(letterEl, "current");
      }
    }

    // showing  wpm after  typing  space at  the  last word
    checkIfTypingCompleted(wordEl, mode);
  };

  const checkIfTypingCompleted = (wordEl, mode) => {
    const isLastWord = !wordEl?.nextSibling;
    const allowedModes = ["words", "custom", "quote", "time", "zen", "custom"];

    if (isLastWord && allowedModes.includes(mode) && !isTypingOver) {
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

  const handleBackspace = (wordEl, letterEl) => {
    if (!wordEl) return;
    console.log("Handling backspace");

    // removeErrorLine(wordEl, "errorLine"); // instead of  removing error line multiple times, we will just remove it only once  with  condition
    if (wordEl.classList.contains("current")) {
      removeErrorLine(wordEl, "errorLine");
    }

    // Handling backspace at start of word
    if (letterEl === wordEl.firstChild) {
      removeClass(wordEl, "current");
      if (wordEl.previousSibling) {
        addClass(wordEl.previousSibling, "current");
        const lastLetter = wordEl.previousSibling.lastChild;
        if (lastLetter) {
          // addClass(lastLetter, "current");
          removeClass(letterEl, "current");
        }
      }
      return;
    }

    if (letterEl?.previousSibling) {
      removeClass(letterEl, "current");
      removeClass(letterEl, "incorrect");
      removeClass(letterEl, "correct");

      // Move "current" from the letter to the previous letter
      addClass(letterEl.previousSibling, "current");
      removeClass(letterEl.previousSibling, "incorrect");
      removeClass(letterEl.previousSibling, "correct");
    }

    // handling  extra letters
    else if (wordEl.lastChild?.classList.contains("extra")) {
      wordEl.removeChild(wordEl.lastChild);
    }
    // Handlling backspace on empty word
    else if (wordEl.lastChild) {
      addClass(wordEl.lastChild, "current");
      removeClass(wordEl.lastChild, "incorrect");
      removeClass(wordEl.lastChild, "correct");
    }

    if (wordEl.classList.contains("current")) {
      removeErrorLine(wordEl, "errorLine");
    }
  };

  const trackTypingMetrics = (typed, expected) => {
    if (typed.length !== 1 || typed === " ") return;

    setTypedChars((prev) => [
      ...prev,
      { char: typed, correct: typed === expected, timestamp: Date.now() },
    ]);

    // if (!isTimerRunningRef.current)    //  bug : in first render (mode==words: default) here  timer is runninf
    if (!isTimerRunningRef.current && mode === "time") {
      // Here the timer won't run
      isTimerRunningRef.current = true;
      startTimer();
    }
  };

  // ========== GAME CONTROLS =============== //
  const resetGame = () => {
    hasInteractedRef.current = true;

    // Start fade out
    if (wordsRef.current) {
      wordsRef.current.style.transition = "opacity 200ms ease-in-out";
      wordsRef.current.style.opacity = "0";
    }

    // Clear game state
    clearInterval(timerIntervalRef.current);
    // ... rest of state clearing ...

    // Wait for fade-out to complete
    setTimeout(() => {
      if (wordsRef.current) {
        // Clear content
        wordsRef.current.innerHTML = "";

        // Initialize new content
        initializeGame();

        // Force reflow
        void wordsRef.current.offsetHeight;

        // Trigger fade-in
        wordsRef.current.style.opacity = "1";
      }
    }, 200);
  };

  const startGame = () => {
    setHasStarted(true);
    setTimeout(initializeGame, 0);
  };

  // ========== UI HANDLERS  ============ //
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const withFadeTransition = (callback) => {
    if (!wordsRef.current) return;

    wordsRef.current.style.transition = "opacity 200ms ease-in-out";
    wordsRef.current.style.opacity = "0";

    setTimeout(() => {
      callback(); // trigger mode/option update
      void wordsRef.current.offsetHeight;
      wordsRef.current.style.opacity = "1";
    }, 200);
  };

  const handleModeSelect = (newMode) => {
    withFadeTransition(() => {
      setMode((prev) => (prev === newMode ? "custom" : newMode));
      setTypedChars([]);
      setHasStarted(true);
      console.log(newMode);
      wordsRef.current?.focus();
    });
  };

  const handleOptionSelect = (newOpt) => {
    // if (option === newOpt) {
    //   setOption(null);
    //   setShowKey(false);  // hide the  keyboard
    // } else {
    //   setOption(newOpt);
    // }

    withFadeTransition(() => {
      const updatedOpt = option === newOpt ? null : newOpt;
      setOption(updatedOpt);
      setTypedChars([]);
      setHasStarted(true);
      console.log(updatedOpt);

      wordsRef.current?.focus();
    });
  };

  useEffect(() => {
    if (mode === "time") {
      totalGameTimeRef.current = timeDuration * 1000;
      initializeGame();
    }
  }, [mode, timeDuration, initializeGame]);

  // ========== HEADER  SIDE EFFECTS  =============== //

  useEffect(() => {
    if (isTypingOver) return;

    const handleMouseMove = () => {
      setShowHeader(true); // Show and KEEP it
    };

    const handleKeyDown = () => {
      setShowHeader(false); // HIDE when typing resumes
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTypingOver]);

  useEffect(() => {
    const app = document.getElementById("app");
    if (app) app.setAttribute("data-theme", theme);
  }, [theme]);

  const hasInteractedRef = useRef(false);
  useEffect(() => {
    if (!hasStarted) return;
    initializeGame();

    const handleFocusChange = (e) => {
      const headerEl = document.querySelector("header");
      const resetIcon = document.querySelector(".reset-icon");

      const isInsideAllowed =
        wordsRef.current?.contains(e.target) ||
        focusHereRef.current?.contains(e.target) ||
        headerEl?.contains(e.target) ||
        resetIcon?.contains(e.target) ||
        logoRef.current?.contains(e.target); //  to  allow  click  on  logo--

      if (!hasInteractedRef.current) {
        // First interaction, we will  not blur
        wordsRef.current.style.filter = "none";
        if (cursorRef.current) cursorRef.current.style.display = "block";
        focusHereRef.current?.classList?.remove("opacity-100");
        focusHereRef.current?.classList?.add("opacity-0");
      } else if (isInsideAllowed) {
        // Allowed click inside
        wordsRef.current.style.filter = "none";
        if (cursorRef.current) cursorRef.current.style.display = "block";
        focusHereRef.current?.classList?.remove("opacity-100");
        focusHereRef.current?.classList?.add("opacity-0");
      } else {
        // Click outside  then: apply blur
        setTimeout(() => {
          if (wordsRef.current) wordsRef.current.style.filter = "blur(7px)";
          if (cursorRef.current) cursorRef.current.style.display = "none";
          focusHereRef.current?.classList?.add("opacity-100");
          focusHereRef.current?.classList?.remove("opacity-0");
        }, 700);
      }

      hasInteractedRef.current = true;
    };

    document.addEventListener("click", handleFocusChange);
    document.addEventListener("keyup", handleKeyPress);

    return () => {
      document.removeEventListener("click", handleFocusChange);
      document.removeEventListener("keyup", handleKeyPress);
      clearInterval(timerIntervalRef.current);
    };
  }, [hasStarted, resetFlag, inputDisabled, mode, option]);

  const handleClick = (e) => {
    e.stopPropagation(); // prevent the global click listener
    hasInteractedRef.current = true;
    withFadeTransition(() => initializeGame());
  };

  if (!hasStarted) {
    return (
      <LandingPage
        theme={theme}
        onToggleTheme={toggleTheme}
        onStartGame={startGame}
      />
    );
  }

  return (
    <div
      id="app"
      data-theme={theme}
      className="h-screen w-screen items-center justify-start flex flex-col bg-background"
    >
      <div className="flex">
        <TypeLogo
          showHeader={showHeader}
          onClick={(e) => {
            e.stopPropagation();
            hasInteractedRef.current = true; // prevent blur after click
            withFadeTransition(() => initializeGame());
          }}
        />

        {!isTypingOver && (
          <div
            className={`transition-all duration-500 ease-in-out w-full ${
              showHeader ? "opacity-100 " : "opacity-0  pointer-events-none"
            }`}
          >
            <Header
              theme={theme}
              onToggleTheme={toggleTheme}
              selectedMode={mode}
              onSelectMode={handleModeSelect}
              onSelectOpt={handleOptionSelect}
              SelectedOpt={option}
              showHeader={showHeader}
              onSelectTime={(val) => setTimeDuration(val)}
              selectedTime={timeDuration}
              onSelectCount={(val) => setWordCount(val)}
              selectedCount={wordCount}
            />
          </div>
        )}
      </div>

      {isTypingOver ? (
        <ShowWpm
          timerVal={totalGameTimeRef.current / 1000}
          typedChars={typedChars}
          onReset={resetGame}
        />
      ) : (
        <TypingArea
          showkey={showKey}
          handleReset={resetGame}
          focusHereRef={focusHereRef}
          cursorRef={cursorRef}
          wordsRef={wordsRef}
          timerRef={timerRef}
          lastChar={lastEntry?.char}
          lastCorrect={lastEntry?.correct}
          timeDuration={timeDuration}
          mode={mode}
        />
      )}
      <div className="absolute bottom-8 right-34 z-50">
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default Home;
