import React from "react";
import WhyBarcodes from "./whyBarcodes/WhyBarcodes";
import CoreSolution from "./coreSolution/CoreSolution";
import ProServices from "./proServices/ProServices";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center mb-3 mx-10">
        <h1 className="text-2xl font-bold mx-10">Home Page</h1>
        <Button
          onPress={() => navigate(-1)}
          startContent={<BsArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>
      </div>
      <WhyBarcodes />
      <CoreSolution />
      <ProServices />
    </div>
  );
}
