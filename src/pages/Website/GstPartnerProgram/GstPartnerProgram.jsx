import React, { useState } from 'react';
import { 
  FaSearch, 
  FaUserPlus, 
  FaSignInAlt, 
  FaQrcode, 
  FaWifi, 
  FaIdCard,
  FaHandshake,
  FaCogs,
  FaQuoteLeft,
  FaRocket,
  FaBuilding,
  FaFileAlt,
  FaQuestionCircle,
  FaGavel,
  FaUsers,
  FaStar,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaTimes,
  FaCloudUploadAlt,
  FaWarehouse,
  FaIndustry,
  FaLaptop
} from 'react-icons/fa';
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";

const GstPartnerProgram = () => {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const openEnquiryModal = () => {
    setShowEnquiryModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeEnquiryModal = () => {
    setShowEnquiryModal(false);
    setEnquirySuccess(false);
    document.body.style.overflow = 'auto';
  };

  const openRegistrationModal = () => {
    setShowRegistrationModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeRegistrationModal = () => {
    setShowRegistrationModal(false);
    setRegistrationSuccess(false);
    document.body.style.overflow = 'auto';
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquirySuccess(true);
    setTimeout(() => {
      closeEnquiryModal();
    }, 3000);
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    setRegistrationSuccess(true);
    setTimeout(() => {
      closeRegistrationModal();
    }, 5000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file ? file.name : null);
  };

  const solutionTiles = [
    { icon: <FaQrcode className="text-4xl" />, title: "Barcode Solutions" },
    { icon: <FaWifi className="text-4xl" />, title: "2D Barcodes & RFID" },
    { icon: <FaIdCard className="text-4xl" />, title: "Digital Product Passport" }
  ];

  const solutions = [
    { icon: <FaQrcode />, title: "Advanced Identification Systems" },
    { icon: <FaLaptop />, title: "Custom Digital Manufacturing Tools" },
    { icon: <FaWarehouse />, title: "Smart Warehouse Management" },
    { icon: <FaIndustry />, title: "Integrated Production Systems" }
  ];

  const testimonials = [
    {
      text: "GST's Alliance Partner Program has positioned us as a leading technology provider in Saudi Arabia's manufacturing sector. The SIRI-aligned opportunities have been transformative for our business.",
      author: "CEO",
      position: "Advanced Manufacturing Solutions KSA"
    },
    {
      text: "The GST network provides unparalleled access to Saudi manufacturers undergoing digital transformation. Their expertise in local market requirements and Vision 2030 alignment is exceptional.",
      author: "General Manager",
      position: "Digital Innovations Arabia"
    }
  ];

  const partnershipLevels = [
    {
      title: "Premium Alliance Partner",
      description: "Our highest tier with comprehensive benefits including priority promotion and exclusive collaboration opportunities."
    },
    {
      title: "Professional Alliance Partner",
      description: "Our mid-tier offering substantial benefits including regular promotion and access to specialized GST training."
    },
    {
      title: "Associate Alliance Partner",
      description: "Our entry-level tier providing foundational benefits including directory listing and client referrals."
    }
  ];

  return (
    <WebsiteLayout>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 font-dubai">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-6 text-center">
          <h1 className="text-5xl font-extrabold text-[#1B365D] mb-3 tracking-tight">
            ALLIANCE PARTNER PROGRAM
          </h1>
          <p className="text-xl font-semibold text-[#254170] mb-4">
            Accelerating Saudi Arabia's Digital Manufacturing Revolution
          </p>
          <p className="text-sm text-gray-600 max-w-5xl mx-auto mb-4 leading-relaxed">
            A premier network of technology innovators specializing in Industry 4.0 solutions, dedicated to advancing Saudi manufacturing excellence through the SIRI framework and Vision 2030 initiatives.
          </p>
          <img 
            src="https://sfile.chatglm.cn/images-ppt/9a61f7229139.jpg" 
            alt="Saudi Vision 2030" 
            className="w-32 h-auto mx-auto rounded-lg mb-4"
          />
          <button 
            onClick={openEnquiryModal}
            className="px-8 py-3 bg-gradient-to-r from-[#1B365D] to-[#254170] text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            Enquire Now
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Solution Provider Directory */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-[#1B365D]">Solution Provider Directory</h2>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:shadow-md transition-all">
                    <FaSearch />
                    Search
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white text-[#1B365D] border-2 border-[#1B365D] rounded-lg font-semibold hover:bg-gray-50 transition-all">
                    <FaUserPlus />
                    Partner
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white text-[#1B365D] border-2 border-[#1B365D] rounded-lg font-semibold hover:bg-gray-50 transition-all">
                    <FaSignInAlt />
                    Login
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Partner expertise is essential for driving Saudi Arabia's manufacturing transformation. Our certified network connects manufacturers with specialists who implement Industry 4.0 technologies aligned with the SIRI program and Vision 2030 objectives.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Click on the tile you need help with:</h3>
              <div className="grid grid-cols-3 gap-4">
                {solutionTiles.map((tile, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer"
                  >
                    <div className="text-[#254170] mb-3 flex justify-center">
                      {tile.icon}
                    </div>
                    <div className="text-sm font-semibold text-gray-800">{tile.title}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Partner With Us */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#1B365D] flex items-center gap-3 mb-4">
                <FaHandshake className="text-[#254170]" />
                WHY PARTNER WITH GST?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Joining GST's Alliance Partner Program positions your business at the forefront of Saudi Arabia's industrial transformation. Gain direct access to key manufacturing decision-makers, enhance your industry reputation, and leverage our specialized marketing channels designed for the Kingdom's rapidly evolving digital landscape.
              </p>
              <div className="text-center">
                <img 
                  src="https://sfile.chatglm.cn/images-ppt/73a6102986e1.jpeg" 
                  alt="Smart Factory" 
                  className="max-h-48 rounded-xl shadow-md object-cover mx-auto"
                />
              </div>
            </section>

            {/* Our Specialized Solutions */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#1B365D] flex items-center gap-3 mb-4">
                <FaCogs className="text-[#254170]" />
                OUR SPECIALIZED SOLUTIONS
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {solutions.map((solution, index) => (
                  <div 
                    key={index}
                    className="bg-white/70 rounded-xl p-4 flex items-center gap-3 shadow-sm"
                  >
                    <div className="text-[#254170] text-xl">
                      {solution.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{solution.title}</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <img 
                  src="https://z-cdn-media.chatglm.cn/files/73687a63-bb1c-4f5c-b115-a36a1172c875.jpg?auth_key=1869847586-6882249141ef44fd9fd2e2a27059d770-0-f53918adec2bc6ef18dc7e441acf1dc1" 
                  alt="Industrial Manufacturing Facility" 
                  className="max-h-48 rounded-xl shadow-md object-cover mx-auto"
                />
              </div>
            </section>

            {/* Testimonials */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#1B365D] flex items-center gap-3 mb-4">
                <FaQuoteLeft className="text-[#254170]" />
                SUCCESS STORIES FROM OUR PARTNERS
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="bg-white/70 rounded-xl p-5 relative"
                  >
                    <FaQuoteLeft className="absolute top-2 left-2 text-5xl text-[#1B365D]/10" />
                    <p className="text-sm italic text-gray-700 mb-3 relative z-10">
                      {testimonial.text}
                    </p>
                    <p className="font-semibold text-[#1B365D] text-sm">{testimonial.author}</p>
                    <p className="text-xs text-gray-600">{testimonial.position}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#1B365D] flex items-center gap-3 mb-4">
                <FaRocket className="text-[#254170]" />
                SHAPE SAUDI ARABIA'S INDUSTRIAL FUTURE
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As Saudi Arabia accelerates toward Vision 2030, GST is at the center of the Kingdom's manufacturing evolution. Don't just witness the transformation—lead it. Join our Alliance Partner Program to connect with opportunities that drive both your business growth and Saudi Arabia's industrial excellence.
              </p>
              <button 
                onClick={openEnquiryModal}
                className="px-8 py-3 bg-gradient-to-r from-[#1B365D] to-[#254170] text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                Enquire Now
              </button>
            </section>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Navigation Menu */}
            <nav className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4">
              <div className="mb-4">
                <div className="text-base font-bold text-[#1B365D] flex items-center gap-2 mb-3">
                  <FaBuilding className="text-[#254170]" />
                  Government & Partners
                </div>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1B365D] transition-colors">
                    <FaBuilding className="text-xs" />
                    Government
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1B365D] transition-colors">
                    <FaFileAlt className="text-xs" />
                    SIRI Report
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1B365D] transition-colors">
                    <FaQuestionCircle className="text-xs" />
                    FAQs
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1B365D] transition-colors">
                    <FaGavel className="text-xs" />
                    Standards
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1B365D] transition-colors">
                    <FaUsers className="text-xs" />
                    Associations
                  </a>
                </div>
              </div>
              <div>
                <div className="text-base font-bold text-[#1B365D] flex items-center gap-2 mb-3">
                  <FaHandshake className="text-[#254170]" />
                  Solution Providers
                </div>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1B365D] transition-colors">
                    <FaSearch className="text-xs" />
                    Directory
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-[#1B365D] font-semibold border-l-3 border-[#254170] pl-2">
                    <FaStar className="text-xs" />
                    Alliance Program
                  </a>
                </div>
              </div>
            </nav>

            {/* Join Our Network */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#1B365D] flex items-center gap-2 mb-4">
                <FaUsers className="text-[#254170]" />
                JOIN OUR NETWORK
              </h2>
              <div className="space-y-4">
                <div className="bg-white/70 rounded-xl p-4 border-l-4 border-[#254170]">
                  <h3 className="text-base font-semibold text-[#1B365D] mb-2">
                    INDUSTRY 4.0 SPECIALIST?
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    If your company excels in digital manufacturing technologies, connect with our network to expand your market presence.
                  </p>
                  <button 
                    onClick={openEnquiryModal}
                    className="px-6 py-2 bg-gradient-to-r from-[#1B365D] to-[#254170] text-white font-semibold rounded-full text-sm hover:shadow-lg transition-all"
                  >
                    Enquire Now
                  </button>
                </div>
                <div className="bg-white/70 rounded-xl p-4 border-l-4 border-[#254170]">
                  <h3 className="text-base font-semibold text-[#1B365D] mb-2">
                    EMBRACING DIGITAL TRANSFORMATION?
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    If you're ready to implement cutting-edge solutions, our program provides comprehensive training and support.
                  </p>
                  <button 
                    onClick={openEnquiryModal}
                    className="px-6 py-2 bg-gradient-to-r from-[#1B365D] to-[#254170] text-white font-semibold rounded-full text-sm hover:shadow-lg transition-all"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </section>

            {/* Partnership Tiers */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#1B365D] flex items-center gap-2 mb-4">
                <FaStar className="text-[#254170]" />
                PARTNERSHIP TIERS
              </h2>
              <div className="space-y-3">
                {partnershipLevels.map((level, index) => (
                  <div 
                    key={index}
                    className="bg-white/70 rounded-xl p-4 border-l-4 border-[#254170]"
                  >
                    <h3 className="text-base font-semibold text-[#1B365D] mb-2">{level.title}</h3>
                    <p className="text-sm text-gray-600">{level.description}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <button 
                  onClick={openRegistrationModal}
                  className="px-6 py-2 bg-gradient-to-r from-[#1B365D] to-[#254170] text-white font-semibold rounded-full hover:shadow-lg transition-all"
                >
                  Register Now
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mt-6 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-[#254170]" />
              info@gstsa1.org
            </p>
            <p className="flex items-center gap-2">
              <FaPhone className="text-[#254170]" />
              +966 11 503 0591
            </p>
            <p className="flex items-center gap-2">
              <FaPhone className="text-[#254170]" />
              +966 92 005 1091
            </p>
            <p className="flex items-center gap-2">
              <FaGlobe className="text-[#254170]" />
              <a href="#" className="text-[#1B365D] font-semibold hover:underline">www.gstsa1.org</a>
            </p>
          </div>
        </footer>
      </div>

      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && closeEnquiryModal()}
        >
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-[#1B365D] to-[#254170] text-white p-6 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-2xl font-bold">GST Alliance Partner Enquiry</h2>
              <button 
                onClick={closeEnquiryModal}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="p-8">
              {enquirySuccess && (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 text-center">
                  Thank you for your enquiry! Our team will contact you within 24 hours.
                </div>
              )}
              
              <form onSubmit={handleEnquirySubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                    Company Name <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                    Position <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                    Phone Number
                  </label>
                  <input 
                    type="tel"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                      Industry Sector
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors">
                      <option value="">Select Industry</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="logistics">Logistics & Supply Chain</option>
                      <option value="retail">Retail</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="construction">Construction</option>
                      <option value="food">Food & Beverage</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                      Partnership Interest
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors">
                      <option value="">Select Partnership Level</option>
                      <option value="premium">Premium Alliance Partner</option>
                      <option value="professional">Professional Alliance Partner</option>
                      <option value="associate">Associate Alliance Partner</option>
                      <option value="unsure">Not Sure - Need Guidance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                    Message (Optional)
                  </label>
                  <textarea 
                    rows="4"
                    placeholder="Tell us about your company and how you'd like to partner with GST..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors resize-y"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#1B365D] to-[#254170] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Submit Enquiry
                </button>

                <p className="text-xs text-gray-600 text-center mt-4">
                  By submitting this form, you agree to our privacy policy and consent to GST contacting you regarding your partnership enquiry.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && closeRegistrationModal()}
        >
          <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-[#1B365D] to-[#254170] text-white p-6 rounded-t-2xl flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-2xl font-bold">GST – Global Standard Technology</h2>
              <button 
                onClick={closeRegistrationModal}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#1B365D] text-center mb-4">
                Alliance Partner Program Registration Form
              </h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Apply to join the GST Alliance Partner Program — your gateway to collaboration on MES solutions, IIoT, Industry 4.0, and SIRI-aligned digital transformation initiatives supporting industry modernization and Saudi Vision 2030.
              </p>

              {registrationSuccess && (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 text-center">
                  Thank you for your application! A GST Program Manager will review your application and contact you within 5-7 business days with next steps.
                </div>
              )}

              <form onSubmit={handleRegistrationSubmit} className="space-y-8">
                {/* Section 1: Company Information */}
                <div>
                  <h3 className="text-xl font-bold text-[#1B365D] pb-3 border-b-2 border-gray-200 mb-5">
                    Section 1 — Company Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                        Company Legal Name <span className="text-red-600">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                        Trading / Brand Name (if different)
                      </label>
                      <input 
                        type="text"
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                          Company Registration Number / Tax ID
                        </label>
                        <input 
                          type="text"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                          Website URL
                        </label>
                        <input 
                          type="url"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                        Headquarters Address
                      </label>
                      <input 
                        type="text"
                        placeholder="Street"
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                          City
                        </label>
                        <input 
                          type="text"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                          State / Province
                        </label>
                        <input 
                          type="text"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                          Country
                        </label>
                        <input 
                          type="text"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                          Postal / ZIP Code
                        </label>
                        <input 
                          type="text"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                          Business Phone Number
                        </label>
                        <input 
                          type="tel"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                          Business Email Address <span className="text-red-600">*</span>
                        </label>
                        <input 
                          type="email"
                          required
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-[#1B365D] mt-6 mb-3">Primary Contact Person</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                          Full Name
                        </label>
                        <input 
                          type="text"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                          Job Title
                        </label>
                        <input 
                          type="text"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                          Contact Email
                        </label>
                        <input 
                          type="email"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                          Mobile / Direct Line
                        </label>
                        <input 
                          type="tel"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Partnership Details */}
                <div>
                  <h3 className="text-xl font-bold text-[#1B365D] pb-3 border-b-2 border-gray-200 mb-5">
                    Section 2 — Partnership Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#1B365D] mb-3">
                        Type of Partner You Want to Apply As (Select ONE)
                      </label>
                      <div className="space-y-2">
                        {['MES Solution Provider', 'IIoT / Industry 4.0 Integrator', 'Software Provider', 'Hardware Provider', 'Consultant / Advisory Services', 'System Integrator', 'Other (Specify)'].map((type, index) => (
                          <label key={index} className="flex items-center gap-2 text-sm">
                            <input type="radio" name="partnerType" className="w-4 h-4" />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                        Describe Core Services or Solutions Your Company Provides
                      </label>
                      <p className="text-xs text-gray-600 mb-2">
                        (e.g., MES, automation, traceability, IoT connectivity, analytics, label/identification, consulting)
                      </p>
                      <textarea 
                        rows="4"
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm resize-y"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1B365D] mb-3">
                        Industry Sectors You Serve (Check all that apply)
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['Manufacturing', 'Healthcare', 'FMCG / Retail', 'Logistics & Supply Chain', 'Oil & Gas / Energy', 'Pharmaceuticals', 'Food & Beverage', 'Packaging', 'Others'].map((industry, index) => (
                          <label key={index} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="w-4 h-4" />
                            <span>{industry}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1B365D] mb-3">
                        Level of Partnership Desired
                      </label>
                      <div className="space-y-2">
                        {['Strategic Partner', 'Technology Partner', 'Associate Partner', 'Implementation Partner'].map((level, index) => (
                          <label key={index} className="flex items-center gap-2 text-sm">
                            <input type="radio" name="partnershipLevel" className="w-4 h-4" />
                            <span>{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                        Previous Experience with GS1 Standards / SIRI / Industry 4.0
                      </label>
                      <p className="text-xs text-gray-600 mb-2">(Optional — briefly describe)</p>
                      <textarea 
                        rows="3"
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm resize-y"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Section 3: Business Capabilities */}
                <div>
                  <h3 className="text-xl font-bold text-[#1B365D] pb-3 border-b-2 border-gray-200 mb-5">
                    Section 3 — Business Capabilities
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#1B365D] mb-3">
                        Annual Company Turnover (optional)
                      </label>
                      <div className="space-y-2">
                        {['Under $1M', '$1M – $5M', '$5M – $20M', '$20M+'].map((turnover, index) => (
                          <label key={index} className="flex items-center gap-2 text-sm">
                            <input type="radio" name="turnover" className="w-4 h-4" />
                            <span>{turnover}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                        Company Logo Upload
                      </label>
                      <p className="text-xs text-gray-600 mb-2">(Preferred format: PNG or SVG)</p>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-2 border-dashed border-[#1B365D] rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                          <FaCloudUploadAlt className="text-[#1B365D]" />
                          <span className="text-sm text-[#1B365D] font-medium">Choose File</span>
                          <input 
                            type="file" 
                            accept=".png,.svg" 
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                        <span className="text-sm text-gray-600">
                          {selectedFile || 'No file selected'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                        Company Overview / Value Proposition
                      </label>
                      <p className="text-xs text-gray-600 mb-2">(200–500 words)</p>
                      <textarea 
                        rows="5"
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm resize-y"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Section 4: Agreements & Compliance */}
                <div>
                  <h3 className="text-xl font-bold text-[#1B365D] pb-3 border-b-2 border-gray-200 mb-5">
                    Section 4 — Agreements & Compliance
                  </h3>

                  <div className="space-y-4">
                    <label className="flex items-start gap-3 text-sm">
                      <input type="checkbox" required className="w-4 h-4 mt-1" />
                      <span>I confirm that I have read and agree to the GST Alliance Partner Program Terms & Conditions.</span>
                    </label>

                    <label className="flex items-start gap-3 text-sm">
                      <input type="checkbox" required className="w-4 h-4 mt-1" />
                      <span>I consent to receive program updates, training invites, and partner communications from GST.</span>
                    </label>

                    <div>
                      <label className="block text-sm font-semibold text-[#1B365D] mb-2">
                        Signature / Digital Consent
                      </label>
                      <p className="text-xs text-gray-600 mb-2">(Typed Full Name & Date)</p>
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text"
                          placeholder="Full Name"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                        />
                        <input 
                          type="date"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#254170] focus:outline-none transition-colors text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submission Instructions */}
                <div className="bg-blue-50 border-l-4 border-[#254170] p-5 rounded-lg">
                  <h3 className="text-base font-bold text-[#1B365D] mb-3">Submission Instructions</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    📌 After completing the form, click the Submit button to complete your registration.
                  </p>
                  <p className="text-sm text-gray-700">
                    📌 A GST Program Manager will review your application and contact you within 5-7 business days with next steps.
                  </p>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#1B365D] to-[#254170] text-white font-semibold rounded-lg hover:shadow-lg transition-all text-base"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    </WebsiteLayout>
  );
};

export default GstPartnerProgram;