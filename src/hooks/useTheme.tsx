'use client';

import React, { createContext, useEffect, useState, useContext } from "react";

interface ThemeProviderProps {
    children: React.ReactNode
}

interface ThemeContextProps {
    theme:string;
    toggleTheme: () => void;
}

const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({ children }:ThemeProviderProps) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    
    return context
}
