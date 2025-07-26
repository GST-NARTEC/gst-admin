import React from "react";
import HeroSection from "./HeroSection";
import StatsCards from "./StatsCards";
import ProductsCards from "./ProductsCards";
import CTA from "./CTA";
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";

function SmartSolutionDetail() {
  return (
    <WebsiteLayout>
      <HeroSection />
      {/* <StatsCards /> */}
      <ProductsCards />
      <CTA />
      {/* Add more sections as needed */}
    </WebsiteLayout>
  );
}

export default SmartSolutionDetail;
