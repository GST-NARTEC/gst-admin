import { Card } from "@nextui-org/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Stepper() {
  const location = useLocation();
  const currentPath = location.pathname;

  const steps = [
    { number: 1, title: "Personal Info", path: "/register/membership-form" },
    { number: 2, title: "Barcodes", path: "/register/barcodes" },
    { number: 3, title: "Payment", path: "/register/payment" },
  ];

  const getCurrentStep = () => {
    return steps.findIndex((step) => step.path === currentPath) + 1;
  };

  return (
    <div className="bg-navy-600 min-h-screen">
      <Card className="px-4 pt-8 container  mx-auto rounded-md shadow-lg bg-white">
        <div className="flex items-start max-w-screen-lg mx-ato mx-28">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={index !== steps.length - 1 ? "w-full" : ""}
            >
              <div className="flex items-center w-full">
                <div
                  className={`w-8 h-8 shrink-0 mx-[-1px] p-1.5 flex items-center justify-center rounded-full
                    ${
                      getCurrentStep() >= step.number
                        ? "bg-navy-600"
                        : "bg-gray-300"
                    }`}
                >
                  <span className="text-base text-white font-bold">
                    {step.number}
                  </span>
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className={`w-full h-1 mx-4 rounded-lg 
                      ${
                        getCurrentStep() > step.number
                          ? "bg-navy-600"
                          : "bg-gray-300"
                      }`}
                  />
                )}
              </div>
              <div
                className={`mt-2 ${index !== steps.length - 1 ? "mr-4" : ""}`}
              >
                <h6
                  className={`text-base font-bold 
                    ${
                      getCurrentStep() >= step.number
                        ? "text-navy-600"
                        : "text-gray-400"
                    }`}
                >
                  {step.title}
                </h6>
                <p className="text-xs text-gray-400">
                  {getCurrentStep() > step.number
                    ? "Completed"
                    : getCurrentStep() === step.number
                    ? "In Progress"
                    : "Pending"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Outlet />
        </div>
      </Card>
    </div>
  );
}

export default Stepper;
