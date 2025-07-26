import React, { useState, useEffect } from "react";
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";
import { useNavigate } from "react-router-dom";

function PricingCards() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      try {
        const response = await fetch(
          "https://printpack.gtrack.online/api/subscriptionPlans"
        );
        const data = await response.json();

        if (data.success) {
          setPlans(data.data);
        } else {
          setError("Failed to fetch subscription plans");
        }
      } catch (err) {
        setError("Error fetching subscription plans");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionPlans();
  }, []);

  const formatPrice = (price) => {
    if (price === "0") return "Free";
    return ` SAR ${parseInt(price).toLocaleString()}`;
  };

  const getPlanColor = (planName) => {
    switch (planName) {
      case "free_services":
        return "border-gray-300 bg-white";
      case "standard":
        return "border-blue-300 bg-blue-50";
      case "professional":
        return "border-purple-300 bg-purple-50";
      case "enterprise":
        return "border-green-300 bg-green-50";
      default:
        return "border-gray-300 bg-white";
    }
  };

  const getButtonColor = (planName, isPopular) => {
    if (isPopular) {
      return "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white";
    }

    switch (planName) {
      case "free_services":
        return "bg-gray-600 hover:bg-gray-700 text-white";
      case "standard":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      case "professional":
        return "bg-purple-600 hover:bg-purple-700 text-white";
      case "enterprise":
        return "bg-green-600 hover:bg-green-700 text-white";
      default:
        return "bg-gray-600 hover:bg-gray-700 text-white";
    }
  };

  if (loading) {
    return (
      <WebsiteLayout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">
                Loading subscription plans...
              </p>
            </div>
          </div>
        </div>
      </WebsiteLayout>
    );
  }

  if (error) {
    return (
      <WebsiteLayout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-red-600 text-xl">{error}</div>
            </div>
          </div>
        </div>
      </WebsiteLayout>
    );
  }

  const handleSubscription = (plan) => {
    // Handle subscription logic here, e.g., redirect to payment page or show modal
    navigate("/print-pack/subscription", { state: { selectedPlan: plan } });
    console.log("Selected Plan:", plan);
  };

  return (
    <WebsiteLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get GS1 2027 compliant with our comprehensive barcode and
              integration solutions. From basic audits to enterprise-grade
              customizations.
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl shadow-xl ${getPlanColor(
                  plan.name
                )} border-2 transform hover:scale-105 transition-all duration-300 ${
                  plan.is_popular ? "ring-4 ring-green-200" : ""
                }`}
              >
                {/* Popular Badge */}
                {plan.is_popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8 h-full flex flex-col">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {/* make the first letter capital */}
                      {plan.display_name.charAt(0).toUpperCase() +
                        plan.display_name.slice(1)}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900">
                        {formatPrice(plan.price)}
                      </span>
                      {plan.price !== "0" && (
                        <span className="text-gray-600 text-sm ml-1">
                          /{plan.billing_cycle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="flex-1 mb-6">
                    <ul className="space-y-3 h-full">
                      {plan.services.slice(0, 4).map((service) => (
                        <li key={service.id} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {service.name}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {service.description}
                            </p>
                          </div>
                        </li>
                      ))}
                      {plan.services.length > 4 && (
                        <li className="text-sm text-gray-600 font-medium">
                          + {plan.services.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => handleSubscription(plan)}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${getButtonColor(
                        plan.name,
                        plan.is_popular
                      )}`}
                    >
                      {plan.price === "0" ? "Get Started Free" : "Choose Plan"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info Section */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose Our GS1 2027 Compliance Solutions?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    GS1 Certified
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Fully compliant with GS1 2027 standards
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Fast Implementation
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Quick setup and migration support
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    24/7 Support
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Expert assistance whenever you need it
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}

export default PricingCards;
