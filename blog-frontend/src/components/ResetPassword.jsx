import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import blogApi from "../api/blogApi";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme } = useContext(ThemeContext);
  const { token } = useParams(); // required by teacher
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await blogApi.post(`/api/auth/reset-password/${token}`, {
        password,
      });

      alert("Password reset successfully");
      navigate("/login");
    } catch (err) {
      alert("Reset failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3 text-center">Reset Password</h2>

      <form
        onSubmit={handleSubmit}
        className="p-4 rounded"
        style={{
          backgroundColor: theme === "dark" ? "#333" : "#FFF3CD",
          color: theme === "dark" ? "#fff" : "#000",
        }}
      >
        <input
          type="password"
          className="form-control mb-3"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-warning w-100">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
