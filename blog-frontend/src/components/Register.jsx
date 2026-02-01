import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; //link
import { ThemeContext } from "../context/ThemeContext";
import blogApi from "../api/blogApi";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await blogApi.post("/user/register", {
        username,
        email,
        password,
      });

      alert(res.data.message || "Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3 text-center">Register</h2>

      <form
        onSubmit={handleSubmit}
        className="p-4 rounded"
        style={{
          backgroundColor: theme === "dark" ? "#333" : "#FFF3CD",
          color: theme === "dark" ? "#fff" : "#000",
        }}
      >
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-warning w-100">
          Register
        </button>

        {/* LOGIN LINK */}
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
