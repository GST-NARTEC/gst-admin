import { motion } from "framer-motion";
import { Images } from "../../../assets/Index";

const solutions = [
  {
    title: "Location Tracking & Visibility",
    images: ["https://gstsa1.org/wp-content/uploads/2024/11/image.png"],
    category: "TRACKING",
  },
  {
    title: "Inventory Management",
    images: ["https://gstsa1.org/wp-content/uploads/2024/11/image-1.png"],
    category: "MANAGEMENT",
  },
  {
    title: "Asset Tracking",
    images: ["https://gstsa1.org/wp-content/uploads/2024/11/image-2.png"],
    category: "TRACKING",
  },
  {
    title: "Traceability Solutions",
    images: ["https://gstsa1.org/wp-content/uploads/2024/11/image-3.png"],
    category: "SOLUTIONS",
  },
  {
    title: "FATS (Fixed Asset Tracking System)",
    images: ["https://gstsa1.org/wp-content/uploads/2024/11/image-1-1.png"],
    category: "SYSTEM",
  },
  {
    title: "Warehouse Management System (WMS)",
    images: ["https://gstsa1.org/wp-content/uploads/2024/11/image-2-1.png"],
    category: "SYSTEM",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

export default function CoreSolutions() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-quaternary/5" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: `url(${Images.Grid})` }}
      />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-quaternary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className=" mx-16 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-quaternary/10 rounded-full text-quaternary text-sm font-medium mb-4">
            BY APPLICATION
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-tertiary to-quaternary bg-clip-text text-transparent">
            Featured Core Solutions
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            Increase efficiency, automate workflows, and gain clear visibility
            into your operations. Learn more about strategic technology
            solutions that can help connect your people, assets, and data.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden bg-white hover:shadow-2xl hover:shadow-quaternary/20 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={solution.images[0]}
                  alt={solution.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-4 right-4 px-4 py-2 bg-quaternary text-white text-xs font-bold rounded-full shadow-lg">
                  {solution.category}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>

              <div className="relative p-6 bg-white">
                <h3 className="text-xl font-bold text-primary group-hover:text-quaternary transition-colors duration-300 mb-4">
                  {solution.title}
                </h3>

                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 text-quaternary font-semibold group/btn">
                    <span className="relative">
                      Learn More
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-quaternary group-hover/btn:w-full transition-all duration-300" />
                    </span>
                    <svg
                      className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform"
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

                  <div className="w-10 h-10 rounded-full bg-quaternary/10 group-hover:bg-quaternary/20 transition-colors duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
