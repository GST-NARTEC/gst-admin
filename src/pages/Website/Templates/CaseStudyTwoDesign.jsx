import React from "react";
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";
import { Images } from "../../../assets/Index";
import { Button } from "@nextui-org/react";

function CaseStudyTwoDesign() {
  return (
    <WebsiteLayout>
      <div>
        {/* section one */}
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
          <div className="absolute bottom-0 right-0 z-50 transform translate-y-1/2 max-w-5xl  w-full">
            <div className="bg-primary mr-8 rounded-lg shadow-2xl">
              <div className="px-8 py-8">
                <p className="text-lg md:text-xl text-gray-200 font-semibold">
                  Case Study: Traceability in Fresh Foods
                </p>
                <p className="text-lg md:text-xl text-gray-200">
                  Client: Arrivé Group (France)
                </p>
                <p className="text-lg md:text-xl text-gray-200">
                  Sector: Poultry Production & Processing
                </p>
                <p className="text-lg md:text-xl text-gray-200">
                  Focus: End-to-End Food Traceability using GS1 Standards
                </p>
                <p className="text-lg md:text-xl text-gray-200">
                  with Smart Barcode {"&"} QR Code Solutions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* section two */}
        <section className="py-16 bg-white mt-24">
          <div className="container mx-auto px-4">
            {/* Title */}
            <h2 className="text-2xl  font-bold text-secondary mb-6 text-start">
              The Solution by GST Standard Technology
            </h2>

            {/* First Content Block */}
            <div className="mb-12">
              <p className="text-lg text-gray-700 leading-relaxed text-start">
                GST deployed a customized Barcode & QR Code Labeling System,
                fully integrated with Arrivé's supply chain infrastructure,
                providing complete traceability from farm to fork. The system
                enables rapid response to food safety incidents and ensures
                compliance with European regulations.
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
          </div>
        </section>

        {/* section three */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* First Container - Image and Challenges */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* left Column - Challenges Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                  The Challenges
                </h2>
                <p className="text-lg text-gray-700 mb-6">Arrivé needed to:</p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Ensure full traceability across a long and complex poultry
                      supply chain
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Respond rapidly to food safety crises (e.g., dioxin, avian
                      flu)
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Replace slow and error-prone paper-based systems
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Comply with new European food safety regulations (EC
                      178-2002)
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Maintain operational efficiency without overhauling legacy
                      systems
                    </span>
                  </div>
                </div>
              </div>
              {/* right Column - Image */}
              <div>
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Poultry Supply Chain"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* section four */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* First Container - Image and Challenges */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* left Column - Image */}

              <div>
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Poultry Supply Chain"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* right Column - Challenges Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                  The Challenges
                </h2>
                <p className="text-lg text-gray-700 mb-6">Arrivé needed to:</p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Ensure full traceability across a long and complex poultry
                      supply chain
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Respond rapidly to food safety crises (e.g., dioxin, avian
                      flu)
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Replace slow and error-prone paper-based systems
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Comply with new European food safety regulations (EC
                      178-2002)
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Maintain operational efficiency without overhauling legacy
                      systems
                    </span>
                  </div>

                  {/* button */}
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
              </div>
            </div>
          </div>
        </section>

        {/* section five */}
        <section className="py-16 bg-white mt-24">
          <div className="container mx-auto px-4">
            {/* Title */}
            <h2 className="text-2xl  font-bold text-secondary mb-6 text-start">
              The Solution by GST Standard Technology
            </h2>

            {/* First Content Block */}
            <div className="mb-12">
              <p className="text-lg text-gray-700 leading-relaxed text-start">
                GST deployed a customized Barcode & QR Code Labeling System,
                fully integrated with Arrivé's supply chain infrastructure,
                providing complete traceability from farm to fork. The system
                enables rapid response to food safety incidents and ensures
                compliance with European regulations.
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
          </div>
        </section>

        {/* section six */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* First Container - conent and Challenges */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* left Column - content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                  The Challenges
                </h2>
                <p className="text-lg text-gray-700 mb-6">Arrivé needed to:</p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Ensure full traceability across a long and complex poultry
                      supply chain
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Respond rapidly to food safety crises (e.g., dioxin, avian
                      flu)
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Replace slow and error-prone paper-based systems
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Comply with new European food safety regulations (EC
                      178-2002)
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Maintain operational efficiency without overhauling legacy
                      systems
                    </span>
                  </div>
                </div>
              </div>

              {/* right Column - Challenges Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                  The Challenges
                </h2>
                <p className="text-lg text-gray-700 mb-6">Arrivé needed to:</p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Ensure full traceability across a long and complex poultry
                      supply chain
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Respond rapidly to food safety crises (e.g., dioxin, avian
                      flu)
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Replace slow and error-prone paper-based systems
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Comply with new European food safety regulations (EC
                      178-2002)
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Maintain operational efficiency without overhauling legacy
                      systems
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* section seven */}
        <section className="py-16 bg-gray-50 mb-10">
          <div className="container mx-auto px-4">
            {/* First Container - Image and Challenges */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* left Column - Image */}

              <div>
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Poultry Supply Chain"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* right Column - Challenges Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                  The Challenges
                </h2>
                <p className="text-lg text-gray-700 mb-6">Arrivé needed to:</p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Ensure full traceability across a long and complex poultry
                      supply chain
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Respond rapidly to food safety crises (e.g., dioxin, avian
                      flu)
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Replace slow and error-prone paper-based systems
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Comply with new European food safety regulations (EC
                      178-2002)
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-lg text-gray-700">
                      Maintain operational efficiency without overhauling legacy
                      systems
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* section egiht */}
        <section className=" bg-white   mb-10">
          <div className="container mx-auto px-4">
            {/* Title */}
            <h2 className="text-2xl  font-bold text-secondary mb-6 text-start">
              Partner Highlight
            </h2>

            {/* First Content Block */}
            <div className="mb-12">
              <p className="text-lg text-gray-700 leading-relaxed text-start">
                SOFRICA Logistics – Key transport and storage partner
                responsible for frozen poultry traceability from Arrivé
                facilities to customers.
              </p>
            </div>

            {/* button of Learn About GS1 Sunrise 2027 */}
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
      </div>
    </WebsiteLayout>
  );
}

export default CaseStudyTwoDesign;
