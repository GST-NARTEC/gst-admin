import React from "react";
import { Card } from "@nextui-org/react";
import MainLayout from "../../layout/AdminLayouts/MainLayout";
import {
  FaQrcode,
  FaBarcode,
  FaDollarSign,
  FaShoppingCart,
  FaChartLine,
  FaUsers,
  FaDownload,
  FaHistory,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectCurrencySymbol } from "../../store/slice/currencySlice";

function Dashboard() {
  const currencySymbol = useSelector(selectCurrencySymbol);
  const stats = [
    {
      title: "Total Revenue",
      value: `${currencySymbol}45,678`,
      change: "+8.2%",
      icon: <FaDollarSign />,
      color: "green",
    },
    {
      title: "Total Orders",
      value: "834",
      change: "+12.5%",
      icon: <FaShoppingCart />,
      color: "blue",
    },
    {
      title: "Barcodes Generated",
      value: "2,543",
      change: "+15.3%",
      icon: <FaBarcode />,
      color: "purple",
    },
    {
      title: "QR Codes Generated",
      value: "1,892",
      change: "+10.2%",
      icon: <FaQrcode />,
      color: "indigo",
    },
    {
      title: "Active Users",
      value: "456",
      change: "+5.7%",
      icon: <FaUsers />,
      color: "pink",
    },
    {
      title: "Downloads",
      value: "4,234",
      change: "+18.9%",
      icon: <FaDownload />,
      color: "cyan",
    },
    {
      title: "Monthly Growth",
      value: "+22.4%",
      change: "+3.1%",
      icon: <FaChartLine />,
      color: "yellow",
    },
    {
      title: "Recent Generations",
      value: "156",
      change: "Last 24h",
      icon: <FaHistory />,
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
      teal: "bg-teal-100 text-teal-600",
      cyan: "bg-cyan-100 text-cyan-600",
    };
    return colors[color];
  };

  return (
    <MainLayout>
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
                    className={`rounded-full p-3 ${getColorClasses(
                      stat.color
                    )}`}
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
    </MainLayout>
  );
}

export default Dashboard;
