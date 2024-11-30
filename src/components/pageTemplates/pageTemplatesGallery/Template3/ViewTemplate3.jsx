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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Back Button */}
      <div className="p-4">
        <Button
          color="primary"
          onPress={() =>
            navigate("/admin/gstsa1/page-templates/templates/template3")
          }
        >
          <IoArrowBack className="text-xl" />
          Back
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden rounded-xl mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-quaternary/50" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${template?.image1?.replace(/\\/g, "/")})`,
          }}
        />
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="prose prose-lg text-white max-w-2xl">
            {template?.description1En && parse(template.description1En)}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-10">
        <div className="container mx-auto">
          <div className="prose max-w-none">
            {template?.description3En && parse(template.description3En)}
          </div>
        </div>
      </section>

      {/* Info Section with Side Image */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="prose max-w-none">
              {template?.description2En && parse(template.description2En)}
              {template?.buttonText1En && (
                <Button
                  color="primary"
                  as="a"
                  href={template?.buttonNavigation1En}
                  className="mt-4"
                >
                  {template?.buttonText1En}
                </Button>
              )}
            </div>
            <div className="space-y-4">
              <div className="bg-white/95 rounded-xl p-2 shadow-lg">
                <img
                  src={template?.image2?.replace(/\\/g, "/")}
                  alt="Section content"
                  className="w-full h-[450px] object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Image */}
      <div className="bg-white/95 rounded-xl p-2 shadow-lg h-[370px] mx-auto w-full max-w-4xl mb-12">
        <img
          src={template?.image3?.replace(/\\/g, "/")}
          alt="Full width content"
          className="w-full h-[350px] object-cover rounded-lg"
        />
      </div>

      {/* Bottom Section */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8">
            <div className="prose max-w-none">
              {template?.description4En && parse(template.description4En)}
            </div>

            {template?.buttonText2En && (
              <div className="flex justify-center">
                <Button
                  color="primary"
                  size="lg"
                  as="a"
                  href={template?.buttonNavigation2En}
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
