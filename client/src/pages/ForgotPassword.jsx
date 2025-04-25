import React, { useContext, useState } from "react";
import "../styles/ForgotPassword.css";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { isAuthenticated,backend } = useContext(Context);
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${backend}/api/v1/user/password/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // same as withCredentials: true
        body: JSON.stringify({ email }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Failed to send reset link.");
      }
  
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  return (
    <>
      <div className="forgot-password-page">
        <div className="forgot-password-container">
          <h2>Forgot Password</h2>
          <p>Enter your email address to receive a password reset token.</p>
          <form
            onSubmit={handleForgotPassword}
            className="forgot-password-form"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="forgot-input"
            />
            <button type="submit" className="forgot-btn">
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;