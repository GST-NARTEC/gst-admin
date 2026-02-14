import React from 'react';
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";

const TraceabilityPresentation = () => {
  return (
    <WebsiteLayout>
      <div className="w-full bg-white font-sans overflow-x-hidden">
        
        {/* Slide 1: Hero/Title Slide */}
        <section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 sm:py-20"
          style={{
            backgroundImage: "url('https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:0/2f9c7259-99aa-499c-aa38-a61a10ee5ac4/2021295923267248128:00dc2c319b313da878497e815012e470:0_page_1_inp_img_lama_refine.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              End-to-End Traceability: From Flour to Subway<br className="hidden sm:block"/>
              Sandwich Using GST GTRACK Platform with EPCIS v2.0<br className="hidden sm:block"/>
              Global Traceability Standards
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-black mb-6 sm:mb-8 font-normal" style={{ fontFamily: 'Poppins, sans-serif' }}>
              A Professional Process Flow Demonstrating<br className="hidden sm:block"/>
              One Step Back, One Step Forward Traceability
            </p>
            <div className="mt-8 sm:mt-12">
              <p className="text-base sm:text-lg md:text-xl font-bold text-black bg-white bg-opacity-70 inline-block px-4 py-2 rounded">GST EPCIS v2.0</p>
            </div>
          </div>
        </section>

        {/* Slide 2: Foundations of Global Traceability Standards */}
        <section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 sm:py-20"
          style={{
            backgroundImage: "url('https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:0/142d26c2-2b4b-43a3-94d2-c70c266aba7d/2021295923267248128:00dc2c319b313da878497e815012e470:0_page_2_inp_img_lama_refine.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-16 px-4" style={{ color: '#7B3500', fontFamily: 'Noto Sans JP, sans-serif' }}>
              Foundations of Global Traceability Standards
            </h2>
            
            <div className="flex justify-center mb-8 sm:mb-12 px-4">
              <img 
                src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:0/b34d0ca5-c5c6-4362-a593-4f9040c08ea1/2021295923267248128:00dc2c319b313da878497e815012e470:0_page_2_image_3.png" 
                alt="Traceability Framework"
                className="max-w-full h-auto w-full sm:max-w-lg"
              />
            </div>
            
            <div className="text-center px-4">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: '#4CAF50', fontFamily: 'Noto Sans JP, sans-serif' }}>
                Enabling One Step Back, One Step Forward Traceability
              </p>
            </div>
          </div>
        </section>

        {/* Slide 3: Raw Material Origin */}
        <section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2 sm:mb-4 px-4" style={{ color: '#1A202C', fontFamily: 'Poppins, sans-serif' }}>
              Raw Material Origin: Flour Supplier and Importer
            </h2>
            
            <div className="relative mb-8">
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-orange-500 rounded-lg mr-4"></div>
                <p className="text-base sm:text-lg lg:text-xl font-bold text-center flex-grow" style={{ color: '#D97706', fontFamily: 'Poppins, sans-serif' }}>
                  Establishing the First Link in the Traceability Chain
                </p>
                <div className="w-16 h-16 bg-orange-500 rounded-lg ml-4"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12 px-4 relative">
              <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-12 h-32 bg-green-500 rounded-lg"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-4 sm:mb-6" style={{ color: '#1A202C', fontFamily: 'Poppins, sans-serif' }}>
                    Flour Supplier
                  </h3>
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base lg:text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <li>• GTIN: Unique product identifier</li>
                    <li>• Batch/Lot: Production batch number</li>
                    <li>• GLN: Production facility location</li>
                    <li>• bizStep: commissioning</li>
                    <li>• Action: Creation of new product</li>
                  </ul>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-4 sm:mb-6" style={{ color: '#1A202C', fontFamily: 'Poppins, sans-serif' }}>
                    Receiving Event
                  </h3>
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base lg:text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <li>• SSCC: Container identification</li>
                    <li>• GTIN: Product received</li>
                    <li>• GLN: Receiving warehouse location</li>
                    <li>• bizStep: receiving</li>
                    <li>• Action: OBSERVE</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-8 px-4" style={{ color: '#1A202C', fontFamily: 'Poppins, sans-serif' }}>
              Visual Process Spotlight
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8 px-4">
              <div className="text-center bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:0/59050013-6eba-4353-bf95-2262f97dc158/2021295923267248128:00dc2c319b313da878497e815012e470:0_page_3_image_18.png"
                  alt="Handheld Scanner"
                  className="mx-auto mb-3 sm:mb-4 max-w-full h-auto rounded-lg"
                />
                <h4 className="font-bold text-base sm:text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Handheld 2D Scanner Capture
                </h4>
                <p className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  One-Step-Back/One-Step-Forward Traceability: Efficiently captures unique identifiers for real-time visibility across the supply chain.
                </p>
              </div>
              
              <div className="text-center bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:0/7df59c6b-b319-4b83-b6ea-0b4c7cffc786/2021295923267248128:00dc2c319b313da878497e815012e470:0_page_3_image_21.png"
                  alt="Smartphone Scanner"
                  className="mx-auto mb-3 sm:mb-4 max-w-full h-auto rounded-lg"
                />
                <h4 className="font-bold text-base sm:text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Smartphone Scanning Demonstration
                </h4>
                <p className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Instant Data Retrieval: Access detailed product information, batch data, and safety certificates instantly through secure mobile apps.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 py-4 px-6 rounded-lg mx-4">
              <p className="text-base sm:text-lg lg:text-xl font-bold text-center text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Establishing the First Link in the Traceability Chain
              </p>
            </div>
          </div>
        </section>

        {/* Slide 4: Manufacturing Transformation */}
        <section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 sm:py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 px-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Manufacturing: Transforming Flour into Bread
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 sm:gap-4 mb-6 sm:mb-8 px-4">
              <div className="text-center bg-white bg-opacity-95 rounded-lg p-3 sm:p-4 shadow-md">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:0/bbc0f935-f0bd-4b72-b803-8883c22cba9a/2021295923267248128:00dc2c319b313da878497e815012e470:0_page_4_image_2.png"
                  alt="Input"
                  className="mx-auto mb-2 max-w-full h-auto"
                />
                <p className="text-sm sm:text-base lg:text-lg font-semibold mb-1">INPUT Flour Batch</p>
                <p className="text-xs sm:text-sm" style={{ color: '#002040' }}>GTIN + Batch/Lot ID</p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <svg className="w-full h-8" viewBox="0 0 100 20">
                  <line x1="0" y1="10" x2="90" y2="10" stroke="#3B82F6" strokeWidth="3"/>
                  <polygon points="90,5 100,10 90,15" fill="#3B82F6"/>
                </svg>
              </div>

              <div className="text-center bg-white bg-opacity-95 rounded-lg p-3 sm:p-4 shadow-md">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:0/a08bed26-ae51-4d18-b39b-fe7732c10e88/2021295923267248128:00dc2c319b313da878497e815012e470:0_page_4_image_6.png"
                  alt="Transformation"
                  className="mx-auto mb-2 max-w-full h-auto"
                />
                <p className="text-sm sm:text-base lg:text-lg font-semibold mb-1">TransformationEvent</p>
                <p className="text-xs sm:text-sm">bizStep: commissioning</p>
                <p className="text-xs mt-2">Sensor Data Monitoring</p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <svg className="w-full h-8" viewBox="0 0 100 20">
                  <line x1="0" y1="10" x2="90" y2="10" stroke="#3B82F6" strokeWidth="3"/>
                  <polygon points="90,5 100,10 90,15" fill="#3B82F6"/>
                </svg>
              </div>

              <div className="text-center bg-white bg-opacity-95 rounded-lg p-3 sm:p-4 shadow-md">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:0/3d568803-8858-419b-9768-991561d4639b/2021295923267248128:00dc2c319b313da878497e815012e470:0_page_4_image_10.png"
                  alt="Output"
                  className="mx-auto mb-2 max-w-full h-auto"
                />
                <p className="text-sm sm:text-base lg:text-lg font-semibold mb-1">OUTPUT Bread Batch</p>
                <p className="text-xs sm:text-sm" style={{ color: '#002040' }}>New GTIN + Batch/Lot ID</p>
              </div>
            </div>

            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center mb-6 sm:mb-8 mx-4 shadow-md">
              <p className="text-sm sm:text-base lg:text-lg font-semibold">
                What: Input/Output GTINs | When: Event Timestamp | Where: Processing Facility GLN | Why: Commissioning
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 px-4">
              <div className="text-center bg-white bg-opacity-95 rounded-xl p-4 shadow-lg">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:0/6feaaa42-6d7d-486f-b36d-c5af5555e95d/2021295923267248128:00dc2c319b313da878497e815012e470:0_page_4_image_14.png"
                  alt="Handheld Scanner"
                  className="mx-auto mb-3 sm:mb-4 max-w-full h-auto"
                />
                <h4 className="font-bold text-sm sm:text-base mb-2">Handheld 2D Scanner Capture</h4>
                <p className="text-xs sm:text-sm text-gray-600">One-Step-Back/One-Step-Forward Traceability: Efficiently captures unique identifiers for real-time visibility across the supply chain.</p>
              </div>
              
              <div className="text-center bg-white bg-opacity-95 rounded-xl p-4 shadow-lg">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:0/d076a36c-8b4a-4654-a4ef-6975eb6a7b81/2021295923267248128:00dc2c319b313da878497e815012e470:0_page_4_image_17.png"
                  alt="Mobile App"
                  className="mx-auto mb-3 sm:mb-4 max-w-full h-auto"
                />
                <h4 className="font-bold text-sm sm:text-base mb-2">Mobile App Verification & Data Access</h4>
                <p className="text-xs sm:text-sm text-gray-600">Instant Data Retrieval: Access detailed product information, batch data, and safety certificates instantly through secure mobile apps.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 5: Aggregation and Case-Level */}
        <section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 sm:py-20 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 px-4" style={{ color: '#1C1C1C', fontFamily: 'Montserrat, sans-serif' }}>
              Aggregation and Case-Level Digital Links
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12 px-4">
              <div className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-gray-200">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-4">Individual Bread Items</h3>
                <div className="mb-4">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <img src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:0/2daa19a1-b366-432f-8d65-1f2ff7f1c906/2021295923267248128:00dc2c319b313da878497e815012e470:0_page_5_image_2.png" alt="Barcode" className="w-full h-auto" />
                    <img src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:0/269c88d9-6ca9-4cbf-9c43-290f7293443f/2021295923267248128:00dc2c319b313da878497e815012e470:0_page_5_image_3.png" alt="Barcode" className="w-full h-auto" />
                    <img src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:0/aa0db101-abae-4e69-8ea8-c38b0003df2c/2021295923267248128:00dc2c319b313da878497e815012e470:0_page_5_image_4.png" alt="Barcode" className="w-full h-auto" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm"><strong>GTIN:</strong> 01234567890128</p>
                <p className="text-xs sm:text-sm"><strong>Batch/Lot:</strong> LOT20240515</p>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-gray-200">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-4">Case Packaging</h3>
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:0/7b5abb30-7d86-4ac8-95be-816425421469/2021295923267248128:00dc2c319b313da878497e815012e470:0_page_5_image_16.png"
                  alt="Case Barcode"
                  className="mx-auto mb-4 max-w-full h-auto"
                />
                <p className="text-xs sm:text-sm font-semibold">ITF-14 / GS1-128 Barcode</p>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-gray-200">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-4">Pallet Aggregation</h3>
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:0/6955ad46-c977-4f4c-b938-55c886566143/2021295923267248128:00dc2c319b313da878497e815012e470:0_page_5_image_24.png"
                  alt="Pallet"
                  className="mx-auto mb-4 max-w-full h-auto"
                />
                <p className="text-xs sm:text-sm"><strong>SSCC:</strong> 277776661000000203</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 mx-4 shadow-lg border border-gray-200">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-4">GS1 Digital Link QR Code</h3>
              <p className="text-green-600 text-xs sm:text-sm text-center mb-4 sm:mb-6 break-all font-mono bg-green-50 p-3 rounded">
                https://info.link/01/01234567890128/0/LOT20240515/00/277776661000000203
              </p>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>• Dynamic access to production data</li>
                <li>• Safety certifications and origins</li>
                <li>• Real-time traceability information</li>
              </ul>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center px-4" style={{ color: '#1C304A', fontFamily: 'Montserrat, sans-serif' }}>
              Visual Process Spotlight: Case-Level Aggregation Scanning
            </h3>
          </div>
        </section>

        {/* Slide 6: Logistics Distribution */}
        <section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 sm:py-20"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 px-4" style={{ color: '#4A2100', fontFamily: 'Verdana, sans-serif' }}>
              Logistics: Wholesale Distribution to Restaurant
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12 px-4">
              <div className="bg-white bg-opacity-95 rounded-2xl p-4 sm:p-6 lg:p-8 text-center shadow-lg">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/d5cb4c4e-026a-494c-9270-ce7b9b5d4720/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_6_image_1.png"
                  alt="Warehouse"
                  className="mx-auto mb-4 max-w-full h-auto"
                />
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2">Distributor Warehouse</h3>
                <p className="mb-4 text-sm sm:text-base">GLN: 4444999400018</p>
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
                  <h4 className="font-bold mb-2 text-sm sm:text-base">Receiving Event</h4>
                  <p className="text-xs sm:text-sm">SSCC: 277776661000000203</p>
                  <p className="text-xs sm:text-sm">bizStep: receiving</p>
                  <p className="text-xs text-gray-600">2025-04-11T08:15:00Z</p>
                </div>
              </div>

              <div className="bg-white bg-opacity-95 rounded-2xl p-4 sm:p-6 lg:p-8 text-center shadow-lg">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/e5c57633-b419-438c-a7de-c07f54d6a112/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_6_image_13.png"
                  alt="Restaurant"
                  className="mx-auto mb-4 max-w-full h-auto"
                />
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2">Subway Restaurant</h3>
                <p className="mb-4 text-sm sm:text-base">GLN: 1234567890123</p>
                <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200">
                  <h4 className="font-bold mb-2 text-sm sm:text-base">Receiving Event</h4>
                  <p className="text-xs sm:text-sm">GTIN: 01234567890128</p>
                  <p className="text-xs sm:text-sm">Batch/Lot: ABC123</p>
                  <p className="text-xs text-gray-600">2025-04-11T08:15:00Z</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 px-4">Visual Process Spotlight</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8 px-4">
              <div className="text-center bg-white bg-opacity-95 rounded-xl p-4 shadow-lg">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/2d0eba37-c010-4673-beb9-b4e06cecd599/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_6_image_20.png"
                  alt="Scanner"
                  className="mx-auto mb-4 max-w-full h-auto"
                />
                <h4 className="font-bold mb-2 text-sm sm:text-base">Handheld 2D Scanner Capture</h4>
                <p className="text-xs sm:text-sm text-gray-600">One-Step-Back/One-Step-Forward Traceability</p>
              </div>
              
              <div className="text-center bg-white bg-opacity-95 rounded-xl p-4 shadow-lg">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/3c815aec-613f-4e29-b82e-164823613fe4/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_6_image_26.png"
                  alt="Mobile"
                  className="mx-auto mb-4 max-w-full h-auto"
                />
                <h4 className="font-bold mb-2 text-sm sm:text-base">Mobile App Verification & Data Access</h4>
                <p className="text-xs sm:text-sm text-gray-600">Instant Data Retrieval</p>
              </div>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-center px-4 bg-white bg-opacity-90 py-4 rounded-lg mx-4">
              One Step Back ← EPCIS Events → One Step Forward
            </p>
          </div>
        </section>

        {/* Slide 7: Sandwich Assembly */}
        <section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 sm:py-20 bg-gradient-to-b from-orange-50 to-white"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 px-4 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Sandwich Assembly: Final Product Transformation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12 px-4">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-center mb-4">Input</h3>
                <div className="space-y-4">
                  <img 
                    src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/f6eeb8d2-d295-48e6-9d19-7e9ed20f11d7/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_7_image_1.png"
                    alt="Bread"
                    className="mx-auto max-w-full h-auto"
                  />
                  <img 
                    src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/c2adc978-d384-4a58-95e1-735407a1a2b3/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_7_image_3.png"
                    alt="Vegetables"
                    className="mx-auto max-w-full h-auto"
                  />
                  <img 
                    src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/735407a1a2b3/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_7_image_5.png"
                    alt="Meat"
                    className="mx-auto max-w-full h-auto"
                  />
                </div>
                <p className="text-center mt-4 text-xs sm:text-sm">Ingredient GTIN + Batch/Lot</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-4 sm:p-6 flex flex-col justify-center shadow-lg">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/6904f287-8dea-432b-91f4-8a1303b8f6ee/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_7_image_7.png"
                  alt="Process"
                  className="mx-auto mb-4 max-w-full h-auto"
                />
                <h3 className="text-xl sm:text-2xl font-bold text-center mb-2">Transformation Event</h3>
                <p className="text-center text-base sm:text-lg">bizStep: commissioning</p>
                <p className="text-center text-xs sm:text-sm mt-4">one-step-back/one-step-forward traceability visibility</p>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-center mb-4">Final Product</h3>
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/4eee1872-2d40-4273-abd4-c20dc7967dfd/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_7_image_17.png"
                  alt="Sandwich"
                  className="mx-auto mb-4 max-w-full h-auto"
                />
                <div className="space-y-2 text-xs sm:text-sm">
                  <p><strong>SGTIN:</strong> 12345678901234</p>
                  <p><strong>Batch/Lot:</strong> LOT20250401</p>
                  <p><strong>Serial Number:</strong> 0000123456</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 text-center mx-4 shadow-lg border border-gray-200">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4">Complete Traceability: All Ingredients Linked to Final Product</h3>
            </div>
          </div>
        </section>

        {/* Slide 8: AI-Enhanced Safety */}
        <section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 sm:py-20 bg-gradient-to-b from-green-50 to-white"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 px-4" style={{ color: '#28A348', fontFamily: 'Montserrat, sans-serif' }}>
              AI-Enhanced Food Safety: PPE Compliance Monitoring
            </h2>
            <p className="text-base sm:text-lg lg:text-2xl font-bold text-center mb-8 sm:mb-12 px-4" style={{ fontFamily: 'Franklin Gothic Medium, sans-serif' }}>
              GTRACK AI-Powered Safety: Real-time PPE Monitoring Linked to Product Traceability
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12 px-4">
              <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 text-center shadow-lg border border-gray-200">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/7bc724c2-7417-4caf-ad98-32f85f01fbaa/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_8_image_1.png"
                  alt="Chef"
                  className="mx-auto mb-2 sm:mb-3 max-w-full h-auto"
                />
                <p className="font-bold text-xs sm:text-sm lg:text-base">Chef</p>
              </div>

              <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 text-center shadow-lg border border-gray-200">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/8884409f-4941-4dcd-828e-c23e83e95307/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_8_image_4.png"
                  alt="AI Detection"
                  className="mx-auto mb-2 sm:mb-3 max-w-full h-auto"
                />
                <p className="font-bold text-xs sm:text-sm">AI Camera Detection & PPE Verification</p>
                <p className="text-xs">(Gloves, Hairnet, Uniform)</p>
              </div>

              <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 text-center shadow-lg border border-gray-200">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/9aa408a2-f51e-41dd-9579-fcb5c3b5727d/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_8_image_8.png"
                  alt="EPCIS"
                  className="mx-auto mb-2 sm:mb-3 max-w-full h-auto"
                />
                <p className="font-bold text-xs sm:text-sm lg:text-base">EPCIS 2.0 Integration</p>
              </div>

              <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 text-center shadow-lg border border-gray-200">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/2c04a22c-c31c-425f-89bf-2555861644e3/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_8_image_11.png"
                  alt="Verified"
                  className="mx-auto mb-2 sm:mb-3 max-w-full h-auto"
                />
                <p className="font-bold text-xs sm:text-sm lg:text-base">Compliance Verified</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 mx-4 shadow-lg border border-gray-200">
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Visual Process Spotlight</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                <div>
                  <img 
                    src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/36468ae9-0fb9-4436-a8c8-a1449244ee67/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_8_image_14.png"
                    alt="AI System"
                    className="mx-auto mb-4 max-w-full h-auto rounded-lg"
                  />
                  <p className="text-xs sm:text-sm text-gray-600">AI vision system automatically detects proper gloves, hairnets, and uniforms for real-time compliance monitoring linked to product batches.</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 sm:p-6 border border-blue-200">
                  <h4 className="font-bold mb-3 text-sm sm:text-base">EPCIS Transformation Event</h4>
                  <p className="text-xs sm:text-sm mb-2">bizStep: inspecting</p>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <p><strong>SGTIN:</strong> 12345678901234</p>
                    <p><strong>Batch/Lot:</strong> LOT20250401</p>
                    <p><strong>Serial Number:</strong> 0000123456</p>
                    <p><strong>PPE Status:</strong> Compliant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 9: Consumer Transparency */}
        <section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 sm:py-20 bg-gradient-to-b from-amber-50 to-white"
        >
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-16 px-4" style={{ color: '#8B4513', fontFamily: 'Arial, sans-serif' }}>
              Consumer Transparency via GTRACK Digital Link
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 px-4">
              <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-200">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/758e24fb-08c5-46d9-9468-1ddf97c4df26/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_9_image_1.png"
                  alt="Digital Link Flow"
                  className="w-full mb-4 sm:mb-6 max-w-full h-auto"
                />
                <div className="bg-blue-600 text-white rounded-lg p-4 sm:p-6 text-center">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3">Global Digital Link URI</h3>
                  <p className="text-xs sm:text-sm font-mono break-all bg-white text-gray-800 p-2 rounded">
                    https://info.link/01/12345678901234/10/LOT20250401/21/0000123456
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-center shadow-lg border border-gray-200">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/e3b5c0e2-26c2-44fe-803c-29e6f90e4157/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_9_image_5.png"
                  alt="QR Code"
                  className="mx-auto mb-4 sm:mb-6 max-w-full h-auto"
                  style={{ maxWidth: '200px' }}
                />
                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-center mb-3 sm:mb-4">Scan for Instant Access</h4>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <li>✓ Product origin and journey</li>
                  <li>✓ Safety certifications</li>
                  <li>✓ Nutritional information</li>
                  <li>✓ Allergen warnings</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 bg-gradient-to-r from-amber-800 to-amber-900 text-white rounded-2xl p-4 sm:p-6 lg:p-8 text-center mx-4 shadow-lg">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                Real-time Access for Enhanced Consumer Trust & Compliance
              </h3>
            </div>
          </div>
        </section>

        {/* Slide 10: Visualizing One Step Back, One Step Forward */}
        <section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-16 px-4" style={{ color: '#8B4513', fontFamily: 'Arial, sans-serif' }}>
              Visualizing One Step Back, One Step Forward
            </h2>

            <div className="mb-8 sm:mb-12 px-4">
              <img 
                src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:5/46fe2fb9-3062-4f7e-8724-2212567535ab/2021295923267248128:00dc2c319b313da878497e815012e470:5_page_10_image_1.png"
                alt="Traceability Flow"
                className="w-full mx-auto max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 text-center mx-4 shadow-lg border border-gray-200">
              <p className="text-lg sm:text-xl lg:text-2xl font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                Each participant maintains records of immediate source and subsequent recipient
              </p>
            </div>
          </div>
        </section>

        {/* Slide 11: Benefits */}
        <section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 sm:py-20 bg-gradient-to-b from-amber-50 to-white"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 px-4" style={{ color: '#8B4513', fontFamily: 'Arial, sans-serif' }}>
              Benefits: Safety, Compliance, and Brand Trust
            </h2>

            <div className="mb-8 sm:mb-12 px-4">
              <img 
                src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/2af19f07-03fa-4783-b255-aeadff3378e9/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_11_image_1.png"
                alt="Benefits Diagram"
                className="w-full mx-auto max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 text-center mb-6 sm:mb-8 mx-4 shadow-lg border border-gray-200">
              <p className="text-lg sm:text-xl lg:text-2xl font-bold" style={{ fontFamily: 'Verdana, sans-serif' }}>
                GS1 EPCIS v2.0 and Digital Link transform traceability from compliance requirement to competitive advantage
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-700 to-green-800 text-white rounded-2xl p-4 sm:p-6 text-center mx-4 shadow-lg">
              <p className="text-lg sm:text-xl lg:text-2xl font-bold" style={{ fontFamily: 'Verdana, sans-serif' }}>
                Digitally traceable supply chains enhance safety, sustainability, and brand trust
              </p>
            </div>
          </div>
        </section>

        {/* Slide 12: Rapid Recall Response */}
        <section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 sm:py-20 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-16 px-4" style={{ color: '#1C1C1C', fontFamily: 'Poppins, sans-serif' }}>
              Rapid Recall Response & Traceability Report
            </h2>

            <div className="mb-8 sm:mb-12 px-4">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Product Journey</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                {[
                  { img: "https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/96391785-be18-4617-b4ab-0396878bef12/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_12_image_2.png", label: "Supplier" },
                  { img: "https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/4f5f8bfe-489c-451a-8052-5ae7359f8ddb/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_12_image_6.png", label: "Processing" },
                  { img: "https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/f3a1e56a-37de-43f8-88d8-b8ad012527c7/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_12_image_7.png", label: "Distribution" },
                  { img: "https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/46bb02a5-b000-4682-8bae-4a3f9ae1ae2c/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_12_image_8.png", label: "Retailer" },
                  { img: "https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/8b7b1d4f-db98-4087-a3cb-6b7e576772a1/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_12_image_14.png", label: "Consumer" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 text-center shadow-md border border-gray-200">
                    <img src={item.img} alt={item.label} className="mx-auto mb-2 sm:mb-3 max-w-full h-auto" />
                    <p className="font-bold text-xs sm:text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8 sm:mb-12 px-4">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Document Links Display</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200">
                  <img 
                    src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/a620091f-2400-4af7-97c2-1bdc06b70817/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_12_image_17.png"
                    alt="Certificate"
                    className="mx-auto mb-4 max-w-full h-auto"
                  />
                  <h4 className="font-bold text-base sm:text-lg mb-2">Food Safety Certificate</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Certificate ID: 12345</p>
                  <p className="text-xs sm:text-sm text-gray-600">Expiry: 12/31/2024</p>
                </div>
                <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200">
                  <img 
                    src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/8af2a256-93ef-4ec4-b471-7db8052c77aa/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_12_image_21.png"
                    alt="Restaurant Certificate"
                    className="mx-auto mb-4 max-w-full h-auto"
                  />
                  <h4 className="font-bold text-base sm:text-lg mb-2">Restaurant Certificate</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Certificate ID: 67890</p>
                  <p className="text-xs sm:text-sm text-gray-600">Expiry: 11/30/2024</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-10 mx-4 shadow-lg border border-gray-200">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Audit Trail Timeline
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {[
                  { date: '10/01/2024', time: '09:00 AM', event: 'Harvested', location: 'Farm A', icon: 'https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/86031bd0-bd3c-4577-aa86-de3716186b7f/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_12_image_26.png' },
                  { date: '10/02/2024', time: '10:30 AM', event: 'Processed & Packed', location: 'Facility B', icon: 'https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/b9f4afdd-9caa-4347-b840-dbbc5f4c33af/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_12_image_32_inp_img.png' },
                  { date: '10/03/2024', time: '02:15 PM', event: 'Shipped', carrier: 'Logistics X', icon: 'https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/b9f4afdd-9caa-4347-b840-dbbc5f4c33af/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_12_image_32_inp_img.png' },
                  { date: '10/04/2024', time: '11:00 AM', event: 'Received by Retailer', location: 'Store Y', icon: 'https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/247d1cc0-b6ff-4f16-96d6-790b446e5fa4/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_12_image_42.png' },
                  { date: '10/05/2024', time: '01:45 PM', event: 'Purchased by Consumer', transaction: 'POS Z', icon: 'https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/ca57af59-cfd0-4474-b2ae-21dc2bc2369e/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_12_image_44.png' }
                ].map((event, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start border-l-4 border-blue-600 pl-4 sm:pl-6 py-3 sm:py-4 bg-gradient-to-r from-blue-50 to-transparent rounded-r-lg">
                    <img src={event.icon} alt="icon" className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-0 sm:mr-4" />
                    <div className="flex-shrink-0 sm:w-32 mb-2 sm:mb-0">
                      <p className="font-bold text-sm sm:text-base lg:text-lg">{event.date}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{event.time}</p>
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-sm sm:text-base lg:text-lg mb-1">{event.event}</p>
                      {event.location && <p className="text-xs sm:text-sm text-gray-600">Location: {event.location}</p>}
                      {event.carrier && <p className="text-xs sm:text-sm text-gray-600">Carrier: {event.carrier}</p>}
                      {event.transaction && <p className="text-xs sm:text-sm text-gray-600">Transaction: {event.transaction}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Slide 13: Geographic Recall Impact Map */}
        <section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-16 px-4 text-center" style={{ color: '#2F1800', fontFamily: 'Poppins, sans-serif' }}>
              Geographic Recall Impact Map - Saudi Arabia
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 px-4">
              <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/dbfed3b2-6f7f-431b-bb06-0dd9599517e7/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_13_image_1.png"
                  alt="Saudi Arabia Map"
                  className="w-full h-auto rounded-lg"
                />
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: '#2F1800', fontFamily: 'Poppins, sans-serif' }}>
                    Legend
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-center">
                      <img src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/70122152-010b-44a5-b5b7-8a7953e1f65e/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_13_image_3.png" alt="Suppliers" className="w-8 h-8 sm:w-10 sm:h-10 mr-3" />
                      <span className="text-sm sm:text-base lg:text-lg">Suppliers (2)</span>
                    </li>
                    <li className="flex items-center">
                      <img src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/a1ef0730-3c72-4594-869e-ae8a283092d2/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_13_image_5.png" alt="Distributors" className="w-8 h-8 sm:w-10 sm:h-10 mr-3" />
                      <span className="text-sm sm:text-base lg:text-lg">Distributors (3)</span>
                    </li>
                    <li className="flex items-center">
                      <img src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/fd0d79a5-a50a-4f17-ac95-95313bb7437e/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_13_image_7.png" alt="Retailers" className="w-8 h-8 sm:w-10 sm:h-10 mr-3" />
                      <span className="text-sm sm:text-base lg:text-lg">Retailers (5)</span>
                    </li>
                    <li className="flex items-center">
                      <img src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/8049ff8a-8784-4539-b52f-b74d2d49af12/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_13_image_9.png" alt="Restaurants" className="w-8 h-8 sm:w-10 sm:h-10 mr-3" />
                      <span className="text-sm sm:text-base lg:text-lg">Restaurants (5)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: '#2F1800', fontFamily: 'Poppins, sans-serif' }}>
                    Impact Summary
                  </h3>
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base lg:text-lg">
                    <li><strong>Total Affected Locations:</strong> 15</li>
                    <li><strong>Suppliers:</strong> 2</li>
                    <li><strong>Distributors:</strong> 3</li>
                    <li><strong>Retailers:</strong> 5</li>
                    <li><strong>Restaurants:</strong> 5</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 14: Regulator Dashboard */}
        <section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 sm:py-20 bg-gradient-to-b from-blue-50 to-white"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-16 px-4" style={{ color: '#192833', fontFamily: 'Hubot Sans, sans-serif' }}>
              Regulator Dashboard: Recall Response Metrics
            </h2>

            <div className="mb-8 sm:mb-12 px-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <img 
                  src="https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/0c6faadb-ef09-49eb-9f61-948710c261c9/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_14_image_1.png"
                  alt="Dashboard Chart"
                  className="w-full max-w-5xl mx-auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 px-4">
              {[
                { img: "https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/7dd8900c-b60d-4c51-b90e-fc30cade7be5/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_14_image_2.png", label: "Total Units Recalled", value: "50,000", color: "text-gray-900" },
                { img: "https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/851d7404-bd73-464d-bc0e-c3424c83e775/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_14_image_6.png", label: "Compliance Status", value: "98%", subtext: "✔ Fully Compliant", color: "text-green-600" },
                { img: "https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/0011e1f5-afc6-4211-beed-95cd0db511ca/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_14_image_11.png", label: "Response Time", value: "12h 45m", subtext: "Below Target", color: "text-green-600" },
                { img: "https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/80332719-da6e-48fb-8c91-77e870cc4e41/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_14_image_16.png", label: "Affected Locations", value: "35", subtext: "Sites Managed", color: "text-green-600" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 text-center shadow-lg border border-gray-200">
                  <img src={item.img} alt={item.label} className="mx-auto mb-3 sm:mb-4 max-w-full h-auto" />
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 uppercase tracking-wide">{item.label}</p>
                  <p className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 ${item.color}`} style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
                    {item.value}
                  </p>
                  {item.subtext && <p className="text-xs sm:text-sm text-gray-700">{item.subtext}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Slide 15: Prerequisites for Implementation */}
        <section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 sm:py-20 bg-gradient-to-b from-green-50 to-white"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-6 px-4" style={{ color: '#192833', fontFamily: 'Poppins, sans-serif' }}>
              Prerequisites for Implementation: Roadmap for Success
            </h2>
            <p className="text-base sm:text-lg lg:text-2xl text-gray-600 text-center mb-8 sm:mb-16 px-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Comprehensive solutions for modern supply chain challenges
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 px-4">
              {[
                { 
                  icon: "https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/8ece93ac-85ea-4fa8-a6a5-8c9d234b0468/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_15_image_1.png",
                  title: "GS1 Foundation",
                  items: ["Obtaining International Barcodes (GTIN, UPC, EAN)", "GLNs for locations", "GTINs for products"]
                },
                {
                  icon: "https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/9f2b20d4-cc77-4a00-ae55-a1dc67b125c8/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_15_image_7.png",
                  title: "Technical Infrastructure",
                  items: ["EPCIS 2.0-compliant platforms", "2D scanning hardware (optional)", "IoT/AI integration capabilities", "** GST GTRACK Platform ***"]
                },
                {
                  icon: "https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/39de5e46-73e2-4d11-ae84-11604afe359f/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_15_image_13.png",
                  title: "Governance & Regulatory",
                  items: ["Data sharing agreements", "Compliance with local food safety laws", "Standardized reporting protocols"]
                },
                {
                  icon: "https://picture-search.skywork.ai/aippt/image/sheet/2021295923267248128:00dc2c319b313da878497e815012e470:10/2dba8368-1887-47d4-919f-1f8da43ab548/2021295923267248128:00dc2c319b313da878497e815012e470:10_page_15_image_19.png",
                  title: "Organizational Readiness",
                  items: ["Staff training programs", "Partnership alignment across supply chain", "Pilot project scoping"]
                }
              ].map((section, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border-2 border-green-200 hover:border-green-400 transition-colors">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <img src={section.icon} alt={section.title} className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mr-3 sm:mr-4" />
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {section.title}
                    </h3>
                  </div>
                  <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className={item.includes("***") ? "font-bold text-green-700" : ""}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </WebsiteLayout>
  );
};

export default TraceabilityPresentation;