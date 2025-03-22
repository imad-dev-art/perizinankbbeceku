import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import LoginForm from "./auth/LoginForm";
import ForgotPasswordForm from "./auth/ForgotPasswordForm";
import ResetPasswordForm from "./auth/ResetPasswordForm";
import { cn } from "@/lib/utils";

type AuthView = "login" | "forgot-password" | "reset-password";

interface HomeProps {
  isAuthenticated?: boolean;
}

const Home = ({ isAuthenticated = false }: HomeProps) => {
  const [currentView, setCurrentView] = useState<AuthView>("login");
  const [resetToken, setResetToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLoginSubmit = (values: {
    username: string;
    password: string;
  }) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Login submitted:", values);
      setIsLoading(false);
      // In a real app, you would handle authentication here
      // and redirect on success
      navigate("/dashboard");
    }, 1500);
  };

  const handleForgotPasswordSubmit = (values: { email: string }) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Forgot password submitted:", values);
      setIsLoading(false);
      // In a real app, you would send a reset email
      // For demo purposes, we'll just set a fake token and switch views
      setResetToken("demo-reset-token");
      setCurrentView("reset-password");
    }, 1500);
  };

  const handleResetPasswordSubmit = (values: {
    password: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Reset password submitted:", values);
      setIsLoading(false);
      setIsSuccess(true);
      // In a real app, you would handle the password reset
      // and redirect to login after a delay
      setTimeout(() => {
        setCurrentView("login");
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left side - Branding */}
      <div className="bg-primary md:w-1/2 p-8 flex flex-col justify-center items-center text-white">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="p-3 bg-white/10 rounded-full">
              <Shield className="h-16 w-16" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Customs Permit Management System
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Streamline your customs permit applications with our comprehensive
            management system
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <p className="text-left">Submit permit applications online</p>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <p className="text-left">Track application status in real-time</p>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <p className="text-left">Receive digital approvals securely</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Authentication Forms */}
      <div className="md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {currentView === "login" && (
            <LoginForm onSubmit={handleLoginSubmit} />
          )}

          {currentView === "forgot-password" && (
            <ForgotPasswordForm
              onSubmit={handleForgotPasswordSubmit}
              isLoading={isLoading}
            />
          )}

          {currentView === "reset-password" && (
            <ResetPasswordForm
              token={resetToken}
              onSubmit={handleResetPasswordSubmit}
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
