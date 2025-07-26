import React from "react";
import { useTranslation } from "react-i18next";

function HeroSection() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div
      className="relative bg-gradient-to-br from-primary via-navy-600 to-navy-700 min-h-[50vh] flex items-center justify-center px-4 overflow-hidden p-7"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Awesome SVG Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#335082", stopOpacity: 0.3 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#254170", stopOpacity: 0.1 }}
              />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#ffffff", stopOpacity: 0.1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#ffffff", stopOpacity: 0.05 }}
              />
            </linearGradient>
          </defs>

          {/* Geometric shapes */}
          <circle
            cx="150"
            cy="200"
            r="80"
            fill="url(#grad1)"
            className="animate-pulse"
          />
          <circle
            cx="850"
            cy="150"
            r="60"
            fill="url(#grad1)"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <circle
            cx="200"
            cy="600"
            r="40"
            fill="url(#grad2)"
            className="animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <circle
            cx="800"
            cy="650"
            r="90"
            fill="url(#grad1)"
            className="animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />

          {/* Flowing lines */}
          <path
            d="M 0,400 Q 250,200 500,350 T 1000,300"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M 0,500 Q 300,300 600,450 T 1000,400"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />

          {/* Abstract polygons */}
          <polygon
            points="100,100 200,50 250,150 150,200"
            fill="url(#grad2)"
            className="animate-pulse"
            style={{ animationDelay: "3s" }}
          />
          <polygon
            points="700,80 800,30 850,120 750,170"
            fill="url(#grad1)"
            className="animate-pulse"
            style={{ animationDelay: "2.5s" }}
          />

          {/* Floating dots */}
          <circle
            cx="350"
            cy="150"
            r="3"
            fill="rgba(255,255,255,0.6)"
            className="animate-ping"
          />
          <circle
            cx="650"
            cy="250"
            r="2"
            fill="rgba(255,255,255,0.4)"
            className="animate-ping"
            style={{ animationDelay: "1s" }}
          />
          <circle
            cx="450"
            cy="600"
            r="4"
            fill="rgba(255,255,255,0.5)"
            className="animate-ping"
            style={{ animationDelay: "2s" }}
          />
          <circle
            cx="750"
            cy="450"
            r="2.5"
            fill="rgba(255,255,255,0.3)"
            className="animate-ping"
            style={{ animationDelay: "0.5s" }}
          />
        </svg>
      </div>

      {/* Additional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-700/20 via-transparent to-primary/10"></div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold  leading-tight font-dubai">
          {t("halalHero.title1")}{" "}
          <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
            {t("halalHero.productCount")}
          </span>
          <br />
          {t("halalHero.title2")}
        </h1>

        <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          {t("halalHero.subtitle")}
        </p>

        {/* Modern Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-0 bg-white/95 backdrop-blur-lg rounded-2xl p-2 shadow-2xl border border-white/20">
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder={t("halalHero.searchPlaceholder")}
                className="w-full pl-12 pr-4 py-4 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none rounded-xl"
              />
            </div>
            <button className="bg-gradient-to-r from-primary to-navy-600 hover:from-navy-600 hover:to-navy-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              {t("common.search")}
            </button>
          </div>
        </div>
      </div>

      {/* App Store Buttons - Bottom Right */}
      <div className="absolute bottom-6 xl:bottom-10 right-6 flex flex-col xl:flex-row gap-3 z-20">
        <div className="bg-black/80 backdrop-blur-sm hover:bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
          </svg>
          <div className="text-left">
            <div className="text-xs opacity-80">{t("app.getItOn")}</div>
            <div className="text-sm font-semibold">Google Play</div>
          </div>
        </div>

        <div className="bg-black/80 backdrop-blur-sm hover:bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.17 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
          </svg>
          <div className="text-left">
            <div className="text-xs opacity-80">{t("app.availableOn")}</div>
            <div className="text-sm font-semibold">App Store</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
