import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Palette } from "lucide-react";

const themes = [
  { name: "light", label: "light", colors: ["#ffffff", "#d1d5db", "#111827"] },
  {
    name: "dark",
    label: "serika dark",
    colors: ["#1f2937", "#374151", "#9ca3af"],
  },
  { name: "blue", label: "blue", colors: ["#e0f2fe", "#0284c7", "#0c4a6e"] },
  {
    name: "yellow",
    label: "yellow",
    colors: ["#fef3c7", "#f59e0b", "#92400e"],
  },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = themes.filter((t) =>
    t.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed bottom-10 right-34 z-50 text-sm font-mono lowercase">
      <div className="relative">
        <div
          className="flex items-center gap-1 text-gray-500 dark:text-gray-400 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <Palette size={16} />
          <span>{theme}</span>
        </div>

        <div
          ref={dropdownRef}
          className={`absolute bottom-7 right-0 w-64 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 shadow-lg rounded-md p-2 space-y-1 z-50
            transition-all duration-200 ease-out transform origin-bottom-right
            ${
              open
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }
          `}
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filtered.map((t) => (
            <button
              key={t.name}
              onClick={() => {
                setTheme(t.name);
                setOpen(false);
              }}
              className={`w-full flex justify-between items-center px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-neutral-800 ${
                t.name === theme ? "bg-gray-200 dark:bg-neutral-700" : ""
              }`}
            >
              <span className="text-gray-800 dark:text-gray-200">
                {t.label}
              </span>
              <span className="flex space-x-1">
                {t.colors.map((c, i) => (
                  <span
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: c }}
                  ></span>
                ))}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
