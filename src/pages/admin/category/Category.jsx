import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // React Query mutation hooks
  const sendOtpMutation = useMutation(
    (email) =>
      axios.post("http://localhost:5000/api/auth/forgot-password", { email }),
    {
      onSuccess: (data) => {
        toast.success(data.message || "OTP sent to your email.");
        setStep(2); // Move to Step 2
        setError("");
      },
      onError: (error) => {
        setError(error.response?.data?.message || "Something went wrong.");
        toast.error(error.response?.data?.message || "Failed to send OTP");
      },
    }
  );

  const verifyOtpMutation = useMutation(
    (data) => axios.post("http://localhost:5000/api/auth/verify-otp", data),
    {
      onSuccess: (data) => {
        toast.success(
          data.message || "OTP verified. Please enter a new password."
        );
        setStep(3); // Move to Step 3
        setError("");
      },
      onError: (error) => {
        setError(error.response?.data?.message || "Invalid OTP.");
        toast.error(error.response?.data?.message || "Failed to verify OTP");
      },
    }
  );

  const resetPasswordMutation = useMutation(
    (data) => axios.post("http://localhost:5000/api/auth/reset-password", data),
    {
      onSuccess: (data) => {
        toast.success(data.message || "Password has been reset.");
        setError("");
        navigate("/login");
      },
      onError: (error) => {
        setError(error.response?.data?.message || "Something went wrong.");
        toast.error(
          error.response?.data?.message || "Failed to reset password"
        );
      },
    }
  );

  // Handle email submission (Step 1)
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    sendOtpMutation.mutate(email);
  };

  // Handle OTP submission (Step 2)
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    verifyOtpMutation.mutate({ email, otp });
  };

  // Handle Password Reset (Step 3)
  const handlePasswordReset = (e) => {
    e.preventDefault();
    resetPasswordMutation.mutate({ email, newPassword, otp });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-[400px]">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          {step === 1 && "Validate Email"}
          {step === 2 && "Enter OTP"}
          {step === 3 && "Reset Password"}
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border p-2 rounded-md mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md"
              disabled={sendOtpMutation.isLoading}
            >
              {sendOtpMutation.isLoading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full border p-2 rounded-md mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md"
              disabled={verifyOtpMutation.isLoading}
            >
              {verifyOtpMutation.isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordReset}>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full border p-2 rounded-md mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md"
              disabled={resetPasswordMutation.isLoading}
            >
              {resetPasswordMutation.isLoading
                ? "Resetting..."
                : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
