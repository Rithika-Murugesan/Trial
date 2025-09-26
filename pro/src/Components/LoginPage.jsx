// src/Components/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginPage.css";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Extracted login request logic for reuse
  const sendLoginRequest = async () => {
    setLoading(true);
    try {

      const res = await axios.post("http://10.11.245.204:3000/api/login", {
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        setStep(2);
        setOtpTimer(120);
        alert("OTP sent to your email");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Login with email + password
  const handleLogin = (e) => {
    navigate('/bot');
   /* e.preventDefault();

    // Basic validation example
    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    sendLoginRequest();*/
  };

  // Step 2: Verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // OTP validation: 6 digit numeric
    if (!/^\d{6}$/.test(formData.otp)) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://10.102.148.10:3000/api/verify-otp",
        {
          email: formData.email,
          otp: formData.otp,
        }
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful! Welcome to BNP Paribas");
        navigate("/bot"); // Redirect after login, change path as needed
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = () => {
    sendLoginRequest();
  };

  return (
    <div className="login-container">
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>

      <button className="back-btn" onClick={() => window.history.back()}>
        ← Back
      </button>

      <div className="login-card">
        <div className="brand-section">
          <div className="brand-logo">🏦</div>
          <h1 className="brand-title">Welcome Back</h1>
          <p className="brand-subtitle">Sign in to your BNP Paribas account</p>
        </div>

        <div className="step-indicator">
          <div className={`step ${step >= 1 ? "active" : ""}`}></div>
          <div className={`step ${step >= 2 ? "active" : ""}`}></div>
        </div>

        {step === 1 ? (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="forgot-password">
              {/* Replace with proper routing if you have a forgot password page */}
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner"></span> Verifying...
                </>
              ) : (
                "Continue to OTP"
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <div className="otp-info">
              <p>We've sent a verification code to</p>
              <strong>{formData.email}</strong>
              {otpTimer > 0 ? (
                <p className="timer">
                  Code expires in {Math.floor(otpTimer / 60)}:
                  {(otpTimer % 60).toString().padStart(2, "0")}
                </p>
              ) : (
                <button
                  type="button"
                  className="resend-btn"
                  onClick={resendOtp}
                  disabled={loading}
                >
                  Resend Code
                </button>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Enter 6-digit OTP</label>
              <input
                type="text"
                name="otp"
                className="form-input"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="000000"
                maxLength="6"
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner"></span> Signing In...
                </>
              ) : (
                "Complete Login"
              )}
            </button>

            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <button
                type="button"
                className="resend-btn"
                onClick={() => setStep(1)}
                disabled={loading}
              >
                ← Back to login
              </button>
            </div>
          </form>
        )}

        <div className="switch-form">
          <p>
            Don't have an account? <Link to="/signup">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
