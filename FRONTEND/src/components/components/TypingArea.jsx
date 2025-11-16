import { RotateCcw } from "lucide-react";
import React, { useEffect } from "react";
import "../../styles/type.css";

function TypingArea({
  showkey,
  handleReset,
  focusHereRef,
  cursorRef,
  wordsRef,
  timerRef,
  timeDuration,
  mode,
  isMultiplayer = false 
  
}) {
  
console.log(mode);
if (mode === 'time') console.log(timeDuration);

console.log(wordsRef.current);


  return (
    <div className="mt-8 w-[90%] max-w-8xl text-xl mx-auto relative">


      
      {mode === "time" && (
        <div className="text-right mb-2 text-start">
          <span ref={timerRef}>{timeDuration}</span>s
        </div>
      )}


      <div className="  relative max-h-[80vh] overflow-y-auto leading-relaxed text-3xl text-gray-400 overflow-y-hidden">
        <div
          ref={wordsRef}
          className="words transition-opacity duration-500 opacity-100"
        ></div>
        <div
          id="cursor"
          ref={cursorRef}
          className="absolute z-10 blink transition-[top,left] duration-200 ease-in-out"
          style={{
            left: "22px",
            top: "16px",
            width: "3px",
            height: "2.5rem",
            backgroundColor: "rgb(30, 168, 163)",
          }}
        ></div>
      </div>


      <div
        ref={focusHereRef}
        className="typingarea absolute top-[-0.5rem] left-0 w-full h-[8rem] opacity-0"
        tabIndex={0}
      >
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm pointer-events-none">
          Click here to focus or type any key
        </div>
      </div>


      {!isMultiplayer && (
        <div className="flex justify-center h-10 mt-8 z-1 relative">
          <button
            onClick={handleReset}
            className="reset-icon text-[#c3c3c3] px-2 py-2 rounded-full text-sm transition-all duration-300 flex items-center hover:text-gray-500 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 block" />
          </button>
        </div>
      )}


      {showkey && (
        <div className="mt-6 text-center text-gray-500">
          [On-screen keyboard coming soon]
        </div>
      )}
    </div>
  );
}

export default TypingArea;
