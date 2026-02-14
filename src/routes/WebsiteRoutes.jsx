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
import ExpoForm from "../pages/expo/ExpoForm";
import MesSiriAlignment from "../pages/Website/MesSiriAlignment/MesSiriAlignment";
import GstPartnerProgram from "../pages/Website/gstPartnerProgram/gstPartnerProgram";
import CompanyProfile from "../pages/Website/CompanyProfile/CompanyProfile";
import TraceabilityPresentation from "../pages/Website/traceabilityPresentation/TraceabilityPresentation";

function WebsiteRoutes() {
  return (
    <Routes>
      <Route path="/exhibit-visitor-registration" element={<ExpoForm />} />
      <Route path="/" element={<Home />} />
      <Route path="/user-guide-manual" element={<UserGuideManual />} />
      <Route path="/verify-halal" element={<SmartSolutionDetail />} />
      <Route path="/case-study-main" element={<CaseStudy />} />
      <Route path="/case-study-one/:slug" element={<CaseStudyOneDesing />} />
      <Route path="/case-study-two/:slug" element={<CaseStudyTwoDesign />} />
      <Route path="/sunrise/:slug" element={<SunriseDesign />} />
      <Route path="/print-pack/pricing" element={<PricingCards />} />
      <Route path="/print-pack/subscription" element={<SubscriptionForm />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/mes-siri-alignment" element={<MesSiriAlignment />} />
      <Route path="/gst-partner-program" element={<GstPartnerProgram />} />
      <Route path="/company-profile" element={<CompanyProfile />} />
      <Route path="/traceability-presentation" element={<TraceabilityPresentation />} />

      {/* Nested routes for templates */}

      <Route path="/*" element={<TemplateRoutes />} />
    </Routes>
  );
}

export default WebsiteRoutes;
