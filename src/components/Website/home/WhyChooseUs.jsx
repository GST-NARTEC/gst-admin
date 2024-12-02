import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGetActiveWhyBarcodesQuery } from "../../../store/apis/endpoints/websiteEndpoints/whyBarcode";
import { Spinner } from "@nextui-org/react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function WhyChooseUs() {
  const navigate = useNavigate();
  const { data: whyBarcodesData, isLoading } = useGetActiveWhyBarcodesQuery();
  const whyBarcodes = whyBarcodesData?.data?.whyBarcodes || [];

  const handleCardClick = (feature) => {
    if (feature.page) {
      navigate(`/${feature.page.template}/${feature.page.slug}`);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-quaternary/5 to-white">
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner size="lg" color="primary" />
        </div>
      </section>
    );
  }

  if (!whyBarcodes?.length) {
    return (
      <section className="py-20 bg-gradient-to-b from-quaternary/5 to-white">
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-gray-500 text-lg">No data available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-quaternary/5 to-white">
      <div className="mx-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Why use a 2D barcode?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Compared to the traditional 1D barcode, 2D barcodes streamline the
            needs of both supply chains and consumers
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {whyBarcodes.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl hover:shadow-quaternary/20 transition-all duration-500 ${
                feature.page ? 'cursor-pointer' : 'cursor-default'
              }`}
              onClick={() => handleCardClick(feature)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={feature.image || "https://placehold.co/400x400"}
                  alt={feature.titleEn}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 relative">
                <h3 className="text-xl font-semibold mb-3 text-primary group-hover:text-quaternary transition-colors duration-300">
                  {feature.titleEn}
                </h3>
                <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
                  {feature.descriptionEn}
                </p>

                {/* Visual indicator for linked pages */}
                {feature.page && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </div>
                )}

                {/* Keep existing decorative elements */}
                <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-quaternary/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-tertiary/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75" />
              </div>

              {/* Keep existing hover effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-quaternary/0 via-quaternary/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-tertiary to-quaternary transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
