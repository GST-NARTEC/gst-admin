import React from "react";
import { useNavigate } from "react-router-dom";

function StatsCards() {
  const statsData = [
    {
      id: 1,
      number: "1,700,000",
      title: "Halal Products",
      icon: "🛒", // Placeholder - will be replaced with actual image
      bgColor: "bg-gradient-to-br from-primary to-navy-600",
    },
    {
      id: 2,
      number: "47",
      title: "Countries",
      icon: "🌍", // Placeholder - will be replaced with actual image
      bgColor: "bg-gradient-to-br from-secondary to-tertiary",
    },
    {
      id: 3,
      number: "85",
      title: "Certification Bodies",
      icon: "🕌", // Placeholder - will be replaced with actual image
      bgColor: "bg-gradient-to-br from-tertiary to-navy-700",
    },
    {
      id: 4,
      number: "500,000",
      title: "Downloads",
      icon: "📱", // Placeholder - will be replaced with actual image
      bgColor: "bg-gradient-to-br from-navy-400 to-primary",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Image/Icon Section */}
              <div
                className={`${stat.bgColor} h-48 flex items-center justify-center relative`}
              >
                {/* Placeholder for actual image */}
                <div className="w-32 h-32 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-6xl">{stat.icon}</span>
                </div>
                {/* You can replace this div with actual image later */}
                {/* <img src="/path/to/actual/image.png" alt={stat.title} className="w-32 h-32 object-contain" /> */}
              </div>

              {/* Content Section */}
              <div className="p-6 text-center">
                <h3 className="text-4xl font-bold text-primary mb-2 font-dubai">
                  {stat.number}
                </h3>
                <p className="text-gray-600 text-lg font-medium mb-4">
                  {stat.title}
                </p>

                {/* Explore Button */}
                <button
                  className="bg-primary hover:bg-navy-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform group-hover:scale-105 shadow-md"
                >
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
