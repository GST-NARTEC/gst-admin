import React from "react";
import MainLayout from "../../../layout/AdminLayouts/MainLayout";
import { Tabs, Tab, Button } from "@nextui-org/react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { FiSettings, FiArrowLeft } from "react-icons/fi";
import { IoImagesOutline } from "react-icons/io5";

function PageTemplates() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();

  const handleTabChange = (key) => {
    navigate(`/admin/gstsa1/page-templates/${key}`);
  };

  return (
    <MainLayout>
      <div className="flex w-full flex-col gap-4 p-6">
        {/* Header Section with Back Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button
              isIconOnly
              variant="light"
              className="text-navy-600 hover:text-navy-700"
              onClick={() => navigate("/admin/gstsa1/pages")}
            >
              <FiArrowLeft className="text-xl" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-navy-700">Page Templates</h1>
              <p className="text-sm text-gray-500">Manage your website templates and configurations</p>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <Tabs
            aria-label="Page Templates Options"
            color="primary"
            variant="underlined"
            selectedKey={currentPath}
            onSelectionChange={handleTabChange}
            classNames={{
              base: "w-full",
              tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider px-6 bg-white",
              cursor: "w-full bg-navy-600",
              tab: "max-w-fit px-0 h-14 hover:text-navy-600",
              tabContent: "group-data-[selected=true]:text-navy-600 text-gray-500 font-medium",
            }}
          >
            <Tab
              key="page-setup"
              title={
                <div className="flex items-center space-x-2 py-2">
                  <FiSettings className="text-lg" />
                  <span>Page Setup</span>
                </div>
              }
            />
            <Tab
              key="templates"
              title={
                <div className="flex items-center space-x-2 py-2">
                  <IoImagesOutline className="text-lg" />
                  <span>Templates</span>
                </div>
              }
            />
          </Tabs>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}

export default PageTemplates;
