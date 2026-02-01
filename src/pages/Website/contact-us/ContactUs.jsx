import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import WebsiteLayout from "../../../layout/WebsiteLayouts/Layout";
import { useSubmitContactFormMutation } from "../../../store/apis/endpoints/websiteEndpoints/contact-us";

function ContactUs() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    companyName: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  // use RTK Query mutation for submitting contact form
  const [submitContact, { isLoading }] = useSubmitContactFormMutation();

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

    if (!formData.name) newErrors.name = t("contactUs.validation.nameRequired");
    if (!formData.email)
      newErrors.email = t("contactUs.validation.emailRequired");
    if (!formData.subject)
      newErrors.subject = t("contactUs.validation.subjectRequired");
    if (!formData.message)
      newErrors.message = t("contactUs.validation.messageRequired");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = t("contactUs.validation.emailInvalid");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      // call the backend API (POST /contact-us)
      await submitContact(formData).unwrap();

      toast.success(t("contactUs.success"));

      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        companyName: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // try to show a helpful message if available from the API
      const message =
        error?.data?.message || error?.error || t("contactUs.error");
      toast.error(message);
    }
  };

  return (
    <WebsiteLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t("contactUs.title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("contactUs.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information Card */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg p-8 text-white h-fit sticky top-8">
                <h2 className="text-2xl font-bold mb-8">
                  {t("contactUs.contactInformation")}
                </h2>

                {/* Address */}
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0 w-6 h-6 mt-1">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-white leading-relaxed">
                      1st Floor Office 02 Dist, Anas Ibn Malik Rd,
                      <br />
                      Al Malqa, Riyadh 13524
                      <br />
                      Kingdom of Saudi Arabia
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0 w-6 h-6 mt-1">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-white">info@gstsa1.org</p>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 mt-1">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-white">+966 9200 51091</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contactUs.formLabels.name")}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder={t("contactUs.placeholders.name")}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contactUs.formLabels.email")}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder={t("contactUs.placeholders.email")}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Mobile and Company Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contactUs.formLabels.mobile")}
                      </label>
                      <PhoneInput
                        country={"sa"}
                        value={formData.mobile}
                        onChange={(phone) => {
                          setFormData((prev) => ({
                            ...prev,
                            mobile: phone,
                          }));
                        }}
                        inputClass="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        containerClass="w-full"
                        buttonClass="border-gray-300 rounded-l-lg px-3 py-3"
                        dropdownClass="border-gray-300 rounded-lg shadow-lg"
                        inputStyle={{
                          width: "100%",
                          height: "48px",
                          paddingLeft: "48px",
                          fontSize: "16px",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                        }}
                        buttonStyle={{
                          height: "48px",
                          borderRadius: "8px 0 0 8px",
                          border: "1px solid #d1d5db",
                          borderRight: "none",
                        }}
                        placeholder="+966"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contactUs.formLabels.companyName")}
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        placeholder={t("contactUs.placeholders.companyName")}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contactUs.formLabels.subject")}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                        errors.subject ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={t("contactUs.placeholders.subject")}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contactUs.formLabels.message")}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-vertical ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={t("contactUs.placeholders.message")}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Privacy Notice */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-6">
                      {t("contactUs.privacyNotice")}
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 px-6 rounded-lg font-semibold hover:from-tertiary hover:to-primary focus:ring-4 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          {t("contactUs.buttons.sending")}
                        </>
                      ) : (
                        <>
                          {t("contactUs.buttons.submit")}
                          <svg
                            className="w-5 h-5 ml-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </>
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

export default ContactUs;
