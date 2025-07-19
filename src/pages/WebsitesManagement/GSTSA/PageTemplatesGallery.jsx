import React from "react";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import {
  RiLayout2Line,
  RiLayoutColumnLine,
  RiLayout5Line,
  RiLayoutMasonryLine,
  RiLayoutBottomLine,
  RiLayoutTopLine,
  RiLayoutRightLine,
} from "react-icons/ri";

const templates = [
  {
    id: 1,
    name: "Template 1",
    value: "template1",
    icon: RiLayout2Line,
    color: "primary",
  },
  {
    id: 2,
    name: "Template 2",
    value: "template2",
    icon: RiLayoutColumnLine,
    color: "secondary",
  },
  {
    id: 3,
    name: "Template 3",
    value: "template3",
    icon: RiLayout5Line,
    color: "success",
  },
  {
    id: 4,
    name: "Template 4",
    value: "template4",
    icon: RiLayoutMasonryLine,
    color: "warning",
  },
  {
    id: 5,
    name: "Halal Verify",
    value: "verify-halal",
    icon: RiLayoutBottomLine,
    color: "danger",
  },
  {
    id: 6,
    name: "Case Study Main",
    value: "case-study-main",
    icon: RiLayoutTopLine,
    color: "primary",
  },
  {
    id: 7,
    name: "Case Study One",
    value: "case-study-one",
    icon: RiLayoutRightLine,
    color: "secondary",
    // description: "News portal layout"
  },
  {
    id: 8,
    name: "Case Study Two",
    value: "case-study-two",
    icon: RiLayoutRightLine,
    color: "default",
    // description: "News portal layout"
  },
  {
    id: 9,
    name: "Sunrise 2027",
    value: "sunrise-2027",
    icon: RiLayoutRightLine,
    color: "warning",
    // description: "News portal layout"
  },

];

function PageTemplatesGallery() {
  const navigate = useNavigate();

  const handleTemplateClick = (template) => {
    // Navigate to the specific template management page
    navigate(`/admin/gstsa1/page-templates/templates/${template.value}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Templates</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {templates.map((template) => {
          const IconComponent = template.icon;
          return (
            <Card
              key={template.id}
              isPressable
              className="hover:scale-105 transition-all duration-300 border border-default-200"
              onClick={() => handleTemplateClick(template)}
            >
              <CardBody className="flex flex-col items-center justify-center py-8 gap-4" >
                <IconComponent className={`text-${template.color} w-16 h-16`} />
                <div className="text-center">
                  <div className="text-xl font-bold text-default-700 mb-2">
                    {template.name}
                  </div>
                  <p className="text-sm text-gray-500">
                    {template.description}
                  </p>
                </div>
              </CardBody>
              <CardFooter className="flex flex-col gap-2 items-center bg-default-50">
                <Button
                  size="md"
                  color={template.color}
                  // color=""
                  variant="shadow"
                  className="w-full font-semibold"
                  radius="lg"
                  onPress={() => handleTemplateClick(template)}
                >
                  Manage Template
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default PageTemplatesGallery;
