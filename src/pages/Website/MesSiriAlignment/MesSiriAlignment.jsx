import React, { useState } from 'react';
import { 
  FaCheckCircle, 
  FaLightbulb, 
  FaCogs, 
  FaGift, 
  FaUsers, 
  FaStar, 
  FaArrowRight, 
  FaSearch, 
  FaRocket, 
  FaChartBar, 
  FaMapMarkedAlt, 
  FaTachometerAlt, 
  FaLink, 
  FaBullseye, 
  FaUserTie, 
  FaHardHat, 
  FaLaptopCode, 
  FaCheck,
  FaQuestionCircle
} from 'react-icons/fa';
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";

const MesSiriAlignment = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleButtonClick = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const processSteps = [
    {
      number: 1,
      title: "Data Gathering & Process Insight",
      description: "We work with your team to collect operational data, workflows, and system inventories."
    },
    {
      number: 2,
      title: "Digital Maturity Evaluation",
      description: "Through SIRI's three pillars — Process, Technology, and Organization — we assess your current capacity for digital transformation."
    },
    {
      number: 3,
      title: "Gap Analysis & Scoring",
      description: "Find where your production stands versus industry standards and identify opportunities for rapid improvement."
    },
    {
      number: 4,
      title: "MES Integration Roadmap",
      description: "Receive a detailed, prioritized plan showing how MES technologies can be implemented to streamline manufacturing processes."
    }
  ];

  const benefits = [
    {
      icon: <FaSearch className="w-5 h-5" />,
      title: "Gain a Realistic Baseline",
      description: "Understand where your factory stands today in terms of digital maturity, enabling informed strategic decisions that enhance productivity and quality."
    },
    {
      icon: <FaRocket className="w-5 h-5" />,
      title: "Prioritize High-Value Initiatives",
      description: "Focus resources and investments on the most impactful improvements — from shop-floor automation to MES integration — for optimized performance."
    },
    {
      icon: <FaChartBar className="w-5 h-5" />,
      title: "Benchmark Against Best Practices",
      description: "Measure your performance against global benchmarks and industry leaders to stay competitive and aligned with Vision 2030 objectives."
    }
  ];

  const personas = [
    {
      icon: <FaUserTie className="w-8 h-8" />,
      title: "Industrial Executives & Plant Leaders",
      description: "Seeking clarity on transformation priorities"
    },
    {
      icon: <FaHardHat className="w-8 h-8" />,
      title: "Operations & Production Managers",
      description: "Aiming to boost efficiency and consistency"
    },
    {
      icon: <FaLaptopCode className="w-8 h-8" />,
      title: "IT & Digital Transformation Teams",
      description: "Planning MES adoption and systems integration"
    }
  ];

  const features = [
    "Industry Expertise – We combine deep manufacturing knowledge with global MES and digital transformation expertise.",
    "Customized Solutions – Each roadmap is tailored to your operational goals and industry context.",
    "End-to-End Support – From assessment to MES implementation and optimization, we're your strategic partner for smart manufacturing."
  ];

  const whatYouGet = [
    {
      icon: <FaMapMarkedAlt className="w-5 h-5" />,
      title: "Actionable Roadmap:",
      description: "A clear strategy with milestones to implement MES and automation technologies that transform your operations."
    },
    {
      icon: <FaTachometerAlt className="w-5 h-5" />,
      title: "Efficiency Improvements:",
      description: "Identify bottlenecks, reduce production waste, and improve throughput through data-driven insights."
    },
    {
      icon: <FaLink className="w-5 h-5" />,
      title: "Cross-Functional Alignment:",
      description: "Unify your operations, IT, and executive teams around a shared vision for digital maturity and smart manufacturing."
    },
    {
      icon: <FaBullseye className="w-5 h-5" />,
      title: "Vision 2030 Alignment:",
      description: "Ensure your digital transformation initiatives support national industrialization goals, innovation growth, and economic diversification."
    }
  ];

  return (
    <WebsiteLayout>
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 relative font-dubai">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-5 right-5 px-6 py-4 bg-gradient-to-r from-[#1B365D] to-[#254170] text-white rounded-lg font-semibold z-50 shadow-lg animate-slide-in">
          Thank you for your interest! Our team will contact you soon.
        </div>
      )}

      {/* Banner Header */}
      <header className="relative sm:h-[280px] h-auto overflow-hidden">
        <img 
          src="https://z-cdn-media.chatglm.cn/files/521cd242-9201-4e89-8256-b1a9371a948b.jpg?auth_key=1869846270-362f4acb1ac54c05bc5c058e79d4f82f-0-8335aef3bf96e2c9a4828f9b3138f4cf" 
          alt="Modern Factory" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B365D]/90 to-[#254170]/85" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">SIRI-Aligned MES Assessment</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Empower Your Factory for Digital Manufacturing and Saudi Vision 2030
          </h2>
          <p className="text-sm md:text-base leading-relaxed max-w-4xl">
            In today's rapidly evolving industrial landscape, digital readiness isn't optional — it's essential. Our SIRI-Aligned MES Assessment helps industrial enterprises understand their current manufacturing maturity, define a clear path toward smart production, and integrate Manufacturing Execution Systems (MES) that unlock long-term growth and competitiveness in line with Saudi Vision 2030.
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* What Is Section */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[#1B365D] flex items-center gap-3">
            <FaQuestionCircle className="w-6 h-6 text-[#1B365D]" />
            What Is the SIRI-Aligned MES Assessment?
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              The Smart Industry Readiness Index (SIRI) is a globally accepted evaluation framework that measures 
              a manufacturer's readiness for Industry 4.0 adoption by examining three core dimensions: Process, 
              Technology, and Organization. GST adapts this framework to assess your factory's digital maturity 
              and guide your journey toward connected, efficient, data-driven operations.
            </p>
            <p className="font-medium">Our SIRI-Aligned MES Assessment offers:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 text-[#1B365D] mt-0.5 flex-shrink-0" />
                <span>A structured evaluation of your operational maturity</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 text-[#1B365D] mt-0.5 flex-shrink-0" />
                <span>Real insights into your digital and automation gaps</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 text-[#1B365D] mt-0.5 flex-shrink-0" />
                <span>Strategic guidance to implement MES solutions that deliver measurable value</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Why It Matters Section */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[#1B365D] flex items-center gap-3">
            <FaLightbulb className="w-6 h-6 text-[#1B365D]" />
            Why It Matters for Your Business
          </h2>
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-6">
              As industries worldwide embrace smart manufacturing, leading enterprises adopt a systematic approach 
              to evaluate and evolve their production environment. The GST SIRI-Aligned MES Assessment helps you:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.slice(0, 2).map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 flex items-start gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
                >
                  <div className="text-[#1B365D] flex-shrink-0 mt-1">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1B365D] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="bg-gray-50 rounded-lg p-6 flex items-start gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
                <div className="text-[#1B365D] flex-shrink-0 mt-1">
                  {benefits[2].icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#1B365D] mb-2">{benefits[2].title}</h3>
                  <p className="text-sm text-gray-600">{benefits[2].description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[#1B365D] flex items-center gap-3">
            <FaCogs className="w-6 h-6 text-[#1B365D]" />
            How GST's SIRI-Aligned MES Assessment Works
          </h2>
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-8">
              Our process is built on a comprehensive evaluation methodology that examines your existing operations 
              and readiness across multiple vectors:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-gray-50 rounded-lg p-6 text-center h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
                    <div className="w-12 h-12 bg-[#1B365D] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                      {step.number}
                    </div>
                    <h3 className="font-semibold text-[#1B365D] mb-3 text-sm leading-snug">{step.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-[#1B365D] text-2xl z-10">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[#1B365D] flex items-center gap-3">
            <FaGift className="w-6 h-6 text-[#1B365D]" />
            What You Get
          </h2>
          <div className="text-gray-700 leading-relaxed">
            <ul className="space-y-4">
              {whatYouGet.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="text-[#1B365D] mt-0.5 flex-shrink-0">
                    {item.icon}
                  </div>
                  <span>
                    <strong className="text-[#1B365D]">{item.title}</strong> {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Who Should Engage Section */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[#1B365D] flex items-center gap-3">
            <FaUsers className="w-6 h-6 text-[#1B365D]" />
            Who Should Engage in This Assessment?
          </h2>
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-6">Our SIRI-Aligned MES Assessment is ideal for:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {personas.map((persona, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
                >
                  <div className="text-[#1B365D] flex justify-center mb-3">
                    {persona.icon}
                  </div>
                  <h3 className="font-semibold text-[#1B365D] mb-2 text-sm leading-snug">{persona.title}</h3>
                  <p className="text-xs text-gray-600">{persona.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose GST Section */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[#1B365D] flex items-center gap-3">
            <FaStar className="w-6 h-6 text-[#1B365D]" />
            Why Choose GST – Global Standard Solutions?
          </h2>
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-6">
              At GST, we go beyond traditional assessments — we translate insights into implementable plans that deliver measurable outcomes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3"
                >
                  <FaCheck className="w-4 h-4 text-[#1B365D] mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4 text-[#1B365D] flex items-center justify-center gap-3">
            <FaArrowRight className="w-6 h-6 text-[#1B365D]" />
            Take the Next Step Toward a Smarter Factory
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            A comprehensive SIRI-Aligned MES Assessment is the first step to becoming a connected, competitive, 
            resilient manufacturer. Transform your operations with data-driven planning rooted in global standards 
            and aligned with Saudi Vision 2030.
          </p>
          <button 
            onClick={handleButtonClick}
            className="px-8 py-3 text-base font-semibold text-white bg-[#1B365D] hover:bg-[#254170] rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
          >
            Contact GST – Global Standard Solutions Today
          </button>
        </section>
      </main>

      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(400px); }
          to { transform: translateX(0); }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </div>
    </WebsiteLayout>
  );
};

export default MesSiriAlignment;