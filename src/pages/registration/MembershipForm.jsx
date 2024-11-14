import React, { useState, useEffect } from "react";
import { Card, useDisclosure, Chip } from "@nextui-org/react";
import { MdEmail, MdPhone, MdLocationOn, MdBusiness } from "react-icons/md";
import { FaGlobe } from "react-icons/fa";
import { useForm } from "react-hook-form";
import OtpVerificationModal from "./OtpVerificationModal";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const MembershipForm = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      companyNameAr: "",
      companyNameEn: "",
      mobileNumber: "",
      landline: "",
      country: "",
      provinceCity: "",
      streetAddress: "",
      zipCode: "",
    },
    reValidateMode: "onChange",
  });

  const email = watch("email");

  // Show verify button when valid email is entered
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setShowVerifyButton(emailRegex.test(email));
  }, [email]);

  const handleVerifyClick = () => {
    onOpen();
  };

  const [hasAttemptedEmailVerification, setHasAttemptedEmailVerification] =
    useState(false);
  const [hasAttemptedLicenseVerification, setHasAttemptedLicenseVerification] =
    useState(false);

  const handleOtpVerify = (otp) => {
    const isValid = otp === "1234";
    setIsVerified(isValid);
    setHasAttemptedEmailVerification(true);
    onOpenChange(false);
  };

  const [isLicenseVerified, setIsLicenseVerified] = useState(false);
  const [showLicenseVerifyButton, setShowLicenseVerifyButton] = useState(false);
  const [isLicenseInvalid, setIsLicenseInvalid] = useState(false);

  const handleLicenseVerify = () => {
    const licenseNo = watch("companyLicenseNo");
    const isValid = licenseNo === "9912345678";
    setIsLicenseVerified(isValid);
    setIsLicenseInvalid(!isValid);
    setHasAttemptedLicenseVerification(true);
  };

  useEffect(() => {
    const licenseNo = watch("companyLicenseNo") || "";
    if (licenseNo.length === 10) {
      setShowLicenseVerifyButton(true);
      setIsLicenseInvalid(false);
    } else {
      setShowLicenseVerifyButton(false);
    }
    if (isLicenseVerified || isLicenseInvalid) {
      setIsLicenseVerified(false);
      setIsLicenseInvalid(false);
    }
  }, [watch("companyLicenseNo")]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/register/barcodes");
  };

  return (
    <>
      <div className=" mx-10">
        <div className=" mx-auto bg-whit  overflow-hidden">
          <div className="border-b border-gray-100 bg-white px-8 ">
            <h2 className="text-2xl font-semibold text-gray-800">
              International Barcode Number Registration Form
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Please fill in your International Barcode Number information
            </p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Email and License Number Row */}
              <div className="relative">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <MdEmail className="w-4 h-4 mr-2 text-navy-700" />
                    Email Address
                    <span className="text-red-500 ml-1">*</span>
                  </div>
                  {hasAttemptedEmailVerification && (
                    <Chip
                      startContent={
                        isVerified ? (
                          <BsCheckCircleFill className="text-green-500" />
                        ) : (
                          <BsXCircleFill className="text-red-500" />
                        )
                      }
                      variant="flat"
                      color={isVerified ? "success" : "danger"}
                      size="sm"
                    >
                      {isVerified ? "Verified" : "Unverified"}
                    </Chip>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email",
                      },
                    })}
                    className={`w-full px-4 py-2.5 border ${
                      errors.email ? "border-red-500" : "border-gray-400"
                    } rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white`}
                    placeholder="Enter email address"
                  />
                  {showVerifyButton && !isVerified && (
                    <button
                      onClick={handleVerifyClick}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-navy-600 text-white rounded-md text-sm hover:bg-navy-700 transition-colors"
                    >
                      Verify
                    </button>
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <MdBusiness className="w-4 h-4 mr-2 text-navy-700" />
                    Company License No
                    <span className="text-red-500 ml-1">*</span>
                  </div>
                  {hasAttemptedLicenseVerification && (
                    <Chip
                      startContent={
                        isLicenseVerified ? (
                          <BsCheckCircleFill className="text-green-500" />
                        ) : (
                          <BsXCircleFill className="text-red-500" />
                        )
                      }
                      variant="flat"
                      color={isLicenseVerified ? "success" : "danger"}
                      size="sm"
                    >
                      {isLicenseVerified ? "Verified" : "Unverified"}
                    </Chip>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    disabled={!isVerified}
                    {...register("companyLicenseNo", {
                      required: "License number is required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Please enter a valid 10-digit license number",
                      },
                    })}
                    maxLength={10}
                    className={`w-full px-4 py-2.5 border ${
                      isLicenseInvalid ? "border-red-500" : "border-gray-400"
                    } rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent outline-none bg-gray-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed`}
                    placeholder="Enter 10-digit license number"
                  />
                  {showLicenseVerifyButton &&
                    !isLicenseVerified &&
                    !isLicenseInvalid && (
                      <button
                        onClick={handleLicenseVerify}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-navy-600 text-white rounded-md text-sm hover:bg-navy-700 transition-colors "
                      >
                        Verify
                      </button>
                    )}
                </div>
                {errors.companyLicenseNo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyLicenseNo.message}
                  </p>
                )}
                {isLicenseInvalid && (
                  <p className="text-red-500 text-sm mt-1">
                    Invalid license number
                  </p>
                )}
              </div>

              {/* Company Names Row */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MdBusiness className="w-4 h-4 mr-2 text-navy-700" />
                  Company Name (English)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  disabled={!isVerified || !isLicenseVerified}
                  {...register("companyNameEn", {
                    required: "Company name is required",
                  })}
                  className="w-full px-4 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent outline-none bg-gray-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter company name"
                />
                {errors.companyNameEn && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyNameEn.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MdBusiness className="w-4 h-4 mr-2 text-navy-700" />
                  Company Name (Arabic)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  disabled={!isVerified || !isLicenseVerified}
                  {...register("companyNameAr", {
                    required: "Company name is required",
                  })}
                  className="w-full px-4 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent outline-none bg-gray-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="اسم الشركة"
                  dir="rtl"
                />
                {errors.companyNameAr && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyNameAr.message}
                  </p>
                )}
              </div>

              {/* Phone Numbers Row */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MdPhone className="w-4 h-4 mr-2 text-navy-700" />
                  Landline
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex">
                  <select
                    disabled={!isVerified || !isLicenseVerified}
                    className="px-3 py-2.5 border border-gray-400 rounded-l-lg bg-gray-50 text-gray-600 focus:ring-2 focus:ring-navy-600 focus:border-transparent outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option>+966</option>
                    <option>+960</option>
                  </select>
                  <input
                    type="tel"
                    disabled={!isVerified || !isLicenseVerified}
                    {...register("landline", {
                      required: "Landline number is required",
                    })}
                    className="w-full px-4 py-2.5 border border-gray-400 rounded-r-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent outline-none bg-gray-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter landline number"
                  />
                </div>
                {errors.landline && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.landline.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MdPhone className="w-4 h-4 mr-2 text-navy-700" />
                  Mobile Number
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex">
                  <select
                    disabled={!isVerified || !isLicenseVerified}
                    className="px-3 py-2.5 border border-gray-400 rounded-l-lg bg-gray-50 text-gray-600 focus:ring-2 focus:ring-navy-600 focus:border-transparent outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option>+966</option>
                    <option>+960</option>
                  </select>
                  <input
                    type="tel"
                    disabled={!isVerified || !isLicenseVerified}
                    {...register("mobileNumber", {
                      required: "Mobile number is required",
                    })}
                    className="w-full px-4 py-2.5 border border-gray-400 rounded-r-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent outline-none bg-gray-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter mobile number"
                  />
                </div>
                {errors.mobileNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobileNumber.message}
                  </p>
                )}
              </div>

              {/* Location Row 1 */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaGlobe className="w-4 h-4 mr-2 text-navy-700" />
                  Country
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  disabled={!isVerified || !isLicenseVerified}
                  {...register("country", {
                    required: "Country is required",
                  })}
                  className="w-full px-4 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent outline-none bg-gray-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option>United Arab Emirates</option>
                  <option>Saudi Arabia</option>
                  <option>Qatar</option>
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MdLocationOn className="w-4 h-4 mr-2 text-navy-700" />
                  Region
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  disabled={!isVerified || !isLicenseVerified}
                  {...register("region", {
                    required: "Region is required",
                  })}
                  className="w-full px-4 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent outline-none bg-gray-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option>Eastern Region</option>
                  <option>Western Region</option>
                  <option>Central Region</option>
                </select>
                {errors.region && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.region.message}
                  </p>
                )}
              </div>

              {/* Location Row 2 */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MdLocationOn className="w-4 h-4 mr-2 text-navy-700" />
                  City
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  disabled={!isVerified || !isLicenseVerified}
                  {...register("city", {
                    required: "City is required",
                  })}
                  className="w-full px-4 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent outline-none bg-gray-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option>Abu Dhabi</option>
                  <option>Dubai</option>
                  <option>Sharjah</option>
                </select>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MdLocationOn className="w-4 h-4 mr-2 text-navy-700" />
                  Zip Code
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  disabled={!isVerified || !isLicenseVerified}
                  {...register("zipCode", {
                    required: "Zip code is required",
                  })}
                  className="w-full px-4 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent outline-none bg-gray-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter zip code"
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>

              {/* Street Address - Full Width */}
              <div className="col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MdLocationOn className="w-4 h-4 mr-2 text-navy-700" />
                  Street Address
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  disabled={!isVerified || !isLicenseVerified}
                  {...register("streetAddress", {
                    required: "Street address is required",
                  })}
                  className="w-full px-4 py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent outline-none bg-gray-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter street address"
                />
                {errors.streetAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.streetAddress.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button - Navy Blue */}
            <div className="mt-8">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-navy-600 text-white py-3 rounded-lg hover:bg-navy-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isVerified || !isLicenseVerified || !isValid}
              >
                Save & Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <OtpVerificationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onVerify={handleOtpVerify}
        email={email}
      />
    </>
  );
};

export default MembershipForm;
