import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();


const getInitialTheme = () => {
  try {
    const savedTheme = localStorage.getItem("app-theme");
    return savedTheme ? savedTheme : "light";
  } catch {
    return "light"; // Fallback if localStorage fails
  }
};

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("app-theme", theme);
    document.getElementById("app")?.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
