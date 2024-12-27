import { motion } from "framer-motion";
import { FaChartLine, FaHandshake, FaUsersCog } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const features = [
  {
    icon: <FaChartLine className="w-8 h-8" />,
    titleKey: "whyWorkWithUs.features.datadriven.title",
    descriptionKey: "whyWorkWithUs.features.datadriven.description",
  },
  {
    icon: <IoShieldCheckmark className="w-8 h-8" />,
    titleKey: "whyWorkWithUs.features.trusted.title",
    descriptionKey: "whyWorkWithUs.features.trusted.description",
  },
  {
    icon: <FaHandshake className="w-8 h-8" />,
    titleKey: "whyWorkWithUs.features.support.title",
    descriptionKey: "whyWorkWithUs.features.support.description",
  },
  {
    icon: <FaUsersCog className="w-8 h-8" />,
    titleKey: "whyWorkWithUs.features.expert.title",
    descriptionKey: "whyWorkWithUs.features.expert.description",
  },
];

export default function WhyWorkWithUs() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <section
      className="py-24 relative overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-quaternary/5 to-primary/5" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="mx-4 sm:mx-6 md:mx-10 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-quaternary bg-clip-text text-transparent">
            {t("whyWorkWithUs.title")}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {t("whyWorkWithUs.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-quaternary/10 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl" />

              <div className="relative bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="mb-6 text-primary group-hover:text-quaternary transition-colors duration-300">
                  {feature.icon}
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
                  {t(feature.titleKey)}
                </h3>

                <p className="text-sm sm:text-base text-gray-600">
                  {t(feature.descriptionKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => navigate("/template3/contact-us")}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-quaternary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group text-sm sm:text-base"
          >
            {t("whyWorkWithUs.contact")}
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 transform ${
                isArabic
                  ? "rotate-180 group-hover:-translate-x-1"
                  : "group-hover:translate-x-1"
              } transition-transform`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
