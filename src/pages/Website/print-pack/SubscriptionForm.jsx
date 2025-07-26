import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";

function SubscriptionForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state?.selectedPlan;

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    company_website: "",
    membership_category: selectedPlan?.name || "",
    plan_id: selectedPlan?.id || "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedPlan) {
      navigate("/print-pack/pricing");
    }
  }, [selectedPlan, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (!formData.company_website)
      newErrors.company_website = "Company website is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Here you would make the API call to submit the form
      console.log("Submitting form data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Handle success (redirect to payment or success page)
      alert("Registration successful! Redirecting to payment...");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (price === "0") return "Free";
    return `SAR ${parseInt(price).toLocaleString()}`;
  };

  if (!selectedPlan) {
    return (
      <WebsiteLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Plan Selected
            </h2>
            <p className="text-gray-600 mb-4">Please select a plan first.</p>
            <button
              onClick={() => navigate("/print-pack/pricing")}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary"
            >
              View Plans
            </button>
          </div>
        </div>
      </WebsiteLayout>
    );
  }

  return (
    <WebsiteLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Selected Plan Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Selected Plan
                </h2>

                <div className="border-2 border-green-200 rounded-xl p-6 bg-green-50">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedPlan.display_name.charAt(0).toUpperCase() +
                        selectedPlan.display_name.slice(1)}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {selectedPlan.description}
                    </p>

                    <div className="mb-4">
                      <span className="text-3xl font-bold text-green-600">
                        {formatPrice(selectedPlan.price)}
                      </span>
                      {selectedPlan.price !== "0" && (
                        <span className="text-gray-600 text-sm ml-1">
                          /{selectedPlan.billing_cycle}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">
                      Included Features:
                    </h4>
                    {selectedPlan.services.slice(0, 3).map((service) => (
                      <div key={service.id} className="flex items-start">
                        <svg
                          className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-gray-700">
                          {service.name}
                        </span>
                      </div>
                    ))}
                    {selectedPlan.services.length > 3 && (
                      <p className="text-sm text-gray-600">
                        + {selectedPlan.services.length - 3} more features
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => navigate("/print-pack/pricing")}
                    className="text-primary hover:text-primary text-sm font-medium"
                  >
                    ← Change Plan
                  </button>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Registration Information
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.firstname
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter your first name"
                        />
                        {errors.firstname && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.firstname}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastname"
                          value={formData.lastname}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.lastname
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter your last name"
                        />
                        {errors.lastname && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.lastname}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter your email address"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.mobile ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="+966 XX XXX XXXX"
                        />
                        {errors.mobile && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.mobile}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Website *
                        </label>
                        <input
                          type="url"
                          name="company_website"
                          value={formData.company_website}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.company_website
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="https://www.yourcompany.com"
                        />
                        {errors.company_website && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.company_website}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-semibold hover:from-primary hover:to-primary focus:ring-4 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        `Complete Registration - ${formatPrice(
                          selectedPlan.price
                        )}`
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}

export default SubscriptionForm;
