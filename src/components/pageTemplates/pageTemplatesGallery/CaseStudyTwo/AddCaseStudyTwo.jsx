import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../../../layout/AdminLayouts/MainLayout";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Card,
  CardBody,
} from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import RichTextEditor from "../common/RichTextEditor";
import SlugInput from "../common/SlugInput";
import { toast } from "react-hot-toast";

// api
import { useCreateTemplateMutation } from "../../../../store/apis/endpoints/templates";

function AddCaseStudyTwo() {
  const navigate = useNavigate();

  const [createTemplate, { isLoading, isError, isSuccess, error }] =
    useCreateTemplateMutation();

  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    pageId: "",
    isActive: true,
    seoDescriptionEn: "",
    seoDescriptionAr: "",

    // Hero Section (maps to image1 in DB)
    headingEn: "",
    headingAr: "",
    image1: null,

    // Overview Section
    description1En: "",
    description1Ar: "",
    descriptionQuote1En: "",
    descriptionQuote1Ar: "",
    descriptionAuthor1En: "",
    descriptionAuthor1Ar: "",

    // Solution Section (maps to image2 in DB)
    description2En: "",
    description2Ar: "",
    description3En: "",
    description3Ar: "",
    image2: null,
    description4En: "",
    description4Ar: "",
    description5En: "",
    description5Ar: "",

    // Results Section (maps to image3 in DB)
    description6En: "",
    description6Ar: "",
    image3: null,
    description7En: "",
    description7Ar: "",
    descriptionQuote2En: "",
    descriptionQuote2Ar: "",
    descriptionAuthor2En: "",
    descriptionAuthor2Ar: "",

    // Final Section (maps to image4 in DB)
    image4: null,
    description8En: "",
    description8Ar: "",

    // Additional images for separate sections
    image5: null,
    image6: null,
  });

  const [previewImages, setPreviewImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    image6: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      handleInputChange(field, file);
      setPreviewImages((prev) => ({
        ...prev,
        [field]: URL.createObjectURL(file),
      }));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    } else if (isSuccess) {
      toast.success("Case Study template created successfully");
      navigate(-1);
    }
  }, [isError, error, isSuccess, navigate]);

  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    // Basic information
    formDataToSend.append("nameEn", formData.nameEn);
    formDataToSend.append("nameAr", formData.nameAr);
    formDataToSend.append("pageId", formData.pageId);
    formDataToSend.append("isActive", formData.isActive);
    formDataToSend.append("seoDescriptionEn", formData.seoDescriptionEn);
    formDataToSend.append("seoDescriptionAr", formData.seoDescriptionAr);

    // Hero Section
    formDataToSend.append("headingEn", formData.headingEn);
    formDataToSend.append("headingAr", formData.headingAr);
    if (formData.image1) formDataToSend.append("image1", formData.image1);

    // About The Client Section
    formDataToSend.append("description1En", formData.description1En);
    formDataToSend.append("description1Ar", formData.description1Ar);
    if (formData.image2) formDataToSend.append("image2", formData.image2);

    // The Challenges Section
    formDataToSend.append("description2En", formData.description2En);
    formDataToSend.append("description2Ar", formData.description2Ar);
    if (formData.image3) formDataToSend.append("image3", formData.image3);

    // The Solution Section
    formDataToSend.append("description3En", formData.description3En);
    formDataToSend.append("description3Ar", formData.description3Ar);
    if (formData.image4) formDataToSend.append("image4", formData.image4);

    // Workflow Highlights Section
    formDataToSend.append("description4En", formData.description4En);
    formDataToSend.append("description4Ar", formData.description4Ar);
    if (formData.image5) formDataToSend.append("image5", formData.image5);

    // Results & Key Benefits Section
    formDataToSend.append("description5En", formData.description5En);
    formDataToSend.append("description5Ar", formData.description5Ar);

    // Key Learnings Section
    formDataToSend.append("description6En", formData.description6En);
    formDataToSend.append("description6Ar", formData.description6Ar);

    // The Technology Section
    formDataToSend.append("description7En", formData.description7En);
    formDataToSend.append("description7Ar", formData.description7Ar);
    if (formData.image6) formDataToSend.append("image6", formData.image6);

    // Partner Highlights Section
    formDataToSend.append("description8En", formData.description8En);
    formDataToSend.append("description8Ar", formData.description8Ar);

    try {
      await createTemplate({
        templateType: "caseStudyTemplate2",
        data: formDataToSend,
      }).unwrap();
    } catch (err) {
      console.error("Failed to create case study template:", err);
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button isIconOnly variant="light" onPress={() => navigate(-1)}>
            <IoArrowBack className="text-xl" />
          </Button>
          <h1 className="text-2xl font-bold">Add New Case Study Two</h1>
        </div>

        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* Basic Info Card */}
          <Card>
            <CardBody className="gap-4">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Page Name"
                  placeholder="Enter Page Name"
                  value={formData.nameEn}
                  onChange={(e) => handleInputChange("nameEn", e.target.value)}
                />
                <Input
                  label="Page Name [Arabic]"
                  placeholder="Enter Page Name in Arabic"
                  value={formData.nameAr}
                  onChange={(e) => handleInputChange("nameAr", e.target.value)}
                />
                <SlugInput
                  value={formData.pageId}
                  onChange={(id) => handleInputChange("pageId", id)}
                  templateType="case-study-two"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="SEO Description"
                  placeholder="Enter SEO Description"
                  value={formData.seoDescriptionEn}
                  onChange={(e) =>
                    handleInputChange("seoDescriptionEn", e.target.value)
                  }
                />
                <Input
                  label="SEO Description [Arabic]"
                  placeholder="Enter SEO Description in Arabic"
                  value={formData.seoDescriptionAr}
                  onChange={(e) =>
                    handleInputChange("seoDescriptionAr", e.target.value)
                  }
                />

                <Select
                  label="Status"
                  selectedKeys={[String(formData.isActive)]}
                  onSelectionChange={(keys) =>
                    handleInputChange(
                      "isActive",
                      Array.from(keys)[0] === "true"
                    )
                  }
                >
                  <SelectItem key="true" value="true">
                    Active
                  </SelectItem>
                  <SelectItem key="false" value="false">
                    Inactive
                  </SelectItem>
                </Select>
              </div>
            </CardBody>
          </Card>

          {/* Template Content */}
          <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <section className="relative h-screen border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-quaternary/50" />

              {/* Hero Image Upload Button */}
              <div className="absolute top-4 right-4 z-20">
                <input
                  type="file"
                  id="image1"
                  accept="image/*"
                  onChange={(e) => handleImageUpload("image1", e)}
                  className="hidden"
                />
                <label
                  htmlFor="image1"
                  className="cursor-pointer bg-white/90 hover:bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Upload Background
                </label>
              </div>

              {/* Hero Background */}
              {previewImages.image1 ? (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${previewImages.image1})`,
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <p className="text-gray-500">Upload a background image</p>
                </div>
              )}

              {/* Hero Heading Rich Text Editors */}
              <div className="relative z-10 container mx-auto px-6 pt-16">
                <div className="grid grid-cols-2 gap-8">
                  <RichTextEditor
                    label="Heading (English)"
                    value={formData.headingEn}
                    onChange={(value) => handleInputChange("headingEn", value)}
                    placeholder="Enter heading content in English..."
                    height="200px"
                    cardHeight="300px"
                  />
                  <RichTextEditor
                    label="Heading (Arabic)"
                    value={formData.headingAr}
                    onChange={(value) => handleInputChange("headingAr", value)}
                    placeholder="Enter heading content in Arabic..."
                    height="200px"
                    isRTL
                    cardHeight="300px"
                  />
                </div>
              </div>
            </section>
            {/* client Section */}
            <section className="py-16 bg-white border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  About The Client
                </h2>

                {/* client Content */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <RichTextEditor
                    label="About The Client (English)"
                    value={formData.description1En}
                    onChange={(value) =>
                      handleInputChange("description1En", value)
                    }
                    placeholder="Enter about the client in English..."
                    height="200px"
                    cardHeight="300px"
                  />
                  <RichTextEditor
                    label="About The Client (Arabic)"
                    value={formData.description1Ar}
                    onChange={(value) =>
                      handleInputChange("description1Ar", value)
                    }
                    placeholder="Enter about the client in Arabic..."
                    height="200px"
                    cardHeight="300px"
                    isRTL
                  />
                </div>

                {/* Central Image */}
                <div className="mb-12 flex justify-center">
                  <div className="w-full max-w-4xl">
                    {previewImages.image2 ? (
                      <div className="relative group">
                        <img
                          src={previewImages.image2}
                          alt="Solution Main"
                          className="w-full h-72 object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <input
                            type="file"
                            id="image2"
                            accept="image/*"
                            onChange={(e) => handleImageUpload("image2", e)}
                            className="hidden"
                          />
                          <label
                            htmlFor="image2"
                            className="cursor-pointer bg-white px-4 py-2 rounded-full shadow-lg"
                          >
                            Change Image
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="h-72 bg-gray-100 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                        <input
                          type="file"
                          id="image2"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("image2", e)}
                          className="hidden"
                        />
                        <label
                          htmlFor="image2"
                          className="cursor-pointer bg-primary text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Upload Main About Image
                        </label>
                        <p className="text-gray-500 mt-2">
                          Recommended size: 1200x400px
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
            {/* The Challenges Section */}
            <section className="py-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  The Challenges
                </h2>

                {/* First Container - Image and Main Results */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                  {/* Right Column - Main Results Content */}
                  <div className="space-y-6">
                    <RichTextEditor
                      label="Challenges (English)"
                      value={formData.description2En}
                      onChange={(value) =>
                        handleInputChange("description2En", value)
                      }
                      placeholder="Enter challenges content in English..."
                      height="200px"
                      cardHeight="300px"
                    />
                    <RichTextEditor
                      label="Challenges (Arabic)"
                      value={formData.description2Ar}
                      onChange={(value) =>
                        handleInputChange("description2Ar", value)
                      }
                      placeholder="Enter challenges content in Arabic..."
                      height="200px"
                      cardHeight="300px"
                      isRTL
                    />
                  </div>

                  {/* Left Column - Image */}
                  <div className="bg-white/95 rounded-xl p-2 shadow-lg">
                    {previewImages.image3 ? (
                      <div className="relative group">
                        <img
                          src={previewImages.image3}
                          alt="Results"
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <input
                            type="file"
                            id="image3"
                            accept="image/*"
                            onChange={(e) => handleImageUpload("image3", e)}
                            className="hidden"
                          />
                          <label
                            htmlFor="image3"
                            className="cursor-pointer bg-white px-4 py-2 rounded-full shadow-lg"
                          >
                            Change Image
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="h-80 bg-gray-100 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                        <input
                          type="file"
                          id="image3"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("image3", e)}
                          className="hidden"
                        />
                        <label
                          htmlFor="image3"
                          className="cursor-pointer bg-primary text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Upload Challenges Image
                        </label>
                        <p className="text-gray-500 mt-2">
                          Recommended size: 800x600px
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
            {/* The Solution Section */}
            <section className="py-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  The Solution
                </h2>

                {/* First Container - Image and Main Results */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                  {/* Left Column - Image */}
                  <div className="bg-white/95 rounded-xl p-2 shadow-lg">
                    {previewImages.image4 ? (
                      <div className="relative group">
                        <img
                          src={previewImages.image4}
                          alt="Solution"
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <input
                            type="file"
                            id="image4"
                            accept="image/*"
                            onChange={(e) => handleImageUpload("image4", e)}
                            className="hidden"
                          />
                          <label
                            htmlFor="image4"
                            className="cursor-pointer bg-white px-4 py-2 rounded-full shadow-lg"
                          >
                            Change Image
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="h-80 bg-gray-100 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                        <input
                          type="file"
                          id="image4"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("image4", e)}
                          className="hidden"
                        />
                        <label
                          htmlFor="image4"
                          className="cursor-pointer bg-primary text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Upload Solution Image
                        </label>
                        <p className="text-gray-500 mt-2">
                          Recommended size: 800x600px
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Main Results Content */}
                  <div className="space-y-6">
                    <RichTextEditor
                      label="Solution (English)"
                      value={formData.description3En}
                      onChange={(value) =>
                        handleInputChange("description3En", value)
                      }
                      placeholder="Enter solution content in English..."
                      height="200px"
                      cardHeight="300px"
                    />
                    <RichTextEditor
                      label="Solution (Arabic)"
                      value={formData.description3Ar}
                      onChange={(value) =>
                        handleInputChange("description3Ar", value)
                      }
                      placeholder="Enter solution content in Arabic..."
                      height="200px"
                      cardHeight="300px"
                      isRTL
                    />
                  </div>
                </div>
              </div>
            </section>
            {/* Workflow Highlights Section */}
            <section className="py-16 bg-white border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  Workflow Highlights
                </h2>

                {/* client Content */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <RichTextEditor
                    label="Workflow Highlights (English)"
                    value={formData.description4En}
                    onChange={(value) =>
                      handleInputChange("description4En", value)
                    }
                    placeholder="Enter workflow highlights in English..."
                    height="200px"
                    cardHeight="300px"
                  />
                  <RichTextEditor
                    label="Workflow Highlights (Arabic)"
                    value={formData.description4Ar}
                    onChange={(value) =>
                      handleInputChange("description4Ar", value)
                    }
                    placeholder="Enter workflow highlights in Arabic..."
                    height="200px"
                    cardHeight="300px"
                    isRTL
                  />
                </div>

                {/* Central Image */}
                <div className="mb-12 flex justify-center">
                  <div className="w-full max-w-4xl">
                    {previewImages.image5 ? (
                      <div className="relative group">
                        <img
                          src={previewImages.image5}
                          alt="Workflow Highlights"
                          className="w-full h-72 object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <input
                            type="file"
                            id="image5"
                            accept="image/*"
                            onChange={(e) => handleImageUpload("image5", e)}
                            className="hidden"
                          />
                          <label
                            htmlFor="image5"
                            className="cursor-pointer bg-white px-4 py-2 rounded-full shadow-lg"
                          >
                            Change Image
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="h-72 bg-gray-100 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                        <input
                          type="file"
                          id="image5"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("image5", e)}
                          className="hidden"
                        />
                        <label
                          htmlFor="image5"
                          className="cursor-pointer bg-primary text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Upload Workflow Highlights Image
                        </label>
                        <p className="text-gray-500 mt-2">
                          Recommended size: 1200x400px
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
            {/* results and key learnings */}
            <section className="py-16 bg-white border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  Results & Key Benefits Key Learnings
                </h2>

                {/* Results & Key Benefits */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <RichTextEditor
                    label="Results & Key Benefits (English)"
                    value={formData.description5En}
                    onChange={(value) =>
                      handleInputChange("description5En", value)
                    }
                    placeholder="Enter results & key benefits in English..."
                    height="200px"
                    cardHeight="300px"
                  />
                  <RichTextEditor
                    label="Results & Key Benefits (Arabic)"
                    value={formData.description5Ar}
                    onChange={(value) =>
                      handleInputChange("description5Ar", value)
                    }
                    placeholder="Enter results & key benefits in Arabic..."
                    height="200px"
                    cardHeight="300px"
                    isRTL
                  />
                </div>

                {/* Key Learnings */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <RichTextEditor
                    label="Key Learnings (English)"
                    value={formData.description6En}
                    onChange={(value) =>
                      handleInputChange("description6En", value)
                    }
                    placeholder="Enter key learnings in English..."
                    height="200px"
                    cardHeight="300px"
                  />
                  <RichTextEditor
                    label="Key Learnings (Arabic)"
                    value={formData.description6Ar}
                    onChange={(value) =>
                      handleInputChange("description6Ar", value)
                    }
                    placeholder="Enter key learnings in Arabic..."
                    height="200px"
                    cardHeight="300px"
                    isRTL
                  />
                </div>
              </div>
            </section>
            {/* Technology Section */}
            <section className="py-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  The Technology
                </h2>

                {/* First Container - Image and Main Results */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                  {/* Left Column - Image */}
                  <div className="bg-white/95 rounded-xl p-2 shadow-lg">
                    {previewImages.image6 ? (
                      <div className="relative group">
                        <img
                          src={previewImages.image6}
                          alt="Technology"
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <input
                            type="file"
                            id="image6"
                            accept="image/*"
                            onChange={(e) => handleImageUpload("image6", e)}
                            className="hidden"
                          />
                          <label
                            htmlFor="image6"
                            className="cursor-pointer bg-white px-4 py-2 rounded-full shadow-lg"
                          >
                            Change Image
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="h-80 bg-gray-100 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                        <input
                          type="file"
                          id="image6"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("image6", e)}
                          className="hidden"
                        />
                        <label
                          htmlFor="image6"
                          className="cursor-pointer bg-primary text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Upload Technology Image
                        </label>
                        <p className="text-gray-500 mt-2">
                          Recommended size: 800x600px
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Main Results Content */}
                  <div className="space-y-6">
                    <RichTextEditor
                      label="Technology (English)"
                      value={formData.description7En}
                      onChange={(value) =>
                        handleInputChange("description7En", value)
                      }
                      placeholder="Enter technology content in English..."
                      height="200px"
                      cardHeight="300px"
                    />
                    <RichTextEditor
                      label="Technology (Arabic)"
                      value={formData.description7Ar}
                      onChange={(value) =>
                        handleInputChange("description7Ar", value)
                      }
                      placeholder="Enter technology content in Arabic..."
                      height="200px"
                      cardHeight="300px"
                      isRTL
                    />
                  </div>
                </div>
              </div>
            </section>
            {/* Partner Highlight Section */}
            <section className="py-16 bg-white border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  Partner Highlights
                </h2>

                {/* Partner Highlight Content */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <RichTextEditor
                    label="Partner Highlight (English)"
                    value={formData.description8En}
                    onChange={(value) =>
                      handleInputChange("description8En", value)
                    }
                    placeholder="Enter partner highlight in English..."
                    height="200px"
                    cardHeight="300px"
                  />
                  <RichTextEditor
                    label="Partner Highlight (Arabic)"
                    value={formData.description8Ar}
                    onChange={(value) =>
                      handleInputChange("description8Ar", value)
                    }
                    placeholder="Enter partner highlight in Arabic..."
                    height="200px"
                    cardHeight="300px"
                    isRTL
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button color="danger" variant="light" onPress={() => navigate(-1)}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleSubmit}
              isLoading={isLoading}
            >
              {isLoading ? "Creating..." : "Create Case Study"}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AddCaseStudyTwo;
