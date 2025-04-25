import React, { useContext, useState } from "react";
import "../styles/OtpVerification.css";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";

const OtpVerification = () => {
  const { isAuthenticated, setIsAuthenticated, setUser,setToken,backend } = useContext(Context);
  const { email, phone } = useParams();
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    const data = {
      email,
      otp: enteredOtp,
      phone,
    };
  
    try {
      const response = await fetch(`${backend}/api/v1/user/otp-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Same as withCredentials: true in axios
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "OTP verification failed");
      }
  
      toast.success(result.message);
      setIsAuthenticated(true);
      setUser(result.user);
      setToken(result.token);
    } catch (err) {
      toast.error(err.message);
      setIsAuthenticated(false);
      setUser(null);
    }
  };
  

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="otp-verification-page">
        <div className="otp-container">
          <h1>OTP Verification</h1>
          <p>Enter the 5-digit OTP sent to your registered email or phone.</p>
          <form onSubmit={handleOtpVerification} className="otp-form">
            <div className="otp-input-container">
              {otp.map((digit, index) => {
                return (
                  <input
                  id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    key={index}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="otp-input"
                  />
                );
              })}
            </div>
            <button type="submit" className="verify-button">
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;