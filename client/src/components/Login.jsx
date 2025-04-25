import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsAuthenticated, setUser, setToken,backend } = useContext(Context);
  const navigateTo = useNavigate();

  // Local state for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form submit handler
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${backend}/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }


      toast.success(result.message);
      setIsAuthenticated(true);
      setUser(result.user);
      setToken(result.token);
  
      // Delay navigation to allow toast to show
      setTimeout(() => {
        navigateTo("/");
      }, 1000); // 1-second delay
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <p className="forgot-password">
          <Link to={"/password/forgot"}>Forgot your password?</Link>
        </p>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
