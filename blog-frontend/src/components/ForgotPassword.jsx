import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import blogApi from "../api/blogApi";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await blogApi.post("/api/auth/forgot-password", { email });
      alert(res.data.message || "Reset link sent to your email");
      setEmail("");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3 text-center">Forgot Password</h2>

      <form
        onSubmit={handleSubmit}
        className="p-4 rounded"
        style={{
          backgroundColor: theme === "dark" ? "#333" : "#FFF3CD",
          color: theme === "dark" ? "#fff" : "#000",
        }}
      >
        {/* <p className="mb-2">Enter your registered email address</p> */}

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-warning w-100 mb-3">
          Send Reset Link
        </button>

        {/* Optional: direct link to Reset page for homework */}
        <p className="text-center mb-0">
          <Link to="/reset_passord/testtoken" className="text-decoration-none">
            Reset Password
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgetPassword;
