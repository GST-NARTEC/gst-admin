
import React from 'react';
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";
import { 
  FaFilePdf, 
  FaEye, 
  FaBullseye, 
  FaIndustry, 
  FaBarcode, 
  FaWarehouse, 
  FaLink, 
  FaTags, 
  FaCertificate, 
  FaCheckCircle, 
  FaMicrochip, 
  FaQrcode, 
  FaShieldAlt, 
  FaCogs, 
  FaGlobe, 
  FaHeadset, 
  FaExpandArrowsAlt, 
  FaCheckDouble, 
  FaHandshake, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope 
} from 'react-icons/fa';

const CompanyProfile = () => {

  const accentColor = "#f8a513";
  
  return (
    <WebsiteLayout>
      <div className="w-full font-dubai text-gray-800 bg-white">
        
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden text-white bg-gradient-to-br from-primary via-secondary to-primary">
           {/* Background Overlay */}
            <div 
                className="absolute inset-0 z-0 opacity-30 bg-cover bg-center"
                style={{ 
                    backgroundImage: "url('https://z-cdn-media.chatglm.cn/files/fe4cdd3c-ffbf-4036-85d8-bdb2076cc05a.JPG?auth_key=1870461586-d30fd4387c0a453f8248a24f760560ca-0-461fb35507163a46ba82c8f7374de3e1')"
                }}
            />
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-wrap items-center -mx-4">
                    <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Global Standard for Technology</h1>
                        <p className="text-2xl font-light mb-6">Innovative Digital Solutions for Supply Chain, Manufacturing and Logistics</p>
                        <p className="mb-8 text-lg opacity-90">GST drives innovation by enabling industries to adopt smart technologies that enhance productivity, quality, and sustainability across global markets.</p>
                        <div className="flex flex-wrap gap-3">
                            <a 
                                href="https://drive.google.com/file/d/11rTvVxaYzJ2G4T88GegUNF3_R_pxbVH6/view" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-8 py-3 font-semibold text-white rounded-full transition-all hover:-translate-y-1 hover:shadow-lg"
                                style={{ backgroundColor: accentColor }}
                            >
                                <FaFilePdf className="mr-2" />
                                Download Profile PDF
                            </a>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-4">
                        <img 
                            src="https://z-cdn-media.chatglm.cn/files/fe4cdd3c-ffbf-4036-85d8-bdb2076cc05a.JPG?auth_key=1870461586-d30fd4387c0a453f8248a24f760560ca-0-461fb35507163a46ba82c8f7374de3e1" 
                            alt="Technology Solutions" 
                            className="w-full h-auto rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 relative inline-block text-primary">
                        About GST
                        <span className="absolute bottom-0 left-0 w-16 h-1 bg-yellow-500 transform translate-y-2"></span>
                    </h2>
                    <p className="text-xl text-gray-600 mt-4">Leading digital transformation in supply chain, manufacturing, and logistics</p>
                </div>
                
                <div className="flex flex-wrap -mx-4 mb-12">
                    <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0 space-y-4">
                        <p className="text-lg leading-relaxed">Global Standard for Technology (GST) is a Saudi Arabian company specializing in advanced digital solutions for supply chain management, tracking, and inventory control. We focus on developing innovative technologies that support digital transformation in logistics, manufacturing, and distribution sectors.</p>
                        <p className="text-lg leading-relaxed">Additionally, GST operates in alignment with ISO/IEC 27001:2022 for Information Security Management Systems.</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            <span className="bg-primary text-white px-4 py-2 rounded shadow text-sm font-medium">ISO/IEC 27001:2022 Certified</span>
                            <span className="bg-secondary text-white px-4 py-2 rounded shadow text-sm font-medium">SIR Program Aligned</span>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-4">
                        <img 
                            src="https://z-cdn-media.chatglm.cn/files/e82bb13c-20b0-49fb-957c-12e475d59c0c.jpg?auth_key=1870461586-af52223922944cabae0609c043d72ffa-0-2600f9c4784803e2ede877ac2a1c34cd" 
                            alt="Supply Chain Solutions" 
                            className="w-full h-auto rounded-lg shadow-xl"
                        />
                    </div>
                </div>
                
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg h-full hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-primary/10">
                                <FaEye className="text-3xl text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                            <p className="text-gray-600 mb-4">Our vision is to lead digital supply chain innovation in the Kingdom and globally through sustainable, reliable, and cutting-edge technology standards.</p>
                            <p className="font-bold text-primary">"Aligning with Global Vision 2030"</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg h-full hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-primary/10">
                                <FaBullseye className="text-3xl text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                            <p className="text-gray-600 mb-4">Our mission is to revolutionize supply chain operations by providing cutting-edge digital solutions that enhance transparency, efficiency, and control across various industries.</p>
                            <p className="font-bold text-primary">"Aligning with Global Vision 2030"</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Areas of Expertise */}
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 relative inline-block text-primary">
                        Areas of Expertise
                        <span className="absolute bottom-0 left-0 w-16 h-1 bg-yellow-500 transform translate-y-2"></span>
                    </h2>
                    <p className="text-xl text-gray-600 mt-4">Comprehensive solutions for modern supply chain challenges</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { icon: FaIndustry, title: "MES - Manufacturing", desc: "Manufacturing Execution Systems for intelligent production control and monitoring." },
                        { icon: FaBarcode, title: "Traceability Solutions", desc: "End-to-end traceability from shop floor to supply chain with real-time tracking." },
                        { icon: FaWarehouse, title: "Inventory Management", desc: "Advanced inventory and warehouse management systems for optimal stock control." },
                        { icon: FaLink, title: "Supply Chain Integration", desc: "Integrated solutions for complete supply chain transparency and control." },
                        { icon: FaTags, title: "Barcoding & Labeling", desc: "Fixed asset labeling and tracking solutions for comprehensive asset management." },
                        { icon: FaCertificate, title: "Compliance Solutions", desc: "Halal verification and compliance tools for industry-specific requirements." },
                    ].map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-primary">
                            <item.icon className="text-4xl mb-4 text-secondary" />
                            <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Core Services */}
        <section id="services" className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 relative inline-block text-primary">
                        Core Services
                        <span className="absolute bottom-0 left-0 w-16 h-1 bg-yellow-500 transform translate-y-2"></span>
                    </h2>
                    <p className="text-xl text-gray-600 mt-4">Advanced technology solutions for your business needs</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {[
                        {
                            title: "Advanced Tracking, Traceability & MES Solutions",
                            items: [
                                "Real-time tracking with barcodes, RFID, IoT devices, and AI",
                                "End-to-end traceability from shop floor to supply chain",
                                "MES integration for intelligent production execution",
                                "Enhanced visibility, inventory accuracy, and process control",
                                "Improved efficiency, compliance, and data-driven decisions"
                            ]
                        },
                        {
                            title: "Supply Chain and Logistics System",
                            items: [
                                "Streamlined control of procurement, storage, and delivery",
                                "Boosts efficiency, accuracy, and visibility",
                                "Integrates WMS, TMS, and tracking tools",
                                "Enables smart decisions with real-time data"
                            ]
                        },
                        {
                            title: "Asset Tracking System",
                            items: [
                                "Monitors location and status of assets",
                                "Reduces loss and unauthorized use",
                                "Enhances asset lifecycle management",
                                "Improves operational efficiency and planning"
                            ]
                        },
                        {
                            title: "Innovative SaaS Solutions",
                            items: [
                                "Customized cloud applications",
                                "Support for tracking, inventory, and POS",
                                "Label Design & Printing (1D/2D)",
                                "Supports GS1-compliant 1D and 2D barcode formats"
                            ]
                        }
                    ].map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <h3 className="text-2xl font-bold mb-6 text-primary">{service.title}</h3>
                            <ul className="space-y-3">
                                {service.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Smart Solutions */}
        <section id="solutions" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 relative inline-block text-primary">
                        Our Smart Solutions for Every Industry
                        <span className="absolute bottom-0 left-0 w-16 h-1 bg-yellow-500 transform translate-y-2"></span>
                    </h2>
                    <p className="text-xl text-gray-600 mt-4">Tailored technology solutions to meet your specific industry needs</p>
                </div>
                
                <div className="flex flex-wrap -mx-4 mb-12">
                    <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                        <img 
                            src="https://z-cdn-media.chatglm.cn/files/4ae391dc-7cac-4525-aa3d-14982914c99f.JPG?auth_key=1870461586-6fcb2fe1f9eb4263bb1517b59283757a-0-d0f252db260b599644ab008f231b727f" 
                            alt="Barcode Solutions" 
                            className="w-full h-auto rounded-lg shadow-xl"
                        />
                    </div>
                    <div className="w-full lg:w-1/2 px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { icon: FaMicrochip, title: "MES Manufacturing Traceability", desc: "Power intelligent, end-to-end traceability with AI-enabled sensors and smart automation." },
                                { icon: FaQrcode, title: "PrintPack 2D Barcodes", desc: "Enhance retail packaging with advanced barcode printing solutions for greater efficiency and reliability." },
                                { icon: FaEye, title: "Supply Chain Visibility Tools", desc: "Trace smarter with EPCIS for real-time, standards-based supply chain insights and better operational control." },
                                { icon: FaShieldAlt, title: "Track. Inspect. Protect.", desc: "Easily manage fire extinguisher inspections and maintain full safety compliance—anytime, anywhere." }
                            ].map((sol, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-white shadow-sm text-xl text-primary">
                                            <sol.icon />
                                        </div>
                                        <h4 className="font-bold text-gray-800 leading-tight">{sol.title}</h4>
                                    </div>
                                    <p className="text-gray-600 text-sm">{sol.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: FaBarcode, title: "Barcode Solutions & Creation", desc: "Efficient, accurate barcode generation and printing for reliable operations." },
                        { icon: FaCertificate, title: "Reliable Halal Verification", desc: "Digitally verify halal-certified products for full compliance, traceability, and customer trust." },
                        { icon: FaWarehouse, title: "Fixed Asset & Warehouse Solutions", desc: "Streamline asset management and warehouse operations with efficiency and accuracy." }
                    ].map((sol, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-white shadow-sm text-xl text-primary">
                                    <sol.icon />
                                </div>
                                <h4 className="font-bold text-gray-800 leading-tight">{sol.title}</h4>
                            </div>
                            <p className="text-gray-600 text-sm">{sol.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Why Choose GST */}
        <section id="why-choose" className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 relative inline-block text-primary">
                        Why Choose GST?
                        <span className="absolute bottom-0 left-0 w-16 h-1 bg-yellow-500 transform translate-y-2"></span>
                    </h2>
                    <p className="text-xl text-gray-600 mt-4">Your trusted partner for digital transformation</p>
                </div>
                
                <div className="flex flex-wrap -mx-4 mb-16">
                    <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0 space-y-8">
                        {[
                            { icon: FaCogs, title: "Comprehensive Technological Solutions", desc: "End-to-end digital systems tailored to optimize supply chain operations across industries." },
                            { icon: FaGlobe, title: "Deep Understanding of the Saudi Market", desc: "Local expertise ensures solutions are fully aligned with regional business practices and regulatory needs." },
                            { icon: FaHeadset, title: "Dedicated Technical Support & Continuous Updates", desc: "Reliable after-sales support with regular system enhancements to keep you ahead." },
                        ].map((item, index) => (
                            <div key={index} className="flex">
                                <div className="mr-6 text-2xl flex-shrink-0" style={{ color: accentColor }}>
                                    <item.icon />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="w-full lg:w-1/2 px-4 space-y-8">
                        {[
                            { icon: FaExpandArrowsAlt, title: "Scalable System Architecture", desc: "Flexible platforms that grow with your business, suitable for SMEs to enterprise-level operations." },
                            { icon: FaCheckDouble, title: "Compliance-Ready Tools", desc: "Built to meet Saudi regulatory requirements and international standards like GS1, ensuring full traceability and integration." },
                            { icon: FaHandshake, title: "Partners in Success", desc: "Trusted by leading companies across industries to deliver innovative solutions that drive growth." },
                        ].map((item, index) => (
                            <div key={index} className="flex">
                                <div className="mr-6 text-2xl flex-shrink-0" style={{ color: accentColor }}>
                                    <item.icon />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8 md:p-12 text-center">
                        <h3 className="text-3xl font-bold mb-6 text-primary">Get in Touch</h3>
                        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                            Ready to transform your supply chain? Contact our team of experts today.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <FaMapMarkerAlt className="text-2xl" />
                                </div>
                                <h4 className="font-bold text-gray-800 mb-2">Visit Our Office</h4>
                                <p className="text-gray-600 text-sm">
                                    1st Floor Office 02 Dist,<br/>
                                    Anas Ibn Malik Rd, Al Malqa,<br/>
                                    Riyadh 13524, KSA
                                </p>
                            </div>
                            
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <FaPhone className="text-2xl" />
                                </div>
                                <h4 className="font-bold text-gray-800 mb-2">Call Us</h4>
                                <p className="text-gray-600 text-sm">
                                    +92 005 1091
                                </p>
                            </div>
                            
                            <div className="flex flex-col items-center group">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <FaEnvelope className="text-2xl" />
                                </div>
                                <h4 className="font-bold text-gray-800 mb-2">Email Us</h4>
                                <p className="text-gray-600 text-sm">
                                    info@gstsa1.org<br/>
                                    https://gstsa1.org
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </WebsiteLayout>
  );
};

export default CompanyProfile;
