import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="toggle-wrapper">
      <input
        type="checkbox"
        id="theme-toggle"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label htmlFor="theme-toggle" className="toggle-label">
        <FontAwesomeIcon icon={faSun} className="sun-icon" />
        <FontAwesomeIcon icon={faMoon} className="moon-icon" />
        <div className="toggle-ball"></div>
      </label>
    </div>
  );
};

export default ThemeToggle;
