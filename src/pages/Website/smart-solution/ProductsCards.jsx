import React from "react";
import { useNavigate } from "react-router-dom";

function ProductsCards() {
  const products = [
    {
      id: 1,
      name: "White Meat Tuna Chunks in Water",
      image:
        "https://i5.walmartimages.com/seo/Heinz-All-Natural-Distilled-White-Vinegar-5-Acidity-32-fl-oz-Bottle_2b926e71-7449-450d-9242-87299de37520.222165f61e9c180f439a504f0de18e02.jpeg", // Placeholder image
    },
    {
      id: 2,
      name: "White Meat Tuna Chunks in Water",
      image:
        "https://i5.walmartimages.com/seo/Heinz-All-Natural-Distilled-White-Vinegar-5-Acidity-32-fl-oz-Bottle_2b926e71-7449-450d-9242-87299de37520.222165f61e9c180f439a504f0de18e02.jpeg", // Placeholder image
    },
    {
      id: 3,
      name: "White Meat Tuna Chunks in Water",
      image:
        "https://i5.walmartimages.com/seo/Heinz-All-Natural-Distilled-White-Vinegar-5-Acidity-32-fl-oz-Bottle_2b926e71-7449-450d-9242-87299de37520.222165f61e9c180f439a504f0de18e02.jpeg", // Placeholder image
    },
    {
      id: 4,
      name: "White Meat Tuna Chunks in Water",
      image:
        "https://i5.walmartimages.com/seo/Heinz-All-Natural-Distilled-White-Vinegar-5-Acidity-32-fl-oz-Bottle_2b926e71-7449-450d-9242-87299de37520.222165f61e9c180f439a504f0de18e02.jpeg", // Placeholder image
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-dubai">
            Recently Added Products
          </h2>
          <button className="bg-primary hover:bg-navy-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            View all products
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-gray-100"
            >
              {/* Product Image Section */}
              <div className="relative p-6 bg-gray-50 h-64 flex items-center justify-center">
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className=" object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Details */}
              <div className="p-6 text-center">
                <h3 className="text-gray-700 font-medium mb-4 text-sm leading-relaxed">
                  {product.name}
                </h3>

                {/* See Details Button */}
                <button className="bg-primary hover:bg-navy-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform group-hover:scale-105 shadow-md text-sm">
                  See details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsCards;
