import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Website/home/Home";
import TemplateRoutes from "../layout/WebsiteLayouts/TemplateRoutes";
import UserGuideManual from "../components/Website/userGuideManual/UserGuideManual";
import SmartSolutionDetail from "../pages/Website/smart-solution/SmartSolutionDetail";
import CaseStudy from "../pages/Website/case-studies/CaseStudy";
import CaseStudyOneDesing from "../pages/Website/Templates/CaseStudyOneDesing";
import CaseStudyTwoDesign from "../pages/Website/Templates/CaseStudyTwoDesign";
import SunriseDesign from "../pages/Website/Templates/SunriseDesign";
import PricingCards from "../pages/Website/print-pack/PricingCards";
import SubscriptionForm from "../pages/Website/print-pack/SubscriptionForm";
import ContactUs from "../pages/Website/contact-us/ContactUs";

function WebsiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-guide-manual" element={<UserGuideManual />} />
      <Route path="/verify-halal" element={<SmartSolutionDetail />} />
      <Route path="/case-studies" element={<CaseStudy />} />
      <Route path="/case-study-one/:slug" element={<CaseStudyOneDesing />} />
      <Route path="/case-study-two/:slug" element={<CaseStudyTwoDesign />} />
      <Route path="/sunrise/:slug" element={<SunriseDesign />} />
      <Route path="/print-pack/pricing" element={<PricingCards />} />
      <Route path="/print-pack/subscription" element={<SubscriptionForm />} />
      <Route path="/contact-us" element={<ContactUs />} />

      {/* Nested routes for templates */}

      <Route path="/*" element={<TemplateRoutes />} />
    </Routes>
  );
}

export default WebsiteRoutes;
