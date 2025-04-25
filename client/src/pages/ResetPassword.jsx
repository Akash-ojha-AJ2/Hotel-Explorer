import React, { useContext, useState } from "react";
import "../styles/ResetPassword.css";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";

const ResetPassword = () => {
  const { isAuthenticated, setIsAuthenticated, setUser,setToken,backend} = useContext(Context);
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${backend}/api/v1/user/password/reset/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({ password, confirmPassword }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Password reset failed");
      }
  
      toast.success(result.message);
      setIsAuthenticated(true);
      setUser(result.user);
      setToken(result.token);
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="reset-password-page">
        <div className="reset-password-container">
          <h2>Reset Password</h2>
          <p>Enter your new password below.</p>
          <form className="reset-password-form" onSubmit={handleResetPassword}>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="reset-input"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="reset-input"
            />
            <button type="submit" className="reset-btn">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;