import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import ThemeToggle from "./components/ThemeToggle";
import List from "./components/List";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { ThemeContext } from "./context/ThemeContext";

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme === "dark" ? "#333" : "#FFF3CD",
        color: theme === "dark" ? "#FFF" : "#333",
      }}
    >
      <div className="d-flex justify-content-end p-3">
        <ThemeToggle />
      </div>

      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;
