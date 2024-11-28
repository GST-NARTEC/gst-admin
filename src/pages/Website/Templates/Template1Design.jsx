import React from "react";

function Template1Design() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-quaternary/50" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80")',
          }}
        />
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-white mb-4">GS1 GDSN</h1>
          <p className="text-2xl text-gray-200 max-w-2xl">
            The GS1 Global Data Synchronization Network (GDSN) is a GS1
            communication standard.
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                <p className="text-gray-700 leading-relaxed">
                  Inconsistencies in product information are the most significant deterrents 
                  to efficient supply-chain management. If you closely follow supply-chain problems, 
                  inconsistent, inaccurate data is invariably the root cause.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80"
                alt="Network Infrastructure"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80"
                alt="Data Center"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  Inconsistencies in product information are the most significant deterrents 
                  to efficient supply-chain management. If you closely follow supply-chain problems, 
                  inconsistent, inaccurate data is invariably the root cause.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Template1Design;
