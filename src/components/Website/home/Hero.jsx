import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import { useGetActiveSlidersQuery } from "../../../store/apis/endpoints/websiteEndpoints/slider";
import { Skeleton } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { data: sliderData, isLoading } = useGetActiveSlidersQuery();
  const slides = sliderData?.data?.sliders || [];

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAutoPlaying || !slides.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const handleButtonClick = (slide) => {
    if (slide.page) {
      navigate(`/${slide.page.template}/${slide.page.slug}`);
    } else if (slide.externalUrl) {
      window.open(slide.externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-[600px] overflow-hidden bg-gray-100">
        <div className="cont-auto px-4 h-full relative mx-20">
          <div className="flex items-center h-full">
            <div className="max-w-2xl space-y-6">
              <Skeleton className="h-16 w-3/4 rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-14 w-48 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!slides.length) {
    return null;
  }

  return (
    <div className="relative w-full h-[600px] xl:h-[450px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[currentSlide].imageEn?.replace(
                /\\/g,
                "/"
              )})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="cont-auto px-4 h-full relative mx-20">
            <div className="flex items-center h-full">
              <div className="max-w-2xl">
                <motion.h1
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl font-bold text-white mb-5"
                >
                  {slides[currentSlide].titleEn}
                </motion.h1>
                <motion.p
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-white/90 mb-8"
                >
                  {slides[currentSlide].descriptionEn}
                </motion.p>
                <motion.button
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => handleButtonClick(slides[currentSlide])}
                  className="bg-[#1B365D] text-white px-8 py-4 rounded-md inline-flex items-center space-x-2 hover:bg-[#335082] transition-colors group"
                >
                  <span>{slides[currentSlide].captionEn}</span>
                  <BsArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
