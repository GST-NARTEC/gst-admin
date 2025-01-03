import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTemplateQuery } from "../../../../store/apis/endpoints/templates";
import parse from "html-react-parser";
import { Button } from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import OverlayLoader from "../../../common/OverlayLoader";

function ViewTemplate4() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetTemplateQuery({
    templateType: "template4",
    pageId: id,
  });

  if (isLoading) return <OverlayLoader />;
  const template = data?.data?.template;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Back Button */}
      <div className="w-full max-w-[1400px] mx-auto px-6 py-6">
        <Button
          color="primary"
          variant="light"
          className="hover:scale-105 transition-transform duration-300"
          onPress={() =>
            navigate("/admin/gstsa1/page-templates/templates/template4")
          }
          startContent={<IoArrowBack className="text-xl" />}
        >
          Back to Templates
        </Button>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-12">
        {/* Section 1 */}
        <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="prose max-w-none prose-lg px-8">
            <div className="float-right ml-8 mb-6 md:w-1/2">
              <div className="bg-white= rounded-2xl p-3 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {template?.image1 && (
                  <img
                    src={template.image1.replace(/\\/g, "/")}
                    alt="Section 1"
                    className="w-full h-[450px] object-cover rounded-xl hover:scale-[1.02] transition-transform duration-300"
                  />
                )}
              </div>
            </div>
            <div className="prose-headings:text-gray-800 prose-p:text-gray-60">
              {template?.description1En && parse(template.description1En)}
              {template?.buttonText1En && (
                <Button
                  color="primary"
                  size="lg"
                  as="a"
                  href={template?.buttonNavigation1En}
                  className="mt-6 hover:scale-105 transition-transform duration-300"
                >
                  {template?.buttonText1En}
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="prose max-w-none prose-lg px-8">
            <div className="float-right ml-8 mb-6 md:w-1/2">
              <div className="bg-white rounded-2xl p-3 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {template?.image2 && (
                  <img
                    src={template.image2.replace(/\\/g, "/")}
                    alt="Section 2"
                    className="w-full h-[450px] object-cover rounded-xl hover:scale-[1.02] transition-transform duration-300"
                  />
                )}
              </div>
            </div>
            <div className="prose-headings:text-gray-800 prose-p:text-gray-600">
              {template?.description2En && parse(template.description2En)}
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="py-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="prose max-w-none prose-lg px-8">
            <div className="float-right ml-8 mb-6 md:w-1/2">
              <div className="bg-white rounded-2xl p-3 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {template?.image3 && (
                  <img
                    src={template.image3.replace(/\\/g, "/")}
                    alt="Section 3"
                    className="w-full h-[450px] object-cover rounded-xl hover:scale-[1.02] transition-transform duration-300"
                  />
                )}
              </div>
            </div>
            <div className="prose-headings:text-gray-800 prose-p:text-gray-600">
              {template?.description3En && parse(template.description3En)}
              {template?.buttonText2En && (
                <Button
                  color="primary"
                  size="lg"
                  as="a"
                  href={template?.buttonNavigation2En}
                  className="mt-6 hover:scale-105 transition-transform duration-300"
                >
                  {template?.buttonText2En}
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="py-12 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="prose max-w-none prose-lg px-8">
            <div className="prose-headings:text-gray-800 prose-p:text-gray-600">
              {template?.description4En && parse(template.description4En)}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ViewTemplate4;
