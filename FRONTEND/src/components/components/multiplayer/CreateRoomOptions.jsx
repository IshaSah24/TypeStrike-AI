
import React, { useState, useEffect } from "react";
import { Zap, Crown } from "lucide-react";

/*personal Notes : 
    1)  localSelectMode, localSelectOpt   is the function  paased  by  the  parent -> gamelobby so  that modes  and options  can be known   to parent

*/
const CreateRoomOptions = ({ localSelectMode, localSelectOpt }) => {

  const [selectedMode, setSelectedMode] = useState("words");
  const [selectedOption, setSelectedOption] = useState(10);

  const MODES = ["words", "quote", "time"];

  const WORD_OPTIONS = [10, 20, 30];
  const QUOTE_OPTIONS = [1, 2, 3];
  const TIME_OPTIONS = [15, 30, 60];

  const getOptionsForMode = (mode) => {
    switch (mode) {
      case "words":
        return WORD_OPTIONS;
      case "time":
        return TIME_OPTIONS;
      case "quote":
        return QUOTE_OPTIONS;
      default:
        return [];
    }    
  };  
  
useEffect(() => {
  if (selectedMode === "words") {
    setSelectedOption(10); 
  } else if (selectedMode === "time") {
    setSelectedOption(15); 
  } else if (selectedMode === "quote") {
    setSelectedOption(1); 
  }
}, [selectedMode]);



  const emitModeChange = (mode, option = null) => {
    if (typeof localSelectMode === "function") localSelectMode(mode, option);
    if (typeof localSelectOpt === "function") localSelectOpt(option);
  };

  const handleModeClick = (mode) => {
    setSelectedMode(mode);
   
    emitModeChange(mode, null);
  };

  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
    emitModeChange(selectedMode, opt);
  };

  const renderedOptions = getOptionsForMode(selectedMode);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-sm text-neutral-400 uppercase tracking-wide font-light">
          Typing Mode
        </h3>
      </div>

      <div className="flex gap-4 flex-wrap">
        {MODES.map((mode) => (
          <button
            key={mode}
            onClick={() => handleModeClick(mode)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-light tracking-wide transition-all duration-300 ${
              selectedMode === mode
                ? "bg-neutral-700/50 border-neutral-600 text-white"
                : "bg-neutral-800/30 border-neutral-700/50 text-neutral-400 hover:border-neutral-600/70 hover:bg-neutral-800/50"
            }`}
            aria-pressed={selectedMode === mode}
          >
            <Zap className="w-4 h-4" />
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>


      <div className="mt-3 flex gap-3 flex-wrap">
        {renderedOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => handleOptionClick(opt)}
            className={`px-3 py-2 rounded-xl border text-sm font-light tracking-wide transition-all duration-300 ${
              selectedOption === opt
                ? "bg-neutral-700/50 border-neutral-600 text-white"
                : "bg-neutral-800/30 border-neutral-700/50 text-neutral-400 hover:border-neutral-600/70 hover:bg-neutral-800/50"
            }`}
          >
            {selectedMode === "time" ? `${opt}s` : selectedMode === "words" ? `${opt} Words` : `${opt} Quote${opt > 1 ? "s" : ""}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CreateRoomOptions;
