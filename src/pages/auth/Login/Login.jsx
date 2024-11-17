import React, { useState } from "react";
import { Images } from "../../../assets";
import { IoMail } from "react-icons/io5";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-navy-600 to-gray-900">
      {/* Logo positioned at top left */}
      <div className="absolute top-6 left-6">
        <div className="bg-white p-3 rounded-xl shadow-md">
          <img src={Images.Logo} alt="Company Logo" className="h-auto w-20" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-50 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Main Container */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative w-full max-w-lg p-5">
          {/* Glass Card */}
          <div className="backdrop-blur-lg bg-white bg-opacity-10 rounded-2xl shadow-2xl p-8 border border-white border-opacity-20">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-200 opacity-80">
                Please sign in to your account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoMail className="h-5 w-5 text-gray-300 group-focus-within:text-blue-400 transition-colors duration-200" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-white border-opacity-20 rounded-xl 
                             bg-white bg-opacity-10 text-white placeholder-gray-300
                             focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                             backdrop-blur-sm transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-300 group-focus-within:text-blue-400 transition-colors duration-200" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-white border-opacity-20 rounded-xl 
                             bg-white bg-opacity-10 text-white placeholder-gray-300
                             focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                             backdrop-blur-sm transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-300 hover:text-white transition-colors duration-200" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-300 hover:text-white transition-colors duration-200" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-200"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 border border-transparent rounded-xl 
                           text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 
                           transition-all duration-200 backdrop-blur-sm 
                           bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                           transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Sign in
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-200">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register/membership-form")}
                  className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  register now
                </button>
              </p>
            </div>

            {/* Footer with Version */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400 opacity-75">
                © 2024 Global Standard for Technology. v1.0.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
