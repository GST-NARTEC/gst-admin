import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTemplateQuery } from "../../../../store/apis/endpoints/templates";
import parse from "html-react-parser";
import { Button } from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import OverlayLoader from "../../../common/OverlayLoader";
import MainLayout from "../../../../layout/AdminLayouts/MainLayout";

function ViewTemplate3() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetTemplateQuery({
    templateType: "template3",
    pageId: id,
  });

  if (isLoading) return <OverlayLoader />;

  const template = data?.data?.template;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Back Button */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 my-5">
        <Button
          color="primary"
          className="hover:scale-105 transition-transform duration-300 shadow-md"
          onPress={() =>
            navigate("/admin/gstsa1/page-templates/templates/template3")
          }
        >
          <IoArrowBack className="text-xl" />
          Back
        </Button>
      </div>

      {/* Hero Section - Updated */}
      <section className="relative h-[75vh] overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-quaternary/60" />
        <div
          className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-700"
          style={{
            backgroundImage: `url(${template?.image1?.replace(/\\/g, "/")})`,
          }}
        />
        <div className="relative z-10 container mx-auto px-8 h-full flex flex-col justify-center">
          <div className="text-3xl font-light text-white max-w-2xl p-6 rounded-xl">
            {template?.description1En && parse(template.description1En)}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 backdrop-blur-sm rounded-3xl mx-4 shadow-lg">
        <div className="w-full max-w-[1280px] mx-auto">
          <div className="prose max-w-none prose-lg prose-headings:text-primary">
            {template?.description3En && parse(template.description3En)}
          </div>
        </div>
      </section>

      {/* Info Section with Side Image */}
      <section className="py-16 bg-gradient-to-br from-white via-gray-50/50 to-white">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none prose-lg">
            <div className="float-right ml-8 mb-6 md:w-1/2">
              <div className="bg-white rounded-2xl p-3 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={template?.image2?.replace(/\\/g, "/")}
                  alt="Section content"
                  className="w-full h-[450px] object-cover rounded-xl hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
            <div className="bg-white/80 rounded-xl p-6 shadow-md">
              {template?.description2En && parse(template.description2En)}
              {template?.buttonText1En && (
                <Button
                  color="primary"
                  as="a"
                  href={template?.buttonNavigation1En}
                  className="mt-6 hover:scale-105 transition-transform duration-300 shadow-md"
                >
                  {template?.buttonText1En}
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
            alt="Full width content"
            className="w-full h-[380px] object-cover rounded-xl hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-100 rounded-t-[3rem]">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10">
            <div className="prose max-w-none prose-lg prose-headings:text-primary bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              {template?.description4En && parse(template.description4En)}
            </div>

            {template?.buttonText2En && (
              <div className="flex justify-center">
                <Button
                  color="primary"
                  size="lg"
                  as="a"
                  href={template?.buttonNavigation2En}
                  className="hover:scale-105 transition-transform duration-300 shadow-lg px-8 py-6 text-lg"
                >
                  {template?.buttonText2En}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewTemplate3;
