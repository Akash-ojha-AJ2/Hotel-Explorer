import React, { useContext, useState } from "react";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigateTo = useNavigate();
   const {backend} = useContext(Context);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    verificationMethod: "",
  });

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler
  const handleRegister = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      phone: `+91${formData.phone}`,
    };

    try {
      const response = await fetch(`${backend}/api/v1/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      toast.success(result.message);
      navigateTo(`/otp-verification/${formData.email}/${dataToSend.phone}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div>
        <form className="auth-form" onSubmit={handleRegister}>
          <h2>Register</h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <div>
            <span>+91</span>
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <div className="verification-method">
            <p>Select Verification Method</p>
            <div className="wrapper">
              <label>
                <input
                  type="radio"
                  name="verificationMethod"
                  value="email"
                  checked={formData.verificationMethod === "email"}
                  onChange={handleChange}
                  required
                />
                Email
              </label>
              <label>
                <input
                  type="radio"
                  name="verificationMethod"
                  value="phone"
                  checked={formData.verificationMethod === "phone"}
                  onChange={handleChange}
                  required
                />
                Phone
              </label>
            </div>
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
