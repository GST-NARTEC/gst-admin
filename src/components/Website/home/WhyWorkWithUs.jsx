import { motion } from "framer-motion";
import { FaChartLine, FaHandshake, FaUsersCog } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";

const features = [
  {
    icon: <FaChartLine className="w-8 h-8" />,
    title: "Data-Driven Solutions",
    description:
      "We leverage industry research and analytics to provide unbiased, cost-effective recommendations.",
  },
  {
    icon: <IoShieldCheckmark className="w-8 h-8" />,
    title: "Trusted Partnership",
    description:
      "Your business challenges are our priority. We deliver tailored solutions that drive real results.",
  },
  {
    icon: <FaHandshake className="w-8 h-8" />,
    title: "End-to-End Support",
    description:
      "From initial consultation to implementation and beyond, we're with you every step of the way.",
  },
  {
    icon: <FaUsersCog className="w-8 h-8" />,
    title: "Expert Team",
    description:
      "Our experienced professionals understand your industry's unique challenges and requirements.",
  },
];

export default function WhyWorkWithUs() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-quaternary/5 to-primary/5" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className=" mx-10 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-quaternary bg-clip-text text-transparent">
            Why Work With GST Solutions?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At GST Solutions, we take your business challenges seriously. We
            gather the necessary industry research to provide unbiased
            manufacturer recommendations in the most cost-effective manner.
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

              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="mb-6 text-primary group-hover:text-quaternary transition-colors duration-300">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {feature.title}
                </h3>

                <p className="text-gray-600">{feature.description}</p>
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
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-quaternary text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
          >
            Contact Us Discuss Your Technology Need
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
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
          </a>
        </motion.div>
      </div>
    </section>
  );
}
