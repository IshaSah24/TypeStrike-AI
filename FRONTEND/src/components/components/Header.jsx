import React from "react";
import {
  Zap,
  Settings,
  User,
  Bell,
  Clock,
  Hash,
  Type,
  Quote,
  Target,
  Palette,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// const themes = ["light", "dark", "blue", "yellow"];

const Header = ({
  selectedMode,
  onSelectMode,
  onSelectOpt,
  SelectedOpt,
  onSelectTime,
  selectedTime,
  onSelectCount,
  selectedCount,
}) => {
  const { theme, setTheme } = useTheme();

  const modifiers = [
    { id: "punctuation", icon: Hash, label: "punctuation" },
    { id: "numbers", icon: Hash, label: "numbers" },
  ];
  const modes = [
    { id: "time", icon: Clock, label: "time" },
    { id: "words", icon: Type, label: "words" },
    { id: "quote", icon: Quote, label: "quote" },
    { id: "zen", icon: Target, label: "zen" },
    { id: "custom", icon: Palette, label: "custom" },
  ];

  return (
    <header
      className="
        mb-26 
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:hidden pb-3">
          <nav className="flex items-center space-x-2 overflow-x-auto">
            {modes.map((mode) => {
              const IconComponent = mode.icon;
              const isActive = selectedMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => onSelectMode(mode.id)}
                  className={`
                    flex items-center justify-center p-2 rounded transition-colors
                    min-w-0 flex-shrink-0 cursor-pointer
                    ${
                      isActive
                        ? "text-yellow-400"
                        : "text-gray-500 hover:text-gray-300"
                    }
                  `}
                >
                  <IconComponent className="w-4 h-4" />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <div className="flex justify-center mt-10">
          <div
            className="
              flex items-center mt-10 
              bg-[var(--header-bg)] 
              rounded-lg overflow-hidden 
              shadow pr-2
            "
          >
            <nav
              className="inline-flex items-center space-x-1 py-2 px-2 
              bg-[var(--header-bg)] 
              text-[var(--header-text)]"
            >
              {modifiers.map((mod) => {
                const IconComponent = mod.icon;
                const isActive = SelectedOpt === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => onSelectOpt(mod.id)}
                    className={`
                      flex items-center space-x-2 px-3 py-[2px] rounded text-sm transition-colors cursor-pointer
                      ${
                        isActive
                          ? "font-semibold text-[var(--active)]"
                          : "text-[var(--inactive)] hover:text-[var(--active)]"
                      }
                    `}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{mod.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="w-[2px] h-[50%] bg-gray-400 mx-3 rounded-lg" />

            <nav className="inline-flex items-center space-x-1 py-2 px-2">
              {modes.map((mode) => {
                const IconComponent = mode.icon;
                const isActive = selectedMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => onSelectMode(mode.id)}
                    className={`
                      flex items-center space-x-2 px-3 py-[2px] rounded text-sm transition-colors cursor-pointer
                      ${
                        isActive
                          ? "font-semibold text-[var(--active)]"
                          : "text-[var(--inactive)] hover:text-[var(--active)]"
                      }
                    `}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{mode.label}</span>
                  </button>
                );
              })}
            </nav>

            <div
              className={`
                flex items-center overflow-hidden transition-all duration-300 ease-in-out
                ${
                  ["time", "words"].includes(selectedMode)
                    ? "max-w-[500px] opacity-100"
                    : "max-w-0 opacity-0"
                }
              `}
            >
              <div className="flex items-center h-full">
                <div className="w-[2px] h-6 bg-gray-400 rounded-lg mx-3" />
                {(selectedMode === "time"
                  ? [15, 30, 60]
                  : [10, 25, 30]
                ).map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      if (selectedMode === "time") onSelectTime(val);
                      else if (selectedMode === "words") onSelectCount(val);
                    }}
                    className={`
                      px-3 py-[2px] rounded text-sm transition-colors cursor-pointer
                      ${
                        val ===
                        (selectedMode === "time" ? selectedTime : selectedCount)
                          ? "font-semibold text-[var(--active)]"
                          : "text-[var(--inactive)] hover:text-[var(--active)]"
                      }
                    `}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
