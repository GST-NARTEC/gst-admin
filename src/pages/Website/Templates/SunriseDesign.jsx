import React from "react";
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { Images } from "../../../assets";
import { Button, Spinner } from "@nextui-org/react";
import { useGetTemplateBySlugQuery } from "../../../store/apis/endpoints/templates";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SunriseDesign() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { data, isLoading } = useGetTemplateBySlugQuery({
    templateType: "sunrize2027Template",
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
      <div>
        {/* section one - Hero Section */}
        <section
          className="relative h-screen bg-cover bg-center bg-no-repeat"
          dir={isArabic ? "rtl" : "ltr"}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: template.image1
                ? `url('${fixImageUrl(template.image1)}')`
                : "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')",
            }}
          ></div>

          {/* Logo - Top Left */}
          <div className="absolute top-8 left-8 z-20">
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
                <div className="text-white font-dubai quill-content">
                  <ReactQuill
                    value={isArabic ? template.headingAr : template.headingEn}
                    readOnly={true}
                    theme="bubble"
                    modules={{ toolbar: false }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* section two - What Is GS1 Sunrise 2027? */}
        <section
          className="py-16   md:py-20 mt-16 bg-gray-50"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <div className="container mx-auto px-4">
            {/* First Container - Image and Challenges */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* left Column - Content */}
              <div>
                <div className="space-y-4 font-dubai quill-content">
                  <ReactQuill
                    value={
                      isArabic
                        ? template.description1Ar
                        : template.description1En
                    }
                    readOnly={true}
                    theme="bubble"
                    modules={{ toolbar: false }}
                  />
                </div>

                {/* button */}
                <Button
                  as="a"
                  href={
                    template.buttonLink1 ||
                    "https://www.gs1.org/standards/gs1-sunrise-2027"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4"
                  color="primary"
                >
                  {isArabic ? template.buttonText1Ar : template.buttonText1En}
                </Button>
              </div>
              {/* right Column - Image */}
              <div>
                <img
                  src={
                    fixImageUrl(template.image2) ||
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  }
                  alt="Sunrise 2027"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* section three - Why Transition to 2D Barcodes? */}
        <section className="py-16 bg-white" dir={isArabic ? "rtl" : "ltr"}>
          <div className="container mx-auto px-4 font-dubai quill-content">
            <ReactQuill
              value={
                isArabic ? template.description2Ar : template.description2En
              }
              readOnly={true}
              theme="bubble"
              modules={{ toolbar: false }}
            />
          </div>
        </section>

        {/* section four - Industries Empowered by Sunrise 2027 */}
        <section className="py-16 bg-white" dir={isArabic ? "rtl" : "ltr"}>
          <div className="container mx-auto px-4">
            {/* Header container with primary background */}
            <div className="bg-primary rounded-lg shadow-lg p-6 mb-12 flex flex-col md:flex-row justify-between items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {isArabic
                  ? template.industriesTitleAr
                  : template.industriesTitleEn}
              </h2>
              <Button
                size="lg"
                className="mt-4 md:mt-0 bg-white text-primary hover:bg-gray-100"
                as="a"
                href={template.buttonLink2 || "#contact"}
              >
                {isArabic ? template.buttonText2Ar : template.buttonText2En}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 - Retail */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/4 p-4 ">
                    <img
                      src={
                        fixImageUrl(template.image3) ||
                        "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      }
                      alt="Retail"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full md:w-3/4 p-4">
                    <div className="font-dubai quill-content">
                      <ReactQuill
                        value={
                          isArabic
                            ? template.retailContentAr
                            : template.retailContentEn
                        }
                        readOnly={true}
                        theme="bubble"
                        modules={{ toolbar: false }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Logistics & Warehousing */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/4 p-4 ">
                    <img
                      src={
                        fixImageUrl(template.image4) ||
                        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      }
                      alt="Logistics & Warehousing"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full md:w-3/4 p-4">
                    <div className="font-dubai quill-content">
                      <ReactQuill
                        value={
                          isArabic
                            ? template.logisticsContentAr
                            : template.logisticsContentEn
                        }
                        readOnly={true}
                        theme="bubble"
                        modules={{ toolbar: false }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Manufacturing */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/4 p-4 ">
                    <img
                      src={
                        fixImageUrl(template.image5) ||
                        "https://images.unsplash.com/photo-1581092921461-eab10380dbac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      }
                      alt="Manufacturing"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full md:w-3/4 p-4">
                    <div className="font-dubai quill-content">
                      <ReactQuill
                        value={
                          isArabic
                            ? template.manufacturingContentAr
                            : template.manufacturingContentEn
                        }
                        readOnly={true}
                        theme="bubble"
                        modules={{ toolbar: false }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4 - Healthcare & Pharmaceuticals */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/4 p-4 ">
                    <img
                      src={
                        fixImageUrl(template.image6) ||
                        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      }
                      alt="Healthcare & Pharmaceuticals"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full md:w-3/4 p-4">
                    <div className="font-dubai quill-content">
                      <ReactQuill
                        value={
                          isArabic
                            ? template.healthcareContentAr
                            : template.healthcareContentEn
                        }
                        readOnly={true}
                        theme="bubble"
                        modules={{ toolbar: false }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* section five - What Is GS1 Digital Link? */}
        <section className="py-16 bg-gray-50" dir={isArabic ? "rtl" : "ltr"}>
          <div className="container mx-auto px-4">
            {/* First Container - Image and Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* left Column - Image */}
              <div>
                <img
                  src={
                    fixImageUrl(template.image7) ||
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  }
                  alt="GS1 Digital Link"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              {/* right Column - Content */}
              <div>
                <div className="space-y-4 font-dubai quill-content">
                  <ReactQuill
                    value={
                      isArabic
                        ? template.description3Ar
                        : template.description3En
                    }
                    readOnly={true}
                    theme="bubble"
                    modules={{ toolbar: false }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* section six - Supported 2D Barcodes */}
        <section className="py-16 bg-white" dir={isArabic ? "rtl" : "ltr"}>
          <div className="container mx-auto px-4 font-dubai quill-content">
            <ReactQuill
              value={
                isArabic ? template.description4Ar : template.description4En
              }
              readOnly={true}
              theme="bubble"
              modules={{ toolbar: false }}
            />
          </div>
        </section>

        {/* section seven - Let's Get Started */}
        <section
          className="py-16 bg-tertiary/80 my-16"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <div className="container mx-auto px-4 font-dubai quill-content text-white">
            <ReactQuill
              value={
                isArabic ? template.description5Ar : template.description5En
              }
              readOnly={true}
              theme="bubble"
              modules={{ toolbar: false }}
            />
          </div>
        </section>
      </div>
    </WebsiteLayout>
  );
}

export default SunriseDesign;
