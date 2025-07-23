import React from "react";
import { Card, CardBody, Spinner, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";
import { useGetTemplateBySlugQuery } from "../../../store/apis/endpoints/templates";
import { useGetCompaniesQuery } from "../../../store/apis/endpoints/compnies";
import SEO from "../../../components/seo/Seo";

function CaseStudy() {
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();

  const { data: templateData, isLoading: templateLoading } =
    useGetTemplateBySlugQuery({
      templateType: "caseStudyMainTemplate",
      slug: "case-study-main",
    });

  const { data: companiesData, isLoading: companiesLoading } =
    useGetCompaniesQuery();
  const companies = companiesData?.data?.companies || [];

  const handleCardClick = (company) => {
    if (company.websiteLink) {
      window.open(company.websiteLink, "_blank", "noopener,noreferrer");
    } else if (company.page) {
      const { template, slug } = company.page;
      if (template === "case-study-one") {
        navigate(`/case-study-one/${slug}`);
      } else if (template === "case-study-two") {
        navigate(`/case-study-two/${slug}`);
      }
    }
  };

  if (templateLoading || companiesLoading) {
    return (
      <WebsiteLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Spinner size="lg" color="primary" />
        </div>
      </WebsiteLayout>
    );
  }

  const template = templateData?.data?.template;

  return (
    <WebsiteLayout>
      <SEO
        title={isArabic ? template?.titleAr : template?.titleEn}
        description={isArabic ? template?.headerAr : template?.headerEn}
        keywords={template?.keywords}
      />
      <div
        className={`min-h-screen ${
          isArabic ? "font-dubai text-[19px] font-normal" : ""
        }`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Header Section - Primary Background with Gradient */}
        <div className="bg-gradient-to-r from-primary/30 to-quaternary/30 py-16 px-6">
          {template && (
            <div className="container mx-auto">
              <div
                className={`prose max-w-none ${
                  isArabic
                    ? "leading-[1.6] tracking-normal text-right"
                    : "text-center"
                }`}
              >
                {isArabic
                  ? template?.headerAr && parse(template.headerAr || "")
                  : template?.headerEn && parse(template.headerEn || "")}
              </div>
            </div>
          )}
        </div>

        {/* Case Studies Grid - White Background */}
        <div className="bg-white py-8">
          <div className="container mx-auto px-6">
            {companies && companies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {companies.map((company) => (
                  <Card
                    key={company.id}
                    className="bg-white border border-gray-200 hover:shadow-xl transition-all duration-300"
                    isPressable={false}
                  >
                    <CardBody className="p-6 text-center flex flex-col">
                      <div className="flex justify-center mb-4">
                        <img
                          src={company.icon || "https://placehold.co/120x80"}
                          alt={isArabic ? company.titleAr : company.titleEn}
                          className="w-36 h-24 object-contain"
                        />
                      </div>
                      <h3 className="text-sm font-medium text-primary mb-2 font-dubai">
                        {isArabic ? company.titleAr : company.titleEn}
                      </h3>
                      <p className="text-gray-600 text-xs leading-relaxed mb-4">
                        {isArabic
                          ? company.descriptionAr
                          : company.descriptionEn}
                      </p>

                      {/* Read More button */}
                      {(company.websiteLink || company.page) && (
                        <div className="mt-auto">
                          <Button
                            color="primary"
                            variant="flat"
                            size="sm"
                            className="w-full"
                            onClick={() => handleCardClick(company)}
                          >
                            {isArabic ? "اقرأ المزيد" : "Read More"}
                          </Button>
                        </div>
                      )}

                      {/* Visual indicator for linked pages */}
                      {company.page && (
                        <div className="absolute top-2 right-2">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        </div>
                      )}
                    </CardBody>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 text-lg">
                  {isArabic ? "لا توجد بيانات متاحة" : "No data available"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action Section - Tertiary Background */}
        <div className="bg-tertiary/80 py-8 my-16">
          <div className="container mx-auto px-6">
            {template && (
              <div
                className={`prose max-w-none text-white ${
                  isArabic
                    ? "leading-[1.6] tracking-normal text-right"
                    : "text-center"
                }`}
              >
                {isArabic
                  ? template?.footerAr && parse(template.footerAr || "")
                  : template?.footerEn && parse(template.footerEn || "")}
              </div>
            )}
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}

export default CaseStudy;
