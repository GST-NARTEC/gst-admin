import React from "react";
import Layout from "../../../layout/WebsiteLayouts/Layout";
import Hero from "../../../components/Website/home/Hero";
import WhyChooseUs from "../../../components/Website/home/WhyChooseUs";
import CoreSolutions from "../../../components/Website/home/CoreSolutions";
import ProfessionalServices from "../../../components/Website/home/ProfessionalServices";
import WhyWorkWithUs from "../../../components/Website/home/WhyWorkWithUs";
import SmartSolucitonCards from "../../../components/Website/home/SmartSolucitonCards";   

function Home() {
  return (
    <Layout>
      {/* <Hero /> */}
      <SmartSolucitonCards />
      <WhyChooseUs />
      <CoreSolutions />
      <ProfessionalServices />
      <WhyWorkWithUs />
    </Layout>
  );
}

export default Home;
