import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";

const slides = [
  {
    title: "Get Your GST Barcode Today!",
    description:
      "Utilize our GST global standards to accurately identify your products. Trusted by over 2 million companies worldwide.",
    buttonText: "GET YOUR BARCODE",
    image:
      "https://media.zinnov.com/wp-content/uploads/2023/03/retail-featured.jpg",
  },
  {
    title: "Track Your Products Globally",
    description:
      "Implement end-to-end traceability with GST standards. Used by businesses in over 150 countries.",
    buttonText: "LEARN MORE",
    image:
      "http://media.waspbarcode.com/media/buzz/2014/03/rsz_gettyimages-472221142.jpg",
  },
  {
    title: "Join The GST Network",
    description:
      "Connect with millions of businesses worldwide. Start your digital transformation journey today.",
    buttonText: "JOIN NOW",
    image: "https://static1.bigstockphoto.com/9/4/1/large1500/149931620.jpg",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
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
              backgroundImage: `url(${slides[currentSlide].image})`,
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
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-white/90 mb-8"
                >
                  {slides[currentSlide].description}
                </motion.p>
                <motion.button
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-[#1B365D] text-white px-8 py-4 rounded-md inline-flex items-center space-x-2 hover:bg-[#335082] transition-colors group"
                >
                  <span>{slides[currentSlide].buttonText}</span>
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
