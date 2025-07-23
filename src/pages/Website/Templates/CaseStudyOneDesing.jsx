import React from "react";
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";
import { Images } from "../../../assets/Index";
import { Button, Spinner } from "@nextui-org/react";
import { useGetTemplateBySlugQuery } from "../../../store/apis/endpoints/templates";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import SEO from "../../../components/seo/Seo";

function CaseStudyOneDesing() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { data, isLoading } = useGetTemplateBySlugQuery({
    templateType: "caseStudyTemplate1",
    slug,
  });

  if (isLoading) {
    return (
      <WebsiteLayout>
        <div className="py-16 px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <Spinner size="lg" color="primary" />
          </div>
        </div>
      </WebsiteLayout>
    );
  }

  const template = data?.data?.template;

  if (!template) {
    return (
      <WebsiteLayout>
        <div className="py-16 px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-gray-500 text-lg">{t("common.noData")}</p>
          </div>
        </div>
      </WebsiteLayout>
    );
  }

  // Fix image URL if it contains backslashes
  const fixImageUrl = (url) => {
    return url ? url.replace(/\\/g, "/") : null;
  };

  return (
    <WebsiteLayout>
      <SEO
        title={isArabic ? template?.nameAr : template?.nameEn}
        description={
          isArabic ? template?.description1Ar : template?.description1En
        }
        keywords={template?.keywords}
        image={template?.image1}
      />
      <div
        className={`${isArabic ? "font-dubai text-[19px] font-normal" : ""}`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Header Section */}
        <section className="relative h-[80vh] xl:h-[50vh] bg-cover bg-center bg-no-repeat">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: template.image1
                ? `url('${fixImageUrl(template.image1)}')`
                : "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')",
            }}
          ></div>

          {/* Logo - Top Left/Right based on language */}
          <div
            className={`absolute top-8 ${isArabic ? "right-8" : "left-8"} z-20`}
          >
            <img
              src={Images.Logo}
              alt="GST Logo"
              className="w-auto h-32 rounded-md"
            />
          </div>

          {/* Blue Card - Bottom, overlapping the image */}
          <div className="absolute bottom-0 left-0 right-0 z-50 transform translate-y-1/3">
            <div className="bg-primary mx-8 rounded-lg shadow-2xl">
              <div className="px-8 py-8">
                <div
                  className={`text-white font-dubai prose max-w-none ${
                    isArabic ? "leading-[1.6] tracking-normal" : ""
                  }`}
                >
                  {isArabic
                    ? template?.headingAr && parse(template.headingAr)
                    : template?.headingEn && parse(template.headingEn)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - Overview */}
        <section className="mt-24 py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Overview Content */}
              <div>
                <div
                  className={`space-y-6 text-gray-700 leading-relaxed font-dubai prose max-w-none ${
                    isArabic ? "leading-[1.6] tracking-normal" : ""
                  }`}
                >
                  {isArabic
                    ? template?.description1Ar && parse(template.description1Ar)
                    : template?.description1En &&
                      parse(template.description1En)}
                </div>
              </div>

              {/* Quote Box */}
              <div className="lg:mt-16">
                <div className="bg-secondary p-8 rounded-lg shadow-lg">
                  <blockquote className="text-white">
                    <div
                      className={`text-lg leading-relaxed mb-6 font-dubai prose max-w-none ${
                        isArabic ? "leading-[1.6] tracking-normal" : ""
                      }`}
                    >
                      {isArabic
                        ? template?.descriptionQuote1Ar &&
                          parse(template.descriptionQuote1Ar)
                        : template?.descriptionQuote1En &&
                          parse(template.descriptionQuote1En)}
                    </div>
                    <footer className="border-t border-white/20 pt-4">
                      <cite className="font-semibold not-italic">
                        {isArabic
                          ? template.descriptionAuthor1Ar
                          : template.descriptionAuthor1En}
                      </cite>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 - Solution */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            {/* Title */}
            <h2
              className={`text-3xl md:text-4xl font-bold text-secondary mb-6 ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {isArabic ? template.description2Ar : template.description2En}
            </h2>

            {/* First Content Block */}
            <div className="mb-12">
              <div
                className={`text-lg text-gray-700 leading-relaxed font-dubai prose max-w-none ${
                  isArabic
                    ? "leading-[1.6] tracking-normal text-right"
                    : "text-left"
                }`}
              >
                {isArabic
                  ? template?.description3Ar && parse(template.description3Ar)
                  : template?.description3En && parse(template.description3En)}
              </div>
            </div>

            {/* Central Image */}
            <div className="mb-12 flex justify-center">
              <div className="w-full max-w-4xl">
                <img
                  src={
                    fixImageUrl(template.image2) ||
                    "https://images.pond5.com/barcode-scanner-background-bar-code-footage-234071997_iconl.jpeg"
                  }
                  alt="Barcode and QR Code Labeling System"
                  className="w-full h-72 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            <div className="mb-8">
              <div
                className={`text-lg text-gray-700 leading-relaxed font-dubai prose max-w-none ${
                  isArabic ? "leading-[1.6] tracking-normal" : ""
                }`}
              >
                {isArabic
                  ? template?.description4Ar && parse(template.description4Ar)
                  : template?.description4En && parse(template.description4En)}
              </div>
            </div>

            {/* Key Features */}
            <div
              className={`w-full font-dubai prose max-w-none ${
                isArabic ? "leading-[1.6] tracking-normal" : ""
              }`}
            >
              {isArabic
                ? template?.description5Ar && parse(template.description5Ar)
                : template?.description5En && parse(template.description5En)}
            </div>
          </div>
        </section>

        {/* Section 4 - Results */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* First Container - Image and Main Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* Image Column - Swap order based on language */}
              <div className={`${isArabic ? "order-last" : "order-first"}`}>
                <img
                  src={
                    fixImageUrl(template.image3) ||
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  }
                  alt="Results Image"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* Main Results Content - Swap order based on language */}
              <div className={`${isArabic ? "order-first" : "order-last"}`}>
                <div
                  className={`space-y-4 font-dubai prose max-w-none ${
                    isArabic ? "leading-[1.6] tracking-normal" : ""
                  }`}
                >
                  {isArabic
                    ? template?.description6Ar && parse(template.description6Ar)
                    : template?.description6En &&
                      parse(template.description6En)}
                </div>
              </div>
            </div>

            {/* Second Container - Results Content and Quote Box */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Results Content */}
              <div>
                <div
                  className={`space-y-4 font-dubai prose max-w-none ${
                    isArabic ? "leading-[1.6] tracking-normal" : ""
                  }`}
                >
                  {isArabic
                    ? template?.description7Ar && parse(template.description7Ar)
                    : template?.description7En &&
                      parse(template.description7En)}
                </div>
              </div>

              {/* Quote Box */}
              <div className="flex items-start">
                <div className="bg-teal-500 p-6 rounded-lg shadow-lg w-full">
                  <blockquote className="text-white">
                    <div
                      className={`text-lg leading-relaxed mb-4 font-dubai prose max-w-none ${
                        isArabic ? "leading-[1.6] tracking-normal" : ""
                      }`}
                    >
                      {isArabic
                        ? template?.descriptionQuote2Ar &&
                          parse(template.descriptionQuote2Ar)
                        : template?.descriptionQuote2En &&
                          parse(template.descriptionQuote2En)}
                    </div>
                    <footer>
                      <cite className="font-semibold not-italic">
                        {isArabic
                          ? template.descriptionAuthor2Ar
                          : template.descriptionAuthor2En}
                      </cite>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 - Final Section */}
        <section className="py-8  my-16">
          <div className="container mx-auto px-4">
            {/* Central Image */}
            <div className="mb-12 flex justify-center">
              <div className="w-full max-w-4xl">
                <img
                  src={
                    fixImageUrl(template.image4) ||
                    "https://images.pond5.com/barcode-scanner-background-bar-code-footage-234071997_iconl.jpeg"
                  }
                  alt="Final Section Image"
                  className="w-full h-72 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Final Content */}
            <div
              className={`text-gray-700 font-dubai prose max-w-none ${
                isArabic ? "leading-[1.6] tracking-normal" : ""
              }`}
            >
              {isArabic
                ? template?.description8Ar && parse(template.description8Ar)
                : template?.description8En && parse(template.description8En)}
            </div>

            <div className={`mt-4 ${isArabic ? "text-right" : ""}`}>
              <Button
                as="a"
                href="https://www.gs1.org/standards/gs1-sunrise-2027"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
              >
                {t("common.learnMore")}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </WebsiteLayout>
  );
}

export default CaseStudyOneDesing;
