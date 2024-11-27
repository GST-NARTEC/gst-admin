import React from "react";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";

const templates = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  name: `Template ${i + 1}`,
  image: `https://via.placeholder.com/300x200?text=Template+${i + 1}`,
}));

function PageTemplatesGallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {templates.map((template) => (
        <Card
          key={template.id}
          isPressable
          className="hover:scale-105 transition-transform"
        >
          <CardBody className="p-0">
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-48 object-cover"
            />
          </CardBody>
          <CardFooter className="flex justify-between items-center">
            <p className="text-lg font-semibold">{template.name}</p>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              className="ml-2"
            >
              Use Template
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default PageTemplatesGallery; 