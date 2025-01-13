import React, { useState } from "react";
import { Images } from "../../../assets/Index";
import { IoMail } from "react-icons/io5";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../store/apis/endpoints/admin";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      toast.success(t("login.success"));
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(t("login.failed"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-navy-600 to-navy-700">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 cursor-pointer"
      >
        <div className="bg-white/90 p-3 rounded-xl shadow-lg">
          <img src={Images.Logo} alt="Company Logo" className="h-auto w-24" />
        </div>
      </div>

      {/* Main Container */}
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Card */}
          <div
            className={`bg-white rounded-xl shadow-xl p-8 space-y-4 ${
              isArabic ? "font-dubai text-[17px]" : ""
            }`}
            dir={isArabic ? "rtl" : "ltr"}
          >
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">
                {t("login.welcomeBack")}
              </h2>
              <p className="text-gray-500">{t("login.signIn")}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <div
                  className={`absolute inset-y-0 ${
                    isArabic ? "right-0 pr-4" : "left-0 pl-4"
                  } flex items-center pointer-events-none`}
                >
                  <IoMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`block w-full ${
                    isArabic ? "pr-11 pl-3" : "pl-11 pr-3"
                  } py-3.5 border border-gray-200 rounded-lg
                           text-gray-900 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition duration-200`}
                  placeholder={t("login.email")}
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <div
                  className={`absolute inset-y-0 ${
                    isArabic ? "right-0 pr-4" : "left-0 pl-4"
                  } flex items-center pointer-events-none`}
                >
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`block w-full ${
                    isArabic ? "pr-11 pl-11" : "pl-11 pr-11"
                  } py-3.5 border border-gray-200 rounded-lg
                           text-gray-900 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition duration-200`}
                  placeholder={t("login.password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 ${
                    isArabic ? "left-0 pl-4" : "right-0 pr-4"
                  } flex items-center`}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className={`${
                      isArabic ? "mr-2" : "ml-2"
                    } block text-sm text-gray-600`}
                  >
                    {t("login.rememberMe")}
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  {t("login.forgotPassword")}
                </a>
              </div>

              {/* Submit Button */}
              <Button
                isLoading={isLoading}
                type="submit"
                className="w-full py-3.5 px-4 mt-4 border border-transparent rounded-lg
                         text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                         transition duration-200 shadow-sm"
              >
                {t("login.button")}
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-400">{t("login.copyright")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
