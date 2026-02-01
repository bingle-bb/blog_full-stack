import { createContext, useContext, useState, useEffect } from "react";

// ✅ Create the context
export const ThemeContext = createContext();

// ✅ Provider component
export const ThemeProvider = ({ children }) => {
  // Load theme from localStorage if it exists, otherwise default to light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Update body background and localStorage whenever theme changes
  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "dark" ? "#333333" : "#FFF3CD";
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ Hook for convenience
export const useTheme = () => useContext(ThemeContext);
