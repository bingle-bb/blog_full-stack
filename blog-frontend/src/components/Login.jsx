import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import blogApi from "../api/blogApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await blogApi.post("/user/login", { email, password });

      const userData = { email, accessToken: res.data.accessToken };
      login(userData); // save token in context/localStorage

      alert(res.data.message || "Logged in successfully!");
      navigate("/"); // redirect to home
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3 text-center">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded"
        style={{
          backgroundColor: theme === "dark" ? "#333" : "#FFF3CD",
          color: theme === "dark" ? "#fff" : "#000",
        }}
      >
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="text-end mt-2">
          <Link to="/forgot_password" className="text-decoration-none ">
            Forgot Password?
          </Link>
        </p>
        <button type="submit" className="btn btn-warning w-100">
          Login
        </button>
        <p className="text-center mt-2">
          Don’t have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
