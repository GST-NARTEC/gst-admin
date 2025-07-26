import React, { useState } from "react";
import { motion } from "framer-motion";
import { PartnerLogos } from "../../../assets/Index.js";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const partners = [
  {
    logo: PartnerLogos.AbdelHadiAbdullaAlQahtaniSons,
    name: "Abdel Hadi Abdulla Al-Qahtani & Sons Co.",
  },
  {
    logo: PartnerLogos.AbdulHadiAlqhataniTravel,
    name: "Abdul Hadi Alqahtani Travel",
  },
  { logo: PartnerLogos.AHQLogo, name: "AHQ" },
  {
    logo: PartnerLogos.AlQahtaniPCKPipeCompany,
    name: "Al Qahtani PCK Pipe Company",
  },
  {
    logo: PartnerLogos.AlQahtaniVehiclesMachinery,
    name: "Al Qahtani Vehicles and Machinery",
  },
  { logo: PartnerLogos.AlHijazWaterCompany, name: "Al-Hijaz Water Company" },
  {
    logo: PartnerLogos.AlJaziraWaterTreatmentChemicals,
    name: "Al-Jazira Water Treatment Chemicals",
  },
  {
    logo: PartnerLogos.AlQahtaniNailsGalvanizedWireFactory,
    name: "Al-Qahtani Nails & Galvanized Wire Factory",
  },
  {
    logo: PartnerLogos.AlQahtaniPipeCoatingIndustries,
    name: "Al-Qahtani Pipe Coating Industries",
  },
  {
    logo: PartnerLogos.AlQahtaniTravelTourism,
    name: "Al-Qahtani Travel & Tourism",
  },
  {
    logo: PartnerLogos.EaradatTransportationCo,
    name: "Earadat Transportation Co.",
  },
  {
    logo: PartnerLogos.GroupFivePipeSaudiLtd,
    name: "Group Five Pipe Saudi Ltd.",
  },
  {
    logo: PartnerLogos.ICECInternationalCommercialEnterprises,
    name: "ICEC International Commercial Enterprises",
  },
  {
    logo: PartnerLogos.IzarInsuranceBrokerageCompany,
    name: "Izar Insurance Brokerage Company",
  },
  { logo: PartnerLogos.PipeWellServicesCO, name: "Pipe & Well Services CO." },
  {
    logo: PartnerLogos.PipelinesFlowChemicals,
    name: "Pipelines Flow Chemicals (L.L.C)",
  },
  { logo: PartnerLogos.SaoBi, name: "SaoBi" },
  { logo: PartnerLogos.SaudiGulf, name: "Saudi Gulf" },
  {
    logo: PartnerLogos.ShamsAlJazirahSchools,
    name: "Shams Al-Jazirah Schools",
  },
  { logo: PartnerLogos.SouthernGasCompany, name: "Southern Gas Company" },
];

function OurPartners() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % partners.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + partners.length) % partners.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Gold Sponsors
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Partners Slider */}
        <div className="relative">
          {/* Slider Container */}
          <div className="relative z-10 overflow-hidden">
            <motion.div
              className="flex space-x-8"
              animate={
                isAutoPlay
                  ? { x: [0, -100 * partners.length] }
                  : { x: -currentIndex * 320 }
              }
              transition={
                isAutoPlay
                  ? {
                      x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: partners.length * 4,
                        ease: "linear",
                      },
                    }
                  : {
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }
              }
              style={{ width: `${partners.length * 2 * 320}px` }}
            >
              {/* First set of partners */}
              {partners.map((partner, index) => (
                <motion.div
                  key={`first-${index}`}
                  className="flex-shrink-0 w-80"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-yellow-200 transition-all duration-300">
                    <div className="h-24 flex items-center justify-center mb-4">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain transition-all duration-300"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 text-center leading-tight">
                      {partner.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partners.map((partner, index) => (
                <motion.div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-80"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-yellow-200 transition-all duration-300">
                    <div className="h-24 flex items-center justify-center mb-4">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain transition-all duration-300"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 text-center leading-tight">
                      {partner.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Navigation Arrows - Below Cards */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={prevSlide}
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:shadow-xl hover:scale-110"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:shadow-xl hover:scale-110"
          >
            <FiChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-20 left-10 w-20 h-20 bg-yellow-100 rounded-full opacity-20"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 1 }}
          className="absolute bottom-20 right-10 w-16 h-16 bg-yellow-200 rounded-full opacity-30"
        />
      </div>
    </div>
  );
}

export default OurPartners;
