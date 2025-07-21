import React from "react";
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";
import { Images } from "../../../assets/Index";
import { Button, Spinner } from "@nextui-org/react";
import { useGetTemplateBySlugQuery } from "../../../store/apis/endpoints/templates";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

function CaseStudyTwoDesign() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { data, isLoading } = useGetTemplateBySlugQuery({
    templateType: "caseStudyTemplate2",
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
            className="absolute inset-0 bg-cover bg-center bg-no-repeat "
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
          <div className="absolute bottom-0 right-0 z-50 transform translate-y-1/2 max-w-5xl w-full">
            <div className="bg-primary mr-8 rounded-lg shadow-2xl">
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

        
        <section
          className="py-16 bg-white mt-24"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <div className="container mx-auto px-4">
            {/* Title - Using ReactQuill instead of plain text */}
            <div className="text-2xl font-bold text-secondary mb-6 text-start font-dubai quill-content">
              <ReactQuill
                value={
                  isArabic ? template.description2Ar : template.description2En
                }
                readOnly={true}
                theme="bubble"
                modules={{ toolbar: false }}
              />
            </div>

            {/* First Content Block */}
            <div className="mb-12">
              <div className="text-lg text-gray-700 leading-relaxed text-start font-dubai quill-content">
                <ReactQuill
                  value={
                    isArabic ? template.description3Ar : template.description3En
                  }
                  readOnly={true}
                  theme="bubble"
                  modules={{ toolbar: false }}
                />
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
          </div>
        </section>

        
        <section className="py-16 bg-gray-50" dir={isArabic ? "rtl" : "ltr"}>
          <div className="container mx-auto px-4">
            {/* First Container - Image and Challenges */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* left Column - Challenges Content */}
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
              </div>
              {/* right Column - Image */}
              <div>
                <img
                  src={
                    fixImageUrl(template.image3) ||
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  }
                  alt="Poultry Supply Chain"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

 
        <section className="py-16 bg-gray-50" dir={isArabic ? "rtl" : "ltr"}>
          <div className="container mx-auto px-4">
            {/* First Container - Image and Workflow */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* left Column - Image */}
              <div>
                <img
                  src={
                    fixImageUrl(template.image4) ||
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  }
                  alt="Workflow Image"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* right Column - Workflow Content */}
              <div>
                <div className="space-y-4 font-dubai quill-content">
                  <ReactQuill
                    value={
                      isArabic
                        ? template.description4Ar
                        : template.description4En
                    }
                    readOnly={true}
                    theme="bubble"
                    modules={{ toolbar: false }}
                  />
                </div>
                {/* button */}
             
              </div>
            </div>
          </div>
        </section>

      
        <section className="py-16 bg-white" dir={isArabic ? "rtl" : "ltr"}>
          <div className="container mx-auto px-4">
            {/* Title - Using ReactQuill instead of plain text */}
            <div className="text-2xl font-bold text-secondary mb-6 text-start font-dubai quill-content">
              <ReactQuill
                value={
                  isArabic ? template.description5Ar : template.description5En
                }
                readOnly={true}
                theme="bubble"
                modules={{ toolbar: false }}
              />
            </div>

            {/* First Content Block */}
            <div className="mb-12">
              <div className="text-lg text-gray-700 leading-relaxed text-start font-dubai quill-content">
                <ReactQuill
                  value={
                    isArabic ? template.description6Ar : template.description6En
                  }
                  readOnly={true}
                  theme="bubble"
                  modules={{ toolbar: false }}
                />
              </div>
            </div>

            {/* Central Image */}
            <div className="mb-12 flex justify-center">
              <div className="w-full max-w-4xl">
                <img
                  src={
                    fixImageUrl(template.image5) ||
                    "https://images.pond5.com/barcode-scanner-background-bar-code-footage-234071997_iconl.jpeg"
                  }
                  alt="Solution Image"
                  className="w-full h-72 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

       
        <section className="py-16 bg-gray-50" dir={isArabic ? "rtl" : "ltr"}>
          <div className="container mx-auto px-4">
            {/* Container with two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* left Column - Key Learnings */}
              <div>
                <div className="space-y-4 font-dubai quill-content">
                  <ReactQuill
                    value={
                      isArabic
                        ? template.description7Ar
                        : template.description7En
                    }
                    readOnly={true}
                    theme="bubble"
                    modules={{ toolbar: false }}
                  />
                </div>
              </div>

              {/* right Column - Technologies Used */}
              <div>
                <div className="space-y-4 font-dubai quill-content">
                  <ReactQuill
                    value={
                      isArabic
                        ? template.description6Ar
                        : template.description6En
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

     
        <section
          className="py-16 bg-gray-50 mb-10"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <div className="container mx-auto px-4">
            {/* Container - Image and Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
              {/* left Column - Image */}
              <div>
                <img
                  src={
                    fixImageUrl(template.image6) ||
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  }
                  alt="Results Image"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* right Column - Results Content */}
              <div>
                <div className="space-y-4 font-dubai quill-content">
                  <ReactQuill
                    value={
                      isArabic
                        ? template.description5Ar
                        : template.description5En
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

      
        <section
          className="py-16 bg-white mb-10"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <div className="container mx-auto px-4">
            {/* Title */}
         

            {/* Content Block */}
            <div className="mb-12">
              <div className="text-lg text-gray-700 leading-relaxed text-start font-dubai quill-content">
                <ReactQuill
                  value={
                    isArabic ? template.description8Ar : template.description8En
                  }
                  readOnly={true}
                  theme="bubble"
                  modules={{ toolbar: false }}
                />
              </div>
            </div>

          
          </div>
        </section>
      </div>
    </WebsiteLayout>
  );
}

export default CaseStudyTwoDesign;
