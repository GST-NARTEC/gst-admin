import { motion } from "framer-motion";

const features = [
  {
    title: "Better inventory and product management",
    image: "https://gstsa1.org/wp-content/uploads/2024/11/benefit-v2-1.webp", // Add these images to your public folder
    description:
      "Streamline your inventory tracking and product management with advanced 2D barcode technology",
  },
  {
    title: "Sustainability",
    image: "https://gstsa1.org/wp-content/uploads/2024/11/benefit-v2-2.webp",
    description:
      "Contribute to environmental sustainability through efficient digital tracking solutions",
  },
  {
    title: "Product authentication",
    image: "https://gstsa1.org/wp-content/uploads/2024/11/benefit-v2-3.webp",
    description:
      "Ensure product authenticity and prevent counterfeiting with secure 2D barcodes",
  },
  {
    title: "Branding and marketing",
    image: "https://gstsa1.org/wp-content/uploads/2024/11/benefit-v2-4.webp",
    description:
      "Enhance your brand presence and marketing capabilities with dynamic 2D barcodes",
  },
];

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
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl hover:shadow-quaternary/20 transition-all duration-500"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 relative">
                <h3 className="text-xl font-semibold mb-3 text-primary group-hover:text-quaternary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Decorative elements */}
                <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-quaternary/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-tertiary/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75" />
              </div>

              {/* Hover overlay using theme colors */}
              <div className="absolute inset-0 bg-gradient-to-t from-quaternary/0 via-quaternary/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-tertiary to-quaternary transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
