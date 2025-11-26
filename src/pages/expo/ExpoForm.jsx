import React, { useState, useEffect, useRef } from 'react';
import { Images } from '../../assets/Index';
import { FiUser, FiPhone, FiMail, FiCheckCircle, FiX } from 'react-icons/fi';
import { BsBuilding } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { useCreateExhibitVisitorMutation } from '../../store/apis/endpoints/expo';
import Confetti from 'react-confetti';

// Gemini API Key
const GEMINI_API_KEY = 'AIzaSyC3Gxn5GKez6xkWrn1xgxl_CXqG7_gz09A';

function ExpoForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: ''
  });

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [createVisitor, { isLoading, isSuccess, isError, error, reset }] = useCreateExhibitVisitorMutation();

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle success
  useEffect(() => {
    if (isSuccess) {
      toast.success('Registration submitted successfully!');
      setShowConfetti(true);
      
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
        setShowConfetti(false);
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

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

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

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Unable to access camera. Please ensure you have granted camera permissions.');
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
    stopCamera();
  };

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
    // Small delay to ensure modal is rendered and video ref is available
    setTimeout(startCamera, 100);
  };

  // Gemini API functions
  const getAvailableModels = async () => {
    try {
      const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`;
      const response = await fetch(listUrl);
      
      if (response.ok) {
        const data = await response.json();
        return data.models || [];
      }
    } catch (error) {
      console.error('Error fetching available models:', error);
    }
    return [];
  };

  const scanBusinessCard = async (imageData) => {
    // Remove data URL prefix
    const base64Image = imageData.split(',')[1];
    
    const prompt = `Analyze this business card image and extract the following information in JSON format:
{
  "name": "full name of the person",
  "phone": "phone number",
  "email": "email address",
  "company": "company name"
}

If any information is not found, use null for that field. Return only valid JSON, no additional text.`;

    const requestBody = {
        contents: [{
            parts: [
                { text: prompt },
                {
                    inline_data: {
                        mime_type: "image/jpeg",
                        data: base64Image
                    }
                }
            ]
        }]
    };

    try {
        // First, try to get available models
        const availableModels = await getAvailableModels();
        
        // Filter out embedding, imagen, and other non-generative models
        const generativeModels = availableModels.filter(m => {
            const name = m.name.toLowerCase();
            return name.includes('gemini') && 
                   !name.includes('embedding') && 
                   !name.includes('imagen') &&
                   !name.includes('gemma') &&
                   !name.includes('aqa') &&
                   !name.includes('robotics') &&
                   !name.includes('computer-use') &&
                   !name.includes('learnlm');
        });
        
        // Extract model names and prioritize vision-capable models
        const availableModelNames = generativeModels.map(m => {
            const fullName = m.name;
            // Remove "models/" prefix if present
            return fullName.includes('/') ? fullName.split('/').pop() : fullName;
        });
        
        // List of models to try in order of preference
        const modelsToTry = [
            'gemini-2.5-pro',
            'gemini-2.5-flash',
            'gemini-2.0-flash',
            'gemini-2.0-pro-exp',
            'gemini-flash-latest',
            'gemini-pro-latest',
            'gemini-1.5-pro',
            'gemini-1.5-flash',
            'gemini-pro',
            'gemini-pro-vision',
            'gemini-1.0-pro',
            'gemini-1.0-pro-vision'
        ];
        
        // Filter to only models that are available
        let models = modelsToTry.filter(m => availableModelNames.includes(m));
        
        // If no preferred models match, use any available gemini model
        if (models.length === 0 && availableModelNames.length > 0) {
            const flashModels = availableModelNames.filter(m => m.includes('flash'));
            const proModels = availableModelNames.filter(m => m.includes('pro'));
            models = flashModels.length > 0 ? flashModels : (proModels.length > 0 ? proModels : availableModelNames.slice(0, 3));
        }
        
        if (models.length === 0) {
            throw new Error('No suitable Gemini models found. Please check your API key permissions.');
        }
        
        let lastError = null;
        
        // Try each model
        for (const modelName of models) {
            try {
                // Try v1beta first
                let apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
                
                let response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                });
                
                // If 404, try v1
                if (!response.ok && response.status === 404) {
                    apiUrl = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
                    response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody)
                    });
                }
                
                if (response.ok) {
                    const data = await response.json();
                    
                    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                        continue; 
                    }
                    
                    const text = data.candidates[0].content.parts[0].text;
                    
                    let jsonText = text.trim();
                    if (jsonText.startsWith('```')) {
                        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                    }
                    
                    const extractedData = JSON.parse(jsonText);
                    return extractedData;
                } else {
                    const errorText = await response.text();
                    lastError = { status: response.status, message: errorText };
                }
            } catch (error) {
                lastError = error;
                continue;
            }
        }
        
        if (lastError) {
            throw new Error(`All models failed. Last error: ${lastError.status || lastError.message}`);
        }
        
        throw new Error('No available models found');
        
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw new Error(`Failed to scan business card: ${error.message}`);
    }
  };

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      
      setIsScanning(true);
      
      const extractedData = await scanBusinessCard(imageData);
      
      // Fill form with extracted data
      setFormData(prev => ({
        ...prev,
        name: extractedData.name || prev.name,
        phone: extractedData.phone || prev.phone,
        email: extractedData.email || prev.email,
        company: extractedData.company || prev.company
      }));

      const filledFields = Object.values(extractedData).filter(v => v !== null && v !== '').length;
      
      if (filledFields > 0) {
        toast.success('Card scanned successfully!');
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      } else {
        toast('Could not extract information. Please enter details manually.', { icon: '⚠️' });
      }
      
      handleCloseCamera();
    } catch (error) {
      console.error('Error scanning card:', error);
      toast.error('Error scanning business card. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-4 sm:p-8">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={200} />}
      
      <div className="w-full max-w-xl flex flex-col items-center gap-8">
        {/* Logo Section - Moved Outside */}
        <div className="text-center animate-[fadeIn_0.5s_ease-out]">
          <img 
            src={Images.Logo} 
            alt="Global Standard Technology" 
            className="max-w-[200px] h-auto mx-auto drop-shadow-md"
          />
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-10 w-full animate-[slideUp_0.5s_ease-out]">
          {/* Title and Scan Button - Justified Between */}
          <div className="flex flex-row items-center justify-between mb-8 border-b border-gray-100 pb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-navy-700 relative inline-block">
             Visitor Registration
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-red-900 via-red-800 to-red-700 rounded-full"></span>
            </h1>
            
            <button 
              type="button"
              onClick={handleOpenCamera}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-navy-600 text-navy-700 rounded-lg hover:bg-navy-50 transition-all duration-300 group shadow-sm whitespace-nowrap"
              title="Scan Business Card"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" ry="2"/>
                  <line x1="7" y1="9" x2="17" y2="9"/>
                  <line x1="7" y1="13" x2="17" y2="13"/>
                  <line x1="7" y1="17" x2="13" y2="17"/>
              </svg>
              <span className="font-semibold text-sm hidden sm:inline">Scan Card</span>
            </button>
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

      {/* Camera Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Scan Business Card</h2>
              <button 
                onClick={handleCloseCamera}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Camera View */}
            <div className="relative bg-black aspect-[4/3] flex items-center justify-center overflow-hidden">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Overlay Frame */}
              <div className="absolute inset-0 border-[50px] border-black/50 pointer-events-none">
                <div className="w-full h-full border-2 border-white/50 relative">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white"></div>
                </div>
              </div>
              
              <p className="absolute bottom-8 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
                Position business card within the frame
              </p>

              {/* Loading Overlay */}
              {isScanning && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4"></div>
                  <p className="text-white font-medium">Scanning business card...</p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="p-6 bg-white flex gap-4">
              <button 
                onClick={handleCloseCamera}
                className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                disabled={isScanning}
              >
                Cancel
              </button>
              <button 
                onClick={handleCapture}
                className="flex-1 py-3 px-4 rounded-xl bg-navy-700 text-white font-semibold hover:bg-navy-800 transition-colors shadow-lg shadow-navy-700/20 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isScanning}
              >
                Capture & Scan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpoForm;