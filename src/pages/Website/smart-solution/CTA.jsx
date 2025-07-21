import React from "react";
import { useGetTemplateBySlugQuery } from "../../../store/apis/endpoints/templates";
import OverlayLoader from "../../../components/common/OverlayLoader";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Spinner } from "@nextui-org/react";

function CTA() {
  const location = useLocation();
  const slug = location.pathname.split("/").pop();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { data, isLoading } = useGetTemplateBySlugQuery({
    templateType: "halalTemplate",
    slug,
  });

  if (isLoading)
    return (
      <div className="py-16 px-4">
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner size="lg" color="primary" />
        </div>
      </div>
    );

  const template = data?.data?.template;

  if (!template) {
    return (
      <div className="py-16 px-4">
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-gray-500 text-lg">{t("common.noData")}</p>
        </div>
      </div>
    );
  }

  // Helper function to parse HTML content safely
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <div
      className="relative bg-gradient-to-br from-secondary via-tertiary to-primary py-16 px-4 overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Background Pattern - Dotted World Map Style */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Dotted pattern representing world map */}
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1" fill="rgba(255, 255, 255, 0.3)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />

          {/* Location pins scattered across */}
          <circle cx="150" cy="200" r="4" fill="#22c55e" />
          <circle cx="300" cy="150" r="4" fill="#22c55e" />
          <circle cx="450" cy="250" r="4" fill="#22c55e" />
          <circle cx="600" cy="180" r="4" fill="#22c55e" />
          <circle cx="750" cy="220" r="4" fill="#22c55e" />
          <circle cx="200" cy="350" r="4" fill="#22c55e" />
          <circle cx="400" cy="380" r="4" fill="#22c55e" />
          <circle cx="650" cy="320" r="4" fill="#22c55e" />
          <circle cx="800" cy="400" r="4" fill="#22c55e" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content Section */}
          <div className="text-center lg:text-left">
            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-dubai">
              {isArabic ? template.headerAr : template.headerEn}
            </h2>

            {/* App Description */}
            <div className="mb-8">
              <div
                className="text-white/90 leading-relaxed text-sm md:text-base"
                dangerouslySetInnerHTML={createMarkup(
                  isArabic ? template.descriptionAr : template.descriptionEn
                )}
              />
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">{t("app.getItOn")}</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </div>

              <div className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.17 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">
                    {t("app.availableOn")}
                  </div>
                  <div className="font-semibold">App Store</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {template.image1 ? (
                <div className="w-80 h-96 rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-800 relative">
                  <img
                    src={template.image1}
                    alt="Verify Halal Mobile App"
                    className="w-full h-full object-cover"
                  />
                  {/* Phone notch */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-800 rounded-full"></div>
                </div>
              ) : (
                <div className="w-80 h-96 bg-gray-200 rounded-3xl shadow-2xl flex items-center justify-center border-8 border-gray-800 relative overflow-hidden">
                  {/* Phone notch */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-800 rounded-full"></div>

                  {/* Placeholder content */}
                  <div className="text-center p-8 mt-8">
                    <div className="w-16 h-16 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-primary font-bold mb-2">
                      Verify Halal
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {t("app.mobileApplication")}
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="h-2 bg-gray-300 rounded"></div>
                      <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CTA;
