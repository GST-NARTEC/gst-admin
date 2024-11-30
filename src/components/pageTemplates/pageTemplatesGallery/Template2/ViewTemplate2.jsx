import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTemplateQuery } from "../../../../store/apis/endpoints/templates";
import parse from "html-react-parser";
import { Button } from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import OverlayLoader from "../../../common/OverlayLoader";

function ViewTemplate2() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetTemplateQuery({
    templateType: "template2",
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
            navigate("/admin/gstsa1/page-templates/templates/template2")
          }
        >
          <IoArrowBack className="text-xl" />
          Back
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-quaternary/50" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${template?.image1?.replace(/\\/g, "/")})`,
          }}
        />
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-2xl max-w-2xl">
            {template?.description1En && parse(template.description1En)}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-10">
        <div className="mx-auto px-4">
          {/* Image with text wrapping */}
          <div className="prose max-w-none">
            <div className="float-right ml-8 mb-6 w-1/2">
              <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={template?.image2?.replace(/\\/g, "/")}
                  alt="Section content"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
            {template?.description2En && parse(template.description2En)}
            {/* Navigation Button */}
            {template?.buttonTextEn && (
              <div className="mt-8">
                <Button
                  color="primary"
                  size="lg"
                  as="a"
                  href={template?.buttonNavigationEn}
                >
                  {template?.buttonTextEn}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-100 px-10">
        <div className="mx-auto px-10">
          <div className="flex flex-col gap-8">
            {/* Description */}
            <div className="prose max-w-none">
              {template?.description3En && parse(template.description3En)}
            </div>

            {/* Image */}
            <div className="w-full max-w-7xl mx-auto">
              <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={template?.image3?.replace(/\\/g, "/")}
                  alt="Bottom section"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewTemplate2;
