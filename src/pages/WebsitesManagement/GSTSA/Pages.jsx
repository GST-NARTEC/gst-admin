import React from "react";
import MainLayout from "../../../layout/AdminLayouts/MainLayout";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaNewspaper,
  FaHandshake,
  FaUserTie,
  FaCog,
  FaQuestionCircle,
  FaFileAlt,
} from "react-icons/fa";
import { Outlet } from "react-router-dom";

function Pages() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMainPage = location.pathname === "/admin/gstsa1/pages";

  const pages = [
    {
      title: "Home Page",
      description: "Manage your website's main landing page content",
      icon: <FaHome className="text-4xl text-primary" />,
      path: "/admin/gstsa1/pages/home",
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
    },
    {
      title: "Page Templates",
      description: "Manage your website's page templates",
      icon: <FaFileAlt className="text-4xl text-teal-500" />,
      path: "/admin/gstsa1/page-templates",
      color:
        "bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-cyan-500/10 hover:from-teal-500/20 hover:via-emerald-500/20 hover:to-cyan-500/20 border-l-4 border-teal-500 transition-all duration-300 shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)]",
    },
    // {
    //   title: "About Us",
    //   description: "Edit company information and history",
    //   icon: <FaInfoCircle className="text-4xl text-success" />,
    //   //   path: "/admin/gstsa1/pages/about",
    //   color: "bg-gradient-to-br from-green-50 to-green-100",
    // },
    // {
    //   title: "Contact Us",
    //   description: "Update contact information and form settings",
    //   icon: <FaPhone className="text-4xl text-warning" />,
    //   //   path: "/admin/gstsa1/pages/contact",
    //   color: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    // },
    // {
    //   title: "News & Updates",
    //   description: "Manage news articles and announcements",
    //   icon: <FaNewspaper className="text-4xl text-danger" />,
    //   //   path: "/admin/gstsa1/pages/news",
    //   color: "bg-gradient-to-br from-red-50 to-red-100",
    // },
    // {
    //   title: "Services",
    //   description: "Edit service offerings and descriptions",
    //   icon: <FaHandshake className="text-4xl text-secondary" />,
    //   //   path: "/admin/gstsa1/pages/services",
    //   color: "bg-gradient-to-br from-purple-50 to-purple-100",
    // },
    // {
    //   title: "Team",
    //   description: "Manage team members and leadership",
    //   icon: <FaUserTie className="text-4xl text-primary" />,
    //   //   path: "/admin/gstsa1/pages/team",
    //   color: "bg-gradient-to-br from-indigo-50 to-indigo-100",
    // },
    // {
    //   title: "FAQ",
    //   description: "Edit frequently asked questions",
    //   icon: <FaQuestionCircle className="text-4xl text-success" />,
    //   //   path: "/admin/gstsa1/pages/faq",
    //   color: "bg-gradient-to-br from-teal-50 to-teal-100",
    // },
    // {
    //   title: "Settings",
    //   description: "Configure general website settings",
    //   icon: <FaCog className="text-4xl text-warning" />,
    //   //   path: "/admin/gstsa1/pages/settings",
    //   color: "bg-gradient-to-br from-orange-50 to-orange-100",
    // },
  ];

  return (
    <MainLayout>
      {isMainPage ? (
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-navy-700 mb-2">
              Website Pages Management
            </h1>
            <p className="text-gray-600">
              Select a page to manage its content and settings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pages.map((page) => (
              <Card
                key={page.title}
                isPressable
                onPress={() => navigate(page.path)}
                className={`border-none shadow-md hover:shadow-xl transition-shadow ${page.color}`}
              >
                <CardBody className="overflow-visible p-6">
                  <div className="flex flex-col items-center gap-4">
                    {page.icon}
                    <div className="text-center">
                      <h2 className="text-xl font-semibold text-navy-700 mb-2">
                        {page.title}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {page.description}
                      </p>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="justify-center pb-6">
                  <Button
                    onClick={() => navigate(page.path)}
                    className="bg-navy-600 text-white shadow-lg hover:bg-navy-700"
                    size="sm"
                    endContent={
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    }
                  >
                    Manage Content
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </MainLayout>
  );
}

export default Pages;
