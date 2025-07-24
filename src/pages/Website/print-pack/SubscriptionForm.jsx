import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";

function SubscriptionForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state?.selectedPlan;

  const [formData, setFormData] = useState({
    email: "",
    company_name_eng: "",
    company_name_arabic: "",
    tin_number: "",
    cr_number: "",
    cr_activity: "",
    contact_person: "",
    mobile: "",
    company_landline: "",
    business_type: "organization",
    country: "Saudi Arabia",
    state: "",
    city: "",
    zip_code: "",
    membership_category: selectedPlan?.name || "",
    user_source: "gst",
    industry_types: [],
    plan_id: selectedPlan?.id || "",
    payment_method: "credit_card",
    notes: "User registering via GST website",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Sample industry types (you might want to fetch these from an API)
  const industryOptions = [
    { id: "1", name: "Technology" },
    { id: "2", name: "Software Development" },
    { id: "3", name: "Manufacturing" },
    { id: "4", name: "Healthcare" },
    { id: "5", name: "Finance" },
    { id: "6", name: "Retail" },
    { id: "7", name: "Education" },
    { id: "8", name: "Logistics" },
  ];

  const saudiStates = [
    "Riyadh",
    "Makkah",
    "Eastern Province",
    "Asir",
    "Jazan",
    "Madinah",
    "Qassim",
    "Tabuk",
    "Hail",
    "Northern Borders",
    "Najran",
    "Al Bahah",
    "Al Jouf",
  ];

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

  const handleIndustryChange = (industryId) => {
    const industry = industryOptions.find((ind) => ind.id === industryId);
    if (!industry) return;

    setFormData((prev) => {
      const exists = prev.industry_types.find((ind) => ind.id === industryId);
      if (exists) {
        return {
          ...prev,
          industry_types: prev.industry_types.filter(
            (ind) => ind.id !== industryId
          ),
        };
      } else {
        return {
          ...prev,
          industry_types: [...prev.industry_types, industry],
        };
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.company_name_eng)
      newErrors.company_name_eng = "Company name in English is required";
    if (!formData.contact_person)
      newErrors.contact_person = "Contact person is required";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (!formData.tin_number) newErrors.tin_number = "TIN number is required";
    if (!formData.cr_number) newErrors.cr_number = "CR number is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.zip_code) newErrors.zip_code = "Zip code is required";
    if (formData.industry_types.length === 0)
      newErrors.industry_types = "Please select at least one industry type";

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
                  Company Registration
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Company Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name (English) *
                        </label>
                        <input
                          type="text"
                          name="company_name_eng"
                          value={formData.company_name_eng}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.company_name_eng
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter company name in English"
                        />
                        {errors.company_name_eng && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.company_name_eng}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name (Arabic)
                        </label>
                        <input
                          type="text"
                          name="company_name_arabic"
                          value={formData.company_name_arabic}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="اسم الشركة بالعربية"
                          dir="rtl"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          TIN Number *
                        </label>
                        <input
                          type="text"
                          name="tin_number"
                          value={formData.tin_number}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.tin_number
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter TIN number"
                        />
                        {errors.tin_number && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.tin_number}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CR Number *
                        </label>
                        <input
                          type="text"
                          name="cr_number"
                          value={formData.cr_number}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.cr_number
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter CR number"
                        />
                        {errors.cr_number && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.cr_number}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CR Activity
                        </label>
                        <input
                          type="text"
                          name="cr_activity"
                          value={formData.cr_activity}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter CR activity"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          name="contact_person"
                          value={formData.contact_person}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.contact_person
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter contact person name"
                        />
                        {errors.contact_person && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.contact_person}
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
                          placeholder="Enter email address"
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

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Landline
                        </label>
                        <input
                          type="tel"
                          name="company_landline"
                          value={formData.company_landline}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+966 XX XXX XXXX"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Location Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State/Province *
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.state ? "border-red-500" : "border-gray-300"
                          }`}
                        >
                          <option value="">Select State</option>
                          {saudiStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        {errors.state && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.state}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.city ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter city"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Zip Code *
                        </label>
                        <input
                          type="text"
                          name="zip_code"
                          value={formData.zip_code}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.zip_code
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter zip code"
                        />
                        {errors.zip_code && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.zip_code}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Industry Types */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Industry Types *
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {industryOptions.map((industry) => (
                        <label
                          key={industry.id}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.industry_types.some(
                              (ind) => ind.id === industry.id
                            )}
                            onChange={() => handleIndustryChange(industry.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            {industry.name}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.industry_types && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.industry_types}
                      </p>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Payment Method
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment_method"
                          value="credit_card"
                          checked={formData.payment_method === "credit_card"}
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Credit Card</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment_method"
                          value="bank_transfer"
                          checked={formData.payment_method === "bank_transfer"}
                          onChange={handleInputChange}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Bank Transfer</span>
                      </label>
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
