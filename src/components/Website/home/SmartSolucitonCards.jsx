import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGetActiveSmartSolutionsQuery } from "../../../store/apis/endpoints/websiteEndpoints/smartSolution";

function SmartSolutionCards() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: smartSolutionsData, isLoading } =
    useGetActiveSmartSolutionsQuery();

  // Use API data if available, otherwise fallback to empty array
  const solutions = smartSolutionsData?.data?.smartSolutions || [];

  const navigate = useNavigate();

  const handleSolutionClick = (solution) => {
    if (solution.page) {
      // Handle different templates
      if (solution.page.template === "verify-halal") {
        navigate("/verify-halal");
      } else {
        navigate(`/${solution.page.template}/${solution.page.slug}`);
      }
    } else if (solution.externalUrl) {
      window.open(solution.externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Show loading state if data is being fetched
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Smart Solutions...</p>
        </div>
      </div>
    );
  }

  // Show message if no solutions available
  if (!solutions || solutions.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Solutions for Every Sector
          </h2>
          <p className="text-lg text-gray-600">
            No smart solutions available at the moment.
          </p>
        </div>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === solutions.length - 4 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? solutions.length - 4 : prevIndex - 1
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Smart Solutions for Every Sector
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Discover how GST empowers healthcare, retail, logistics, and more with
          scalable tracking and automation technologies
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Navigation Buttons - Top Right */}
        <div className="absolute -top-16 right-0 z-10 flex gap-2">
          <button
            onClick={prevSlide}
            className="bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 hover:bg-navy-400/10 border"
          >
            <FaChevronLeft className="text-primary text-xl" />
          </button>

          <button
            onClick={nextSlide}
            className="bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 hover:bg-navy-400/10 border"
          >
            <FaChevronRight className="text-primary text-xl" />
          </button>
        </div>

        {/* Cards Container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: -currentIndex * 344 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: -(solutions.length - 4) * 344, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) > 50;
              if (swipe) {
                if (offset.x > 0 && currentIndex > 0) {
                  prevSlide();
                } else if (
                  offset.x < 0 &&
                  currentIndex < solutions.length - 4
                ) {
                  nextSlide();
                }
              }
            }}
          >
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                className={`flex-shrink-0 w-80 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${
                  solution.page || solution.externalUrl
                    ? "cursor-pointer"
                    : "cursor-default"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSolutionClick(solution)}
              >
                {/* Clear Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {/* Display actual image if available */}
                  {solution.image ? (
                    <img
                      src={solution.image.replace(/\\/g, "/")}
                      alt={solution.titleEn}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-white text-sm">No Image</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {solution.titleEn}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {solution.descriptionEn}
                  </p>

                  {/* Learn More Link */}
                  {solution.page || solution.externalUrl ? (
                    <div className="mt-4 flex items-center text-primary hover:text-primary/80 transition-colors cursor-pointer">
                      <span className="text-sm font-medium">
                        {solution.captionEn || "Learn More"}
                      </span>
                      <FaChevronRight className="ml-2 text-xs" />
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center text-gray-400 cursor-not-allowed">
                      <span className="text-sm font-medium">Learn More</span>
                      <FaChevronRight className="ml-2 text-xs" />
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
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {solutions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SmartSolutionCards;
