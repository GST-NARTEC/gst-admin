import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Website/home/Home";
import TemplateRoutes from "../layout/WebsiteLayouts/TemplateRoutes";

function WebsiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<TemplateRoutes />} />
    </Routes>
  );
}

export default WebsiteRoutes;
