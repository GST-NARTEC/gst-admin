import React from "react";
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";
import { Images } from "../../../assets/Index";
import { Button } from "@nextui-org/react";

function CaseStudyOneDesing() {
  return (
    <WebsiteLayout>
      {/* Header Section */}
      <section className="relative h-screen bg-cover bg-center bg-no-repeat">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')",
          }}
        ></div>

        {/* Logo - Top Left */}
        <div className="absolute top-8 left-8 z-20">
          <img
            src={Images.Logo}
            alt="GST Logo"
            className="w-auto h-32 rounded-md"
          />
        </div>

        {/* Blue Card - Bottom, overlapping the image */}
        <div className="absolute bottom-0 left-0 right-0 z-50 transform translate-y-1/3">
          <div className="bg-primary mx-8 rounded-lg shadow-2xl">
            <div className="px-8 py-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                LuLu Hypermarket Streamlines Product Labeling
              </h1>
              <p className="text-lg md:text-xl text-gray-200">
                with Smart Barcode & QR Code Solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional sections will be added here */}
      {/* Section 2 - Overview */}
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Overview Content */}
            <div>
              <h2 className="text-4xl font-bold text-primary mb-8">Overview</h2>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  LuLu Hypermarket is one of the leading retail chains in the
                  GCC, operating large-scale stores with thousands of
                  fast-moving consumer goods (FMCG). With high inventory
                  turnover and multi-branch operations, LuLu needed a more
                  efficient and scalable product labeling solution that could
                  keep pace with their expanding footprint.
                </p>

                <p>
                  LuLu Hypermarket is one of the leading retail chains in the
                  GCC, operating large-scale stores with thousands of
                  fast-moving consumer goods (FMCG). With high inventory
                  turnover and multi-branch operations, LuLu needed a more
                  efficient and scalable product labeling solution that could
                  keep pace with their expanding footprint.
                </p>

                <p>
                  LuLu Hypermarket is one of the leading retail chains in the
                  GCC, operating large-scale stores with thousands of
                  fast-moving consumer goods (FMCG). With high inventory
                  turnover and multi-branch operations, LuLu needed a more
                  efficient and scalable product labeling solution that could
                  keep pace with their expanding footprint.
                </p>
              </div>
            </div>

            {/* Right Column - Quote Box */}
            <div className="lg:mt-16">
              <div className="bg-secondary p-8 rounded-lg shadow-lg">
                <blockquote className="text-white">
                  <p className="text-lg leading-relaxed mb-6">
                    "Smart labeling and traceability are essential for retail
                    operations today. GST's barcode and QR systems help us
                    optimize product tracking, reduce errors, and enhance
                    inventory control at scale."
                  </p>
                  <footer className="border-t border-white/20 pt-4">
                    <cite className="font-semibold not-italic">
                      — Regional IT Lead, LuLu Hypermarket
                    </cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Solution */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 text-start">
            The Solution by GST Standard Technology
          </h2>

          {/* First Content Block */}
          <div className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed text-start">
              GST deployed a customized Barcode & QR Code Labeling System, fully
              integrated with LuLu's ERP and POS infrastructure, across multiple
              branches in Saudi Arabia. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quasi aspernatur modi veniam nam nemo ex, enim
              deserunt fuga ratione velit iure cumque saepe amet placeat
              dolorem, corrupti pariatur commodi laborum!
            </p>
          </div>

          {/* Central Image */}
          <div className="mb-12 flex justify-center">
            <div className="w-full max-w-4xl">
              <img
                src="https://images.pond5.com/barcode-scanner-background-bar-code-footage-234071997_iconl.jpeg"
                alt="Barcode and QR Code Labeling System"
                className="w-full h-72 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          <h2 className="text-3xl  font-bold text-secondary mb-6 text-start">
            The Solution by GST Standard Technology
          </h2>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
            recusandae obcaecati veniam sunt iure! Possimus aliquam accusantium
            error dicta, illum rerum! Ipsum animi perferendis, voluptatibus in
            quas asperiores minus quidem!
          </div>

          {/* Key Features Title */}
          <h3 className="text-2xl font-bold text-primary my-8 ">
            Key features included:
          </h3>

          {/* Features List */}
          <div className="w-full">
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-secondary rounded-full mt-3 mr-4 flex-shrink-0"></span>
                <span>Centralized GS1-compliant barcode management</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-secondary rounded-full mt-3 mr-4 flex-shrink-0"></span>
                <span>Custom label designs by product category</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-secondary rounded-full mt-3 mr-4 flex-shrink-0"></span>
                <span>
                  QR code support for digital promotions and product information
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-secondary rounded-full mt-3 mr-4 flex-shrink-0"></span>
                <span>High-speed bulk label printing with verification</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-secondary rounded-full mt-3 mr-4 flex-shrink-0"></span>
                <span>Multilingual templates (Arabic & English)</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-secondary rounded-full mt-3 mr-4 flex-shrink-0"></span>
                <span>Onboarding & training for store-level teams</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4 - Results */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* First Container - Image and Main Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Left Column - Image */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="LuLu Hypermarket Mobile App"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Right Column - Main Results Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                Results & Impact
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-lg text-gray-700">
                    70% reduction in label printing and design time
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-lg text-gray-700">
                    Consistent barcode quality across all stores
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-red-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                    ↗
                  </span>
                  <span className="text-lg text-gray-700">
                    Improved checkout speed and POS accuracy
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                    📱
                  </span>
                  <span className="text-lg text-gray-700">
                    Enabled product-specific QR code promotions
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                    📊
                  </span>
                  <span className="text-lg text-gray-700">
                    Enhanced inventory visibility and stock accuracy
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                    🎯
                  </span>
                  <span className="text-lg text-gray-700">
                    Fully aligned with retail compliance standards (GS1, Vision
                    2030)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Second Container - Results Content and Quote Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Results Content */}
            <div>
              <h3 className="text-2xl font-bold text-orange-500 mb-6">
                Results & Impact
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-lg text-gray-700">
                    70% reduction in label printing and design time
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-lg text-gray-700">
                    Consistent barcode quality across all stores
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-red-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                    ↗
                  </span>
                  <span className="text-lg text-gray-700">
                    Improved checkout speed and POS accuracy
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                    📱
                  </span>
                  <span className="text-lg text-gray-700">
                    Enabled product-specific QR code promotions
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                    📊
                  </span>
                  <span className="text-lg text-gray-700">
                    Enhanced inventory visibility and stock accuracy
                  </span>
                </div>

                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                    🎯
                  </span>
                  <span className="text-lg text-gray-700">
                    Fully aligned with retail compliance standards (GS1, Vision
                    2030)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Quote Box */}
            <div className="flex items-start">
              <div className="bg-teal-500 p-6 rounded-lg shadow-lg w-full">
                <blockquote className="text-white">
                  <p className="text-lg leading-relaxed mb-4">
                    "GST's solution helped us gain speed and precision in
                    barcode labeling, while opening the door for QR-driven
                    retail experiences."
                  </p>
                  <footer>
                    <cite className="font-semibold not-italic">
                      Regional IT Manager, LuLu Saudi Arabia
                    </cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Testimonial */}
      <section className="py-16 text-white">
        <div className="container mx-auto px-4">
           {/* Central Image */}
          <div className="mb-12 flex justify-center">
            <div className="w-full max-w-4xl">
              <img
                src="https://images.pond5.com/barcode-scanner-background-bar-code-footage-234071997_iconl.jpeg"
                alt="Barcode and QR Code Labeling System"
                className="w-full h-72 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

            {/* Key Features Title */}
          <h3 className="text-2xl font-bold text-primary my-8 ">
            Key features included:
          </h3>

          {/* Features List */}
          <div className="w-full">
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-secondary rounded-full mt-3 mr-4 flex-shrink-0"></span>
                <span>Centralized GS1-compliant barcode management</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-secondary rounded-full mt-3 mr-4 flex-shrink-0"></span>
                <span>Custom label designs by product category</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-secondary rounded-full mt-3 mr-4 flex-shrink-0"></span>
                <span>
                  QR code support for digital promotions and product information
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-secondary rounded-full mt-3 mr-4 flex-shrink-0"></span>
                <span>High-speed bulk label printing with verification</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-secondary rounded-full mt-3 mr-4 flex-shrink-0"></span>
                <span>Multilingual templates (Arabic & English)</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-secondary rounded-full mt-3 mr-4 flex-shrink-0"></span>
                <span>Onboarding & training for store-level teams</span>
              </li>
            </ul>
          </div>
          {/* Content will be added here */}
          <Button
            as="a"
            href="https://www.gs1.org/standards/gs1-sunrise-2027"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4"
            color="primary"
          >
            Learn About GS1 Sunrise 2027
          </Button>
        </div>
      </section>
    </WebsiteLayout>
  );
}

export default CaseStudyOneDesing;
