import React from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";

function CaseStudy() {
  const caseStudies = [
    {
      id: 1,
      title: "Aramco",
      description:
        "Saudi Arabian Oil Company is a Saudi Arabian public petroleum and natural gas company based in Dhahran.",
      logo: "https://via.placeholder.com/120x80/1B365D/FFFFFF?text=Aramco",
    },
    {
      id: 2,
      title: "Zakat, Tax and Customs Authority",
      description:
        "Streamlining tax collection and customs operations with smart tracking, automation, and digital control.",
      logo: "https://via.placeholder.com/120x80/1B365D/FFFFFF?text=ZATCA",
    },
    {
      id: 3,
      title: "Digital Government Authority",
      description:
        "Enabling digital transformation across government sectors with comprehensive tracking solutions.",
      logo: "https://via.placeholder.com/120x80/1B365D/FFFFFF?text=DGA",
    },
    {
      id: 4,
      title: "Lulu",
      description:
        "Retail chain management and inventory tracking solutions for enhanced operational efficiency.",
      logo: "https://via.placeholder.com/120x80/1B365D/FFFFFF?text=Lulu",
    },
    {
      id: 5,
      title: "Saudi Food and Drug Authority",
      description:
        "Food and pharmaceutical tracking solutions ensuring safety and compliance standards.",
      logo: "https://via.placeholder.com/120x80/1B365D/FFFFFF?text=SFDA",
    },
    {
      id: 6,
      title: "Saudi Standards Organization",
      description:
        "Quality control and standards compliance through digital tracking and monitoring systems.",
      logo: "https://via.placeholder.com/120x80/1B365D/FFFFFF?text=SSO",
    },
    {
      id: 7,
      title: "Carrefour",
      description:
        "Retail tracking and inventory management solutions for improved supply chain visibility.",
      logo: "https://via.placeholder.com/120x80/1B365D/FFFFFF?text=Carrefour",
    },
    {
      id: 8,
      title: "SABIC",
      description:
        "Industrial tracking solutions for petrochemical and manufacturing operations.",
      logo: "https://via.placeholder.com/120x80/1B365D/FFFFFF?text=SABIC",
    },
  ];

  return (
    <WebsiteLayout>
      <div className="min-h-screen">
        {/* Header Section - Light Primary Background */}
        <div className="bg-primary/20 text-center py-16 px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-dubai">
            Case Studies Across Industries
          </h1>
          <p className="text-xl text-primary/80 max-w-4xl mx-auto leading-relaxed">
            See how GST Solutions transformed operations with smart tracking,
            automation, and digital control.
          </p>
        </div>

        {/* Case Studies Grid - White Background */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {caseStudies.map((study) => (
                <Card
                  key={study.id}
                  className="bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
                  isPressable
                >
                  <CardBody className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <img
                        src={study.logo}
                        alt={study.title}
                        className="w-24 h-16 object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-3 font-dubai">
                      {study.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {study.description}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Section - Light Primary Background */}
        <div className="bg-primary/20 py-12">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-primary mb-4 font-dubai">
              Want to become our next success story?
            </h2>
            <p className="text-primary/80 mb-8 text-lg">
              Contact us today to learn how GST Solutions can transform your
              operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-primary">
                <span className="text-lg">📞</span>
                <span className="font-medium">+920000848</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <span className="text-lg">🌐</span>
                <Button
                  as="a"
                  href="https://www.gst1.org"
                  target="_blank"
                  variant="light"
                  className="text-primary hover:text-primary/80 p-0 h-auto min-w-0"
                >
                  www.gst1.org
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}

export default CaseStudy;
