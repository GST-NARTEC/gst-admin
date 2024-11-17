import React from "react";
import { Card } from "@nextui-org/react";
import {
  FaUsers,
  FaDollarSign,
  FaShoppingCart,
  FaChartLine,
  FaClock,
  FaStar,
  FaHeart,
  FaComments,
} from "react-icons/fa";

function Dashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12.5%",
      icon: <FaUsers />,
      color: "blue",
    },
    {
      title: "Total Revenue",
      value: "$45,678",
      change: "+8.2%",
      icon: <FaDollarSign />,
      color: "green",
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "-3.1%",
      icon: <FaShoppingCart />,
      color: "purple",
      isNegative: true,
    },
    {
      title: "Growth Rate",
      value: "+15.3%",
      change: "+2.2%",
      icon: <FaChartLine />,
      color: "yellow",
    },
    {
      title: "Active Time",
      value: "5.2hrs",
      change: "+0.8hrs",
      icon: <FaClock />,
      color: "pink",
    },
    {
      title: "Reviews",
      value: "4.8/5",
      change: "+0.3",
      icon: <FaStar />,
      color: "indigo",
    },
    {
      title: "Total Likes",
      value: "8.4K",
      change: "+1.2K",
      icon: <FaHeart />,
      color: "red",
    },
    {
      title: "Comments",
      value: "921",
      change: "+18",
      icon: <FaComments />,
      color: "orange",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      yellow: "bg-yellow-100 text-yellow-600",
      pink: "bg-pink-100 text-pink-600",
      indigo: "bg-indigo-100 text-indigo-600",
      red: "bg-red-100 text-red-600",
      orange: "bg-orange-100 text-orange-600",
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Admin</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none">
              <div className="flex items-center p-6">
                <div
                  className={`rounded-full p-3 ${getColorClasses(stat.color)}`}
                >
                  <div className="text-xl">{stat.icon}</div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <span
                      className={`ml-2 text-sm ${
                        stat.isNegative ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
