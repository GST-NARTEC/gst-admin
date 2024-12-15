import { motion } from "framer-motion";
import { BsGrid, BsPeople } from "react-icons/bs";
import { TbWaveSine } from "react-icons/tb";
import { IoHardwareChipOutline } from "react-icons/io5";
import { BiBarcode, BiPrinter } from 'react-icons/bi';
import { MdOutlineLocalPrintshop } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { useGetActiveProServicesQuery } from "../../../store/apis/endpoints/websiteEndpoints/proServices";
import { useNavigate } from "react-router-dom";

const serviceIcons = [
  {
    icon: <BsGrid className="w-12 h-12" />,
    color: "from-blue-400 to-cyan-300",
  },
  {
    icon: <BsPeople className="w-12 h-12" />,
    color: "from-cyan-400 to-teal-300",
  },
  {
    icon: <TbWaveSine className="w-12 h-12" />,
    color: "from-teal-400 to-blue-300",
  },
  {
    icon: <IoHardwareChipOutline className="w-12 h-12" />,
    color: "from-blue-400 to-indigo-300",
  },
];

const suppliesSection = {
  title: "LABELS, TAGS, RIBBONS, AND PRINTING SUPPLIES",
  description: "At GST Solutions, we understand that the ribbon and label selection is a critical component of a successful barcode system and that having these supplies when you need them is just as important. We also provide a variety of supply management services to ensure that you have what you need, when you need it.",
  image: "/supplies-image.jpg"
};

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

export default function ProfessionalServices() {
  const { data: proServicesData, isLoading } = useGetActiveProServicesQuery();
  const proServices = proServicesData?.data?.proServices || [];
  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    if (service.page) {
      navigate(`/${service.page.template}/${service.page.slug}`);
    } else if (service.externalUrl) {
      window.open(service.externalUrl, '_blank', 'noopener,noreferrer');
    }
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

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-gray-300"></div>
            <h2 className="text-4xl font-bold text-gray-800">
              PROFESSIONAL SERVICES
            </h2>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {proServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onClick={() => handleServiceClick(service)}
              className={`group relative ${
                service.page || service.externalUrl ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />

              <div className="relative p-8 text-center">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${
                      serviceIcons[index % serviceIcons.length].color
                    } text-white shadow-lg`}
                  >
                    {serviceIcons[index % serviceIcons.length].icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {service.titleEn}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-4">
                  {service.descriptionEn}
                </p>

                <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group/btn">
                  <span>{service.captionEn || "More"}</span>
                  <svg
                    className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
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
          className="mt-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-quaternary/10 rounded-3xl blur-3xl" />
          
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[2px] w-16 bg-gradient-to-r from-primary to-quaternary"></div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    {suppliesSection.title}
                  </h2>
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {suppliesSection.description}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-quaternary text-white px-8 py-4 rounded-xl font-semibold self-start hover:shadow-lg hover:shadow-primary/20 transition-shadow group"
                  onClick={() => navigate("/template3/contact-us")}

                >
                  Learn More
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
                </motion.button>
              </div>

              <div className="relative h-full min-h-[300px] lg:min-h-[500px] bg-gradient-to-br from-primary/5 to-quaternary/5">
                <div className="absolute inset-0 grid grid-cols-2 gap-4 p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-xl shadow-lg group hover:shadow-xl transition-shadow"
                  >
                    <div className="mb-4 text-primary group-hover:text-quaternary transition-colors">
                      <BiBarcode className="w-16 h-16" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Labels & Tags</h3>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-6 rounded-xl shadow-lg mt-8 group hover:shadow-xl transition-shadow"
                  >
                    <div className="mb-4 text-primary group-hover:text-quaternary transition-colors">
                      <BiPrinter className="w-16 h-16" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Ribbons</h3>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-6 rounded-xl shadow-lg group hover:shadow-xl transition-shadow"
                  >
                    <div className="mb-4 text-primary group-hover:text-quaternary transition-colors">
                      <MdOutlineLocalPrintshop className="w-16 h-16" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Printing Solutions</h3>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="bg-white p-6 rounded-xl shadow-lg mt-8 group hover:shadow-xl transition-shadow"
                  >
                    <div className="mb-4 text-primary group-hover:text-quaternary transition-colors">
                      <TbTruckDelivery className="w-16 h-16" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Supply Management</h3>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


