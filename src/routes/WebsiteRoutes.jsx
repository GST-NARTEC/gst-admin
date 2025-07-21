import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Website/home/Home";
import TemplateRoutes from "../layout/WebsiteLayouts/TemplateRoutes";
import UserGuideManual from "../components/Website/userGuideManual/UserGuideManual";
import SmartSolutionDetail from "../pages/Website/smart-solution/SmartSolutionDetail";
import CaseStudy from "../pages/Website/case-studies/CaseStudy";
import CaseStudyOneDesing from "../pages/Website/Templates/CaseStudyOneDesing";
import CaseStudyTwoDesign from "../pages/Website/Templates/CaseStudyTwoDesign";

function WebsiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-guide-manual" element={<UserGuideManual />} />
      <Route path="/verify-halal" element={<SmartSolutionDetail />} />
      <Route path="/case-studies" element={<CaseStudy />} />
      <Route
        path="/case-study-one/:slug"
        element={<CaseStudyOneDesing />}
      />
      <Route path="/case-study-two/:slug" element={<CaseStudyTwoDesign />} />

      <Route path="/*" element={<TemplateRoutes />} />
    </Routes>
  );
}

export default WebsiteRoutes;
