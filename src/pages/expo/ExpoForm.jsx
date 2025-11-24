import React, { useState, useEffect } from 'react';
import { Images } from '../../assets/Index';
import { FiUser, FiPhone, FiMail, FiCheckCircle } from 'react-icons/fi';
import { BsBuilding } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { useCreateExhibitVisitorMutation } from '../../store/apis/endpoints/expo';

function ExpoForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: ''
  });

  const [createVisitor, { isLoading, isSuccess, isError, error, reset }] = useCreateExhibitVisitorMutation();

  // Handle success
  useEffect(() => {
    if (isSuccess) {
      toast.success('Registration submitted successfully!');
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        company: ''
      });

      // Reset mutation state after 5 seconds
      const timer = setTimeout(() => {
        reset();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, reset]);

  // Handle error
  useEffect(() => {
    if (isError) {
      const message = error?.data?.message || error?.error || 'Failed to submit registration. Please try again.';
      toast.error(message);
    }
  }, [isError, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createVisitor(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-4 sm:p-8">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 w-full max-w-xl animate-[slideUp_0.5s_ease-out]">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <img 
            src={Images.Logo} 
            alt="Global Standard Technology" 
            className="max-w-[180px] h-auto mx-auto mb-2"
          />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy-700 mb-3 relative inline-block">
           Visitor Registration
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-red-900 via-red-800 to-red-700 rounded-full"></span>
          </h1>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg animate-[slideDown_0.3s_ease-out]">
            <div className="flex items-center">
              <FiCheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <div>
                <p className="text-green-800 font-semibold">Registration Successful!</p>
                <p className="text-green-700 text-sm">Thank you for registering. We'll be in touch soon.</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-gray-700 text-sm font-semibold">
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 pr-12 py-3.5 text-gray-800 bg-white border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={isLoading}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-800 pointer-events-none">
                <FiUser className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Mobile/Phone Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-gray-700 text-sm font-semibold">
              Mobile/Phone
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-4 pr-12 py-3.5 text-gray-800 bg-white border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={isLoading}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-800 pointer-events-none">
                <FiPhone className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-700 text-sm font-semibold">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full px-4 pr-12 py-3.5 text-gray-800 bg-white border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={isLoading}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-800 pointer-events-none">
                <FiMail className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Company Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="company" className="text-gray-700 text-sm font-semibold">
              Company
            </label>
            <div className="relative">
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter your company name"
                className="w-full px-4 pr-12 py-3.5 text-gray-800 bg-white border-2 border-navy-600 rounded-lg outline-none transition-all duration-300 focus:border-navy-700 focus:ring-4 focus:ring-navy-600/20 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={isLoading}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-800 pointer-events-none">
                <BsBuilding className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-6 px-6 py-4 text-white text-base font-semibold bg-gradient-to-r from-navy-700 via-red-900 to-red-800 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <span className="relative z-10">Submitting...</span>
              </>
            ) : (
              <>
                <span className="relative z-10">Submit Registration</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              </>
            )}
          </button>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-gray-50 border-l-4 border-navy-600 rounded">
            <p className="text-sm text-gray-700">
              <span className="font-bold text-gray-900">Disclaimer:</span>{' '}
              <span className="text-gray-600">This information is for business contact purposes only</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpoForm;