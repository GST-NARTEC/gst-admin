import { motion } from "framer-motion";
import { BsGrid } from "react-icons/bs";
import { BiBarcode, BiPrinter } from "react-icons/bi";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { useGetActiveProServicesQuery } from "../../../store/apis/endpoints/websiteEndpoints/proServices";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const SkeletonCard = () => (
  <div className="group relative">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl" />
    <div className="relative p-8 text-center">
      <div className="mb-6">
        <div className="inline-flex p-4 rounded-2xl bg-gray-200 w-20 h-20 animate-pulse" />
      </div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4 animate-pulse" />
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-20 mx-auto animate-pulse" />
    </div>
  </div>
);

export default function ProfessionalServices() {
  const { data: proServicesData, isLoading } = useGetActiveProServicesQuery();
  const proServices = proServicesData?.data?.proServices || [];
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const handleServiceClick = (service) => {
    if (service.page) {
      navigate(`/${service.page.template}/${service.page.slug}`);
    } else if (service.externalUrl) {
      window.open(service.externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!proServices.length) {
    return (
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-gray-500 text-lg">{t("proServices.noData")}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-24 bg-gradient-to-b from-white to-gray-50"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="md:mx-10 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-gray-300"></div>
            <h2 className="text-4xl font-bold text-gray-800">
              {t("proServices.title")}
            </h2>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-10 md:mx-0"
        >
          {proServices.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onClick={() => handleServiceClick(service)}
              className={`group relative ${
                service.page || service.externalUrl
                  ? "cursor-pointer"
                  : "cursor-default"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />

              <div className="relative p-8 text-center">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {service.image ? (
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg">
                      <img
                        src={service.image.replace(/\\/g, "/")}
                        alt={isArabic ? service.titleAr : service.titleEn}
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg">
                      <BsGrid className="w-14 h-14 text-primary" />
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {isArabic ? service.titleAr : service.titleEn}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-4">
                  {isArabic ? service.descriptionAr : service.descriptionEn}
                </p>

                <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group/btn">
                  <span>
                    {isArabic
                      ? service.captionAr
                      : service.captionEn || t("proServices.more")}
                  </span>
                  <svg
                    className={`w-4 h-4 transform ${
                      isArabic
                        ? "rotate-180 group-hover/btn:-translate-x-1"
                        : "group-hover/btn:translate-x-1"
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

                {service.page && (
                  <div className="absolute top-4 right-4">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 sm:mt-24 md:mt-28 lg:mt-32 relative px-4"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-quaternary/10 rounded-3xl blur-3xl" />

          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden pb-5 md:pb-0">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-6 sm:p-8 md:p-10 lg:p-16 flex flex-col justify-center">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
                  <div className="h-[2px] w-16 bg-gradient-to-r from-primary to-quaternary"></div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                    {t("proServices.supplies.title")}
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
                  {t("proServices.supplies.description")}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-quaternary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold self-start hover:shadow-lg hover:shadow-primary/20 transition-shadow group text-sm sm:text-base"
                  onClick={() => navigate("/template3/contact-us")}
                >
                  {t("proServices.supplies.learnMore")}
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
                </motion.button>
              </div>

              <div className="relative h-full min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] bg-gradient-to-br from-primary/5 to-quaternary/5">
                <div className="absolute inset-0 p-4 sm:p-6 md:p-8">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-lg group hover:shadow-xl transition-shadow"
                    >
                      <div className="mb-2 sm:mb-4 text-primary group-hover:text-quaternary transition-colors">
                        <BiBarcode className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                        {t("proServices.supplies.labels")}
                      </h3>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-lg mt-4 sm:mt-6 md:mt-8 group hover:shadow-xl transition-shadow"
                    >
                      <div className="mb-2 sm:mb-4 text-primary group-hover:text-quaternary transition-colors">
                        <BiPrinter className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                        {t("proServices.supplies.ribbons")}
                      </h3>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-lg group hover:shadow-xl transition-shadow"
                    >
                      <div className="mb-2 sm:mb-4 text-primary group-hover:text-quaternary transition-colors">
                        <MdOutlineLocalPrintshop className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                        {t("proServices.supplies.printing")}
                      </h3>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow-lg mt-4 sm:mt-6 md:mt-8 group hover:shadow-xl transition-shadow"
                    >
                      <div className="mb-2 sm:mb-4 text-primary group-hover:text-quaternary transition-colors">
                        <TbTruckDelivery className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                        {t("proServices.supplies.management")}
                      </h3>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
