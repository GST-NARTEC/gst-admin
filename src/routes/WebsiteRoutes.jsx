import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Website/home/Home";
import TemplateRoutes from "../layout/WebsiteLayouts/TemplateRoutes";
import UserGuideManual from "../components/Website/userGuideManual/UserGuideManual";

function WebsiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-guide-manual" element={<UserGuideManual />} />
      <Route path="/*" element={<TemplateRoutes />} />
    </Routes>
  );
}

export default WebsiteRoutes;
