import React from "react";
import MainLayout from "../../layout/MainLayout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaMoneyBill,
  FaPercent,
  FaEnvelope,
  FaBarcode,
  FaCreditCard,
  FaUniversity,
  FaCog,
} from "react-icons/fa";

function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMainSettingsPage = location.pathname === "/settings";

  const settingsCards = [
    {
      icon: <FaBarcode size={24} className="text-navy-600" />,
      title: "Barcode",
      path: "barcode",
      description: "Manage barcode inventory and sales",
    },
    {
      icon: <FaMoneyBill size={24} className="text-navy-600" />,
      title: "Currency",
      path: "currency",
      description: "Configure site currency symbology",
    },
    {
      icon: <FaPercent size={24} className="text-navy-600" />,
      title: "Tax",
      path: "tax",
      description: "Configure tax rate, type and implementation",
    },
    {
      icon: <FaCreditCard size={24} className="text-navy-600" />,
      title: "Payment Methods",
      path: "payment-methods",
      description: "Configure available payment options",
    },
    {
      icon: <FaUniversity size={24} className="text-navy-600" />,
      title: "Banks",
      path: "banks",
      description: "Manage bank account settings",
    },
    {
      icon: <FaEnvelope size={24} className="text-navy-600" />,
      title: "Email",
      path: "email",
      description: "Configure outgoing email service preferences",
    },
  ];

  return (
    <MainLayout>
      <div className="p-6">
        {isMainSettingsPage ? (
          <>
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FaCog className="text-navy-600" /> App Settings
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {settingsCards.map((card, index) => (
                <div
                  key={index}
                  onClick={() => navigate(card.path)}
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-navy-600 hover:border"
                >
                  <div className="flex flex-col items-center text-center">
                    {card.icon}
                    <h2 className="text-xl font-semibold mt-4 mb-2 text-navy-700">
                      {card.title}
                    </h2>
                    <p className="text-gray-600">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </MainLayout>
  );
}

export default Settings;