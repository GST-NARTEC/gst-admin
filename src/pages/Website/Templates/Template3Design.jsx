import React from "react";
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";
import { useGetTemplateBySlugQuery } from "../../../store/apis/endpoints/templates";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Button } from "@nextui-org/react";
import OverlayLoader from "../../../components/common/OverlayLoader";
import { useTranslation } from "react-i18next";

function Template3Design() {
  const { slug } = useParams();
  const { data, isLoading } = useGetTemplateBySlugQuery({
    templateType: "template3",
    slug,
  });
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  if (isLoading) return <OverlayLoader />;

  const template = data?.data?.template;

  return (
    <WebsiteLayout>
      <div
        className={`min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 ${
          isArabic ? "font-dubai  font-normal text-[19px]" : ""
        }`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Hero Section */}
        <section className="relative h-[80vh] xl:h-[40vh] overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-quaternary/60" />
          <div
            className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-700"
            style={{
              backgroundImage: `url(${template?.image1?.replace(/\\/g, "/")})`,
            }}
          />
          <div className="relative z-10 container mx-auto h-full flex flex-col justify-center">
            <div
              className={`text-3xl font-light text-white max-w-2xl p-6 ${
                isArabic ? "leading-[1.6] tracking-normal" : ""
              }`}
            >
              {isArabic
                ? template?.description1Ar && parse(template.description1Ar)
                : template?.description1En && parse(template.description1En)}
            </div>
          </div>
        </section>

        {/* Content Section */}
        {(isArabic ? template?.description3Ar : template?.description3En) && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 backdrop-blur-sm rounded-3xl mx-4 shadow-lg">
            <div className="w-full max-w-[1280px] mx-auto">
              <div
                className={`prose max-w-none prose-lg prose-headings:text-primary ${
                  isArabic ? "leading-[1.6] tracking-normal" : ""
                }`}
              >
                {isArabic
                  ? template?.description3Ar && parse(template.description3Ar)
                  : template?.description3En && parse(template.description3En)}
              </div>
            </div>
          </section>
        )}

        {/* Info Section with Side Image */}
        <section className="py-16 bg-gradient-to-br from-white via-gray-50/50 to-white">
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`prose max-w-none prose-lg ${
                isArabic ? "leading-[1.6] tracking-normal" : ""
              }`}
            >
              <div
                className={`float-${isArabic ? "left" : "right"} ${
                  isArabic ? "mr-8" : "ml-8"
                } mb-6 md:w-1/2`}
              >
                <div className="bg-white rounded-2xl p-3 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={template?.image2?.replace(/\\/g, "/")}
                    alt={isArabic ? template?.nameAr : template?.nameEn}
                    className="w-full h-[450px] object-cover rounded-xl hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="bg-white/80 rounded-xl p-6 shadow-md">
                {isArabic
                  ? template?.description2Ar && parse(template.description2Ar)
                  : template?.description2En && parse(template.description2En)}
                {(isArabic
                  ? template?.buttonText1Ar
                  : template?.buttonText1En) && (
                  <Button
                    color="primary"
                    as="a"
                    href={
                      isArabic
                        ? template?.buttonNavigation1Ar
                        : template?.buttonNavigation1En
                    }
                    className="mt-6 hover:scale-105 transition-transform duration-300 shadow-md"
                  >
                    {isArabic
                      ? template?.buttonText1Ar
                      : template?.buttonText1En}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Full Width Image */}
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-2xl p-3 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-[400px] mb-16">
            <img
              src={template?.image3?.replace(/\\/g, "/")}
              alt={isArabic ? template?.nameAr : template?.nameEn}
              className="w-full h-[380px] object-cover rounded-xl hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-100 rounded-t-[3rem]">
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10">
              <div
                className={`prose max-w-none prose-lg prose-headings:text-primary bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg ${
                  isArabic ? "leading-[1.6] tracking-normal" : ""
                }`}
              >
                {isArabic
                  ? template?.description4Ar && parse(template.description4Ar)
                  : template?.description4En && parse(template.description4En)}
              </div>

              {(isArabic
                ? template?.buttonText2Ar
                : template?.buttonText2En) && (
                <div className="flex justify-center">
                  <Button
                    color="primary"
                    size="lg"
                    as="a"
                    href={
                      isArabic
                        ? template?.buttonNavigation2Ar
                        : template?.buttonNavigation2En
                    }
                    className="hover:scale-105 transition-transform duration-300 shadow-lg px-8 py-6 text-lg"
                  >
                    {isArabic
                      ? template?.buttonText2Ar
                      : template?.buttonText2En}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </WebsiteLayout>
  );
}

export default Template3Design;
