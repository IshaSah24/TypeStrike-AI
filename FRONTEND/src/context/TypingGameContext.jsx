
import React, { useState, useRef, useCallback, useEffect, useLayoutEffect, createContext, useContext } from "react";

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

const TypingGameContext = createContext();
export const TypingGameProvider = ({ children }) => {
  // ========== STATE ==========
  const [showKey, setShowKey] = useState(false);
  const [mode, setMode] = useState("words");
  const [option, setOption] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isTypingOver, setIsTypingOver] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [typedChars, setTypedChars] = useState([]);
  const [timeDuration, setTimeDuration] = useState(15);
  const [wordCount, setWordCount] = useState(10);
  const [showHeader, setShowHeader] = useState(true);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const lastEntry = typedChars[typedChars.length - 1] || null;

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
  const hasInteractedRef = useRef(false);

  // ========== GAME INITIALIZATION ==========
  const initializeGame = useCallback(() => {
    if (!wordsRef.current) return;

    wordsRef.current.innerHTML = "";
    setShowKey(option === "keyboard");

    if (mode === "quote") {
      console.log(`${mode} selected`);
      handleQuoteMode();
      return;
    }

    const count = mode === "words" ? wordCount : 15;
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
        word = `${Math.floor(Math.random() * 1000)}`;
      }

      if (option === "punctuation" && Math.random() < 0.3) {
        word = getRandomItem(PUNCTUATION_MARKS);
      }

      words.push(word);
      console.log(`Added word: ${word}`);

      //need to  pass  to  the  backend  for  broadcasting in  multiplayer
      // when  it comes  back  we  can  render  it  accordingly
      
    }
    console.log(`Final word list: ${words.join(", ")}`);
    

    // here  we have  to  render that  words only came  from  the backend  broadcast event for   multiplayer 
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

    if (wordsRef.current) {
      return wordsRef.current.cloneNode(true);
    }
    return null;
  };

  // ========== TYPING LOGIC ==============
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

    checkIfTypingCompleted(letterEl?.parentElement, mode);
  };

  const handleSpace = (wordEl, letterEl, expected) => {
    if (!wordEl) return;

    if (letterEl === wordEl.firstChild) return;

  
    let nextLetter = letterEl;
    while (nextLetter) {
      if (!nextLetter.classList.contains("correct")) {
        addClass(nextLetter, "incorrect");
      }
      nextLetter = nextLetter.nextSibling;
    }

    removeClass(wordEl, "current");

  
    if (
      [...wordEl.children].some((child) =>
        child.classList.contains("incorrect")
      )
    ) {
      addErrorLine(wordEl, "errorLine");
    }

    if (wordEl.nextSibling) {
      addClass(wordEl.nextSibling, "current");
      const nextFirstLetter = wordEl.nextSibling.querySelector(".letter");
      if (nextFirstLetter) {
        addClass(nextFirstLetter, "current");
        removeClass(letterEl, "current");
      }
    }

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

    if (wordEl.classList.contains("current")) {
      removeErrorLine(wordEl, "errorLine");
    }

  
    if (letterEl === wordEl.firstChild) {
      removeClass(wordEl, "current");
      if (wordEl.previousSibling) {
        addClass(wordEl.previousSibling, "current");
        const lastLetter = wordEl.previousSibling.lastChild;
        if (lastLetter) {
          removeClass(letterEl, "current");
        }
      }
      return;
    }

    if (letterEl?.previousSibling) {
      removeClass(letterEl, "current");
      removeClass(letterEl, "incorrect");
      removeClass(letterEl, "correct");

      addClass(letterEl.previousSibling, "current");
      removeClass(letterEl.previousSibling, "incorrect");
      removeClass(letterEl.previousSibling, "correct");
    }

    
    else if (wordEl.lastChild?.classList.contains("extra")) {
      wordEl.removeChild(wordEl.lastChild);
    }
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

    if (!isTimerRunningRef.current && mode === "time") {
      isTimerRunningRef.current = true;
      startTimer();
    }
  };


  const resetGame = () => {
    hasInteractedRef.current = true;
    if (wordsRef.current) {
      wordsRef.current.style.transition = "opacity 200ms ease-in-out";
      wordsRef.current.style.opacity = "0";
    }


    clearInterval(timerIntervalRef.current);
    setInputDisabled(false);
    setIsTypingOver(false);
    setTypedChars([]);
    setHasStartedTyping(false);
    isTimerRunningRef.current = false;
    startedTypingTimeRef.current = null;

    setTimeout(() => {
      if (wordsRef.current) {
        wordsRef.current.innerHTML = "";
        initializeGame();
        void wordsRef.current.offsetHeight;
        wordsRef.current.style.opacity = "1";
      }
    }, 200);
  };

  const resetGameState = useCallback(() => {
    setHasStarted(false);
    setIsTypingOver(false);
    setTypedChars([]);
    setInputDisabled(false);
    clearInterval(timerIntervalRef.current);
    isTimerRunningRef.current = false;
    startedTypingTimeRef.current = null;
    
    if (wordsRef.current) {
      wordsRef.current.innerHTML = '';
    }
  }, []);

  const startGame = () => {
    setHasStarted(true);
    setTimeout(initializeGame, 0);
  };

  // ========== UI HANDLERS ============
  const withFadeTransition = (callback) => {
    if (!wordsRef.current) return;

    wordsRef.current.style.transition = "opacity 200ms ease-in-out";
    wordsRef.current.style.opacity = "0";

    setTimeout(() => {
      callback();
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
    withFadeTransition(() => {
      const updatedOpt = option === newOpt ? null : newOpt;
      setOption(updatedOpt);
      setTypedChars([]);
      setHasStarted(true);
      console.log(updatedOpt);
      wordsRef.current?.focus();
    });
  };

  const handleLogoClick = (e) => {
    e.stopPropagation();
    hasInteractedRef.current = true;
    withFadeTransition(() => initializeGame());
  };

  // ========== EFFECTS ===============
  useLayoutEffect(() => {
    updateCursorPosition();
  }, [typedChars]);

  useEffect(() => {
    if (mode === "words") {
      initializeGame();
    }
  }, [wordCount]);

  useEffect(() => {
    if (mode === "time") {
      totalGameTimeRef.current = timeDuration * 1000;
      initializeGame();
    }
  }, [mode, timeDuration, initializeGame]);

  useEffect(() => {
    if (isTypingOver) return;

    const handleMouseMove = () => {
      setShowHeader(true);
    };

    const handleKeyDown = () => {
      setShowHeader(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTypingOver]);

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
        logoRef.current?.contains(e.target);

      if (!hasInteractedRef.current) {
        wordsRef.current.style.filter = "none";
        if (cursorRef.current) cursorRef.current.style.display = "block";
        focusHereRef.current?.classList?.remove("opacity-100");
        focusHereRef.current?.classList?.add("opacity-0");
      } else if (isInsideAllowed) {
        wordsRef.current.style.filter = "none";
        if (cursorRef.current) cursorRef.current.style.display = "block";
        focusHereRef.current?.classList?.remove("opacity-100");
        focusHereRef.current?.classList?.add("opacity-0");
      } else {
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
  }, [hasStarted, inputDisabled, mode, option]);

  // ========== CONTEXT VALUE ==========
  const value = {

    showKey,
    mode,
    option,
    hasStarted,
    isTypingOver,
    inputDisabled,
    typedChars,
    timeDuration,
    wordCount,
    showHeader,
    hasStartedTyping,
    lastEntry,

    wordsRef,
    focusHereRef,
    cursorRef,
    timerRef,
    logoRef,


    setShowKey,
    setMode,
    setOption,
    setHasStarted,
    setIsTypingOver,
    setInputDisabled,
    setTypedChars,
    setTimeDuration,
    setWordCount,
    setShowHeader,
    setHasStartedTyping,


    initializeGame,
    handleKeyPress,
    resetGame,
    startGame,
    handleModeSelect,
    handleOptionSelect,
    handleLogoClick,
    endGame,
    resetGameState,
    
    totalGameTime: totalGameTimeRef.current,
  };

  return (
    <TypingGameContext.Provider value={value}>
      {children}
    </TypingGameContext.Provider>
  );
};

export const useTypingGame = () => {
  const context = useContext(TypingGameContext);
  if (!context) {
    throw new Error('useTypingGame must be used within a TypingGameProvider');
  }
  return context;
};