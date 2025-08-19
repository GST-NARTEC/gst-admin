import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";
import { useTranslation } from "react-i18next";

function SubscriptionForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state?.selectedPlan;
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

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

    if (!formData.firstname)
      newErrors.firstname = t("subscriptionForm.firstNameRequired");
    if (!formData.lastname)
      newErrors.lastname = t("subscriptionForm.lastNameRequired");
    if (!formData.email) newErrors.email = t("subscriptionForm.emailRequired");
    if (!formData.mobile || formData.mobile.length < 10) {
      newErrors.mobile = t("subscriptionForm.mobileRequired");
    }
    if (!formData.company_website)
      newErrors.company_website = t("subscriptionForm.websiteRequired");

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
      // Determine subscription type based on plan price
      const subscriptionType = selectedPlan.price === "0" ? "free" : "paid";

      // Prepare API payload
      const payload = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        mobile: formData.mobile,
        email: formData.email,
        company_website: formData.company_website,
        subscription_type: subscriptionType,
        plan_id: selectedPlan.id,
      };

      console.log("Submitting form data:", payload);

      // Make API call to register user
      const response = await fetch(
        "https://printpack.gtrack.online/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // Handle success
        const planDisplayName = isArabic
          ? selectedPlan.display_name_ar || selectedPlan.display_name
          : selectedPlan.display_name;
        toast.success(
          t("subscriptionForm.registrationSuccess", {
            planName: planDisplayName,
          })
        );

        // Redirect to member login page
        setTimeout(() => {
          window.location.href = "https://printpack.gtrack.online/member-login";
        }, 1500); // Give time for the success toast to show
      } else {
        // Handle API error response
        let errorMessage = t("subscriptionForm.registrationFailed");

        // Show the exact error message from API
        if (data.error) {
          errorMessage = data.error;
        } else if (data.message) {
          errorMessage = data.message;
        }

        toast.error(errorMessage);
        console.error("API Error:", data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t("subscriptionForm.networkError"));
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (price === "0") return t("subscriptionForm.free");
    return `SAR ${parseInt(price).toLocaleString()}`;
  };

  if (!selectedPlan) {
    return (
      <WebsiteLayout>
        <div
          className="min-h-screen bg-gray-50 flex items-center justify-center"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t("subscriptionForm.noPlanSelected")}
            </h2>
            <p className="text-gray-600 mb-4">
              {t("subscriptionForm.noPlanSelectedDesc")}
            </p>
            <button
              onClick={() => navigate("/print-pack/pricing")}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary"
            >
              {t("subscriptionForm.viewPlans")}
            </button>
          </div>
        </div>
      </WebsiteLayout>
    );
  }

  return (
    <WebsiteLayout>
      <div
        className="min-h-screen bg-gray-50 py-12"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Selected Plan Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("subscriptionForm.selectedPlan")}
                </h2>

                <div className="border-2 border-green-200 rounded-xl p-6 bg-green-50">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {isArabic
                        ? selectedPlan.display_name_ar ||
                          selectedPlan.display_name
                        : selectedPlan.display_name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {isArabic
                        ? selectedPlan.description_ar ||
                          selectedPlan.description
                        : selectedPlan.description}
                    </p>

                    <div className="mb-4">
                      <span className="text-3xl font-bold text-green-600">
                        {formatPrice(selectedPlan.price)}
                      </span>
                      {selectedPlan.price !== "0" && (
                        <span className="text-gray-600 text-sm ml-1">
                          /{t(`pricingCards.${selectedPlan.billing_cycle}`)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">
                      {t("subscriptionForm.includedFeatures")}
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
                          {isArabic
                            ? service.display_name_ar || service.name
                            : service.name}
                        </span>
                      </div>
                    ))}
                    {selectedPlan.services.length > 3 && (
                      <p className="text-sm text-gray-600">
                        + {selectedPlan.services.length - 3}
                        {t("subscriptionForm.moreFeatures")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => navigate("/print-pack/pricing")}
                    className="text-primary hover:text-primary text-sm font-medium"
                  >
                    {t("subscriptionForm.changePlan")}
                  </button>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("subscriptionForm.registrationInfo")}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t("subscriptionForm.personalInfo")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t("subscriptionForm.firstName")}{" "}
                          {t("subscriptionForm.required")}
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
                          placeholder={t(
                            "subscriptionForm.firstNamePlaceholder"
                          )}
                        />
                        {errors.firstname && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.firstname}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t("subscriptionForm.lastName")}{" "}
                          {t("subscriptionForm.required")}
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
                          placeholder={t(
                            "subscriptionForm.lastNamePlaceholder"
                          )}
                        />
                        {errors.lastname && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.lastname}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t("subscriptionForm.email")}{" "}
                          {t("subscriptionForm.required")}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder={t("subscriptionForm.emailPlaceholder")}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t("subscriptionForm.mobileNumber")}{" "}
                          {t("subscriptionForm.required")}
                        </label>
                        <PhoneInput
                          country={"sa"}
                          value={formData.mobile}
                          onChange={(phone) => {
                            setFormData((prev) => ({
                              ...prev,
                              mobile: phone,
                            }));

                            // Clear error when user starts typing
                            if (errors.mobile) {
                              setErrors((prev) => ({
                                ...prev,
                                mobile: "",
                              }));
                            }
                          }}
                          inputClass={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.mobile ? "border-red-500" : "border-gray-300"
                          }`}
                          containerClass="w-full"
                          buttonClass="border-gray-300"
                          dropdownClass="border-gray-300"
                          searchClass="w-full px-3 py-2 border border-gray-300 rounded"
                          // enableSearch={true}
                          // disableSearchIcon={false}
                          placeholder={t("subscriptionForm.mobilePlaceholder")}
                        />
                        {errors.mobile && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.mobile}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t("subscriptionForm.companyWebsite")}{" "}
                          {t("subscriptionForm.required")}
                        </label>
                        <input
                          type="text"
                          name="company_website"
                          value={formData.company_website}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.company_website
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder={t("subscriptionForm.websitePlaceholder")}
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
                          {t("subscriptionForm.processing")}
                        </div>
                      ) : (
                        `${t(
                          "subscriptionForm.completeRegistration"
                        )} - ${formatPrice(selectedPlan.price)}`
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
