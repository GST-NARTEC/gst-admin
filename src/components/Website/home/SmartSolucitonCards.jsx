import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGetActiveSmartSolutionsQuery } from "../../../store/apis/endpoints/websiteEndpoints/smartSolution";
import { useTranslation } from "react-i18next";
import { Spinner } from "@nextui-org/react";
import { Images } from "../../../assets/Index";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

function SmartSolutionCards() {
  const [currentPage, setCurrentPage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { data: smartSolutionsData, isLoading } =
    useGetActiveSmartSolutionsQuery();

  // Use API data if available, otherwise fallback to empty array
  const solutions = smartSolutionsData?.data?.smartSolutions || [];

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine cards per page based on screen width
  const getCardsPerPage = () => {
    if (windowWidth >= 1024) return 4; // lg screens
    if (windowWidth >= 768) return 2; // md screens
    return 1; // sm screens
  };

  const cardsPerPage = getCardsPerPage();
  const totalPages = Math.ceil(solutions.length / cardsPerPage);
  const currentSolutions = solutions.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const navigate = useNavigate();

  const handleSolutionClick = (solution) => {
    if (solution.page) {
      // Handle special cases for different templates
      switch (solution.page.template) {
        case "verify-halal":
          navigate("/verify-halal");
          break;
        case "case-study-main":
          navigate("/case-studies");
          break;
        case "sunrise-2027":
          navigate(`/sunrise/${solution.page.slug}`);
          break;
        default:
          // Default case for standard templates
          navigate(`/${solution.page.template}/${solution.page.slug}`);
      }
    } else if (solution.externalUrl) {
      window.open(solution.externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Show loading state if data is being fetched
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner size="lg" color="primary" />
          <p className="ml-4 text-gray-600">{t("smartSolutions.loading")}</p>
        </div>
      </div>
    );
  }

  // Show message if no solutions available
  if (!solutions || solutions.length === 0) {
    return (
      <div
        className="w-full max-w-7xl mx-auto px-4 py-12"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("smartSolutions.title")}
          </h2>
          <p className="text-lg text-gray-600">{t("smartSolutions.noData")}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 py-12"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Side - Banner */}
          <div className="flex-1 flex justify-center md:justify-start w-full md:w-auto">
            <img
              src={Images.ExpoBanner}
              alt="Expo Banner"
              className="h-40 w-auto object-contain rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Center - Title & Subtitle */}
          <div className="flex-[2] text-center w-full">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("smartSolutions.title")}
            </h2>
            <p className="text-lg text-gray-600 mx-auto">
              {t("smartSolutions.subtitle")}
            </p>
          </div>

          {/* Right Side - Spacer for balance */}
          <div className="flex-1 hidden md:block"></div>
        </div>
      </motion.div>

      {/* Cards Grid with Navigation */}
      <div className="relative">
        {/* Cards Container */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              >
                {currentSolutions.map((solution) => (
                  <motion.div
                    key={solution.id}
                    variants={itemVariants}
                    className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${
                      solution.page || solution.externalUrl
                        ? "cursor-pointer"
                        : "cursor-default"
                    }`}
                    onClick={() => handleSolutionClick(solution)}
                  >
                    {/* Solution Image */}
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      {solution.image ? (
                        <img
                          src={solution.image.replace(/\\/g, "/")}
                          alt={isArabic ? solution.titleAr : solution.titleEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <span className="text-white text-sm">
                            {t("common.noImage")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                        {isArabic ? solution.titleAr : solution.titleEn}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                        {isArabic
                          ? solution.descriptionAr
                          : solution.descriptionEn}
                      </p>

                      {/* Learn More Link */}
                      {solution.page || solution.externalUrl ? (
                        <div className="mt-4 flex items-center text-primary hover:text-primary/80 transition-colors cursor-pointer">
                          <span className="text-sm font-medium">
                            {isArabic
                              ? solution.captionAr || t("common.learnMore")
                              : solution.captionEn || t("common.learnMore")}
                          </span>
                          <span className="ml-2 text-xs">
                            {isArabic ? "←" : "→"}
                          </span>
                        </div>
                      ) : (
                        <div className="mt-4 flex items-center text-gray-400 cursor-not-allowed">
                          <span className="text-sm font-medium">
                            {t("common.learnMore")}
                          </span>
                          <span className="ml-2 text-xs">
                            {isArabic ? "←" : "→"}
                          </span>
                        </div>
                      )}

                      {/* Page/External URL indicator */}
                      {solution.page && (
                        <div className="absolute top-4 right-4">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        </div>
                      )}
                      {solution.externalUrl && (
                        <div className="absolute top-4 right-4">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation with Arrows */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            {/* Previous Arrow */}
            <button
              onClick={handlePrevPage}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Previous page"
            >
              <span className="text-xl text-primary">
                {isArabic ? "→" : "←"}
              </span>
            </button>


            {/* Next Arrow */}
            <button
              onClick={handleNextPage}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Next page"
            >
              <span className="text-xl text-primary">
                {isArabic ? "←" : "→"}
              </span>
            </button>
          </div>
        )}

        {/* Current Page Indicator */}
        {totalPages > 1 && (
          <div className="text-center mt-4 text-sm text-gray-500">
            {t("smartSolutions.pageIndicator", {
              current: currentPage + 1,
              total: totalPages,
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SmartSolutionCards;
