import React from "react";
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";
import { useGetTemplateBySlugQuery } from "../../../store/apis/endpoints/templates";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import OverlayLoader from "../../../components/common/OverlayLoader";
import { useTranslation } from "react-i18next";

function Template1Design() {
  const { slug } = useParams();
  const { data, isLoading } = useGetTemplateBySlugQuery({
    templateType: "template1",
    slug,
  });
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  if (isLoading) return <OverlayLoader />;

  const template = data?.data?.template;

  return (
    <WebsiteLayout>
      <div
        className={`min-h-screen bg-gradient-to-b from-white to-gray-50 ${
          isArabic ? "font-dubai text-[19px] font-normal" : ""
        }`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Hero Section */}
        <section className="relative h-[80vh] xl:h-[45vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-quaternary/50" />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${template?.image1?.replace(/\\/g, "/")})`,
            }}
          />
          <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
            {/* <h1 className="text-5xl font-bold text-white mb-4">
              {isArabic ? template?.nameAr : template?.nameEn}
            </h1> */}
            <div
              className={`prose max-w-none md:text-4xl ${
                isArabic ? "leading-[1.6] tracking-normal font-semibold" : ""
              }`}
            >
              {isArabic
                ? template?.description1Ar && parse(template.description1Ar)
                : template?.description1En && parse(template.description1En)}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 px-10">
          <div className="mx-auto px-4">
            {/* Image with text wrapping */}
            <div
              className={`prose max-w-none ${
                isArabic ? "leading-[1.6] tracking-normal" : ""
              }`}
            >
              <div
                className={`float-${isArabic ? "left" : "right"} ${
                  isArabic ? "mr-8" : "ml-8"
                } mb-6 w-1/2`}
              >
                <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={template?.image2?.replace(/\\/g, "/")}
                    alt={isArabic ? template?.nameAr : template?.nameEn}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
              {isArabic
                ? template?.description2Ar && parse(template.description2Ar)
                : template?.description2En && parse(template.description2En)}
            </div>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="py-12 bg-gradient-to-b from-white to-gray-100 px-10">
          <div className="mx-auto px-10">
            {/* Image with text wrapping */}
            <div
              className={`prose max-w-none ${
                isArabic ? "leading-[1.6] tracking-normal" : ""
              }`}
            >
              <div
                className={`float-${isArabic ? "right" : "left"} ${
                  isArabic ? "ml-8" : "mr-8"
                } mb-6 w-1/2`}
              >
                <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={template?.image3?.replace(/\\/g, "/")}
                    alt={isArabic ? template?.nameAr : template?.nameEn}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
              {isArabic
                ? template?.description3Ar && parse(template.description3Ar)
                : template?.description3En && parse(template.description3En)}
            </div>
          </div>
        </section>
      </div>
    </WebsiteLayout>
  );
}

export default Template1Design;
