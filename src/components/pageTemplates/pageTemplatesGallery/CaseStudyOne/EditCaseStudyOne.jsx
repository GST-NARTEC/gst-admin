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

function EditCaseStudyOne() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    pageId: "",
    isActive: true,
    seoDescriptionEn: "",
    seoDescriptionAr: "",

    // Hero Section
    heroHeadingEn: "",
    heroHeadingAr: "",
    heroImage: null,

    // Overview Section
    overviewContentEn: "",
    overviewContentAr: "",
    overviewQuoteEn: "",
    overviewQuoteAr: "",
    overviewAuthorEn: "",
    overviewAuthorAr: "",

    // Solution Section
    solutionTitleEn: "",
    solutionTitleAr: "",
    solutionContentEn: "",
    solutionContentAr: "",
    solutionMainImage: null,
    solutionDescriptionEn: "",
    solutionDescriptionAr: "",
    keyFeaturesEn: "",
    keyFeaturesAr: "",

    // Results Section - Left Content
    resultsContentEn: "",
    resultsContentAr: "",
    resultsImage: null,

    // Results Section - Right Content and Quote
    resultsSecondContentEn: "",
    resultsSecondContentAr: "",
    resultsQuoteEn: "",
    resultsQuoteAr: "",
    resultsAuthorEn: "",
    resultsAuthorAr: "",

    // Final Section
    finalImage: null,
    finalContentEn: "",
    finalContentAr: "",
  });

  const [previewImages, setPreviewImages] = useState({
    heroImage: null,
    solutionMainImage: null,
    resultsImage: null,
    finalImage: null,
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

  const handleSubmit = async () => {
    // TODO: Implement API call
    console.log("Form Data:", formData);
    toast.success("Case Study template created successfully");
  };

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button isIconOnly variant="light" onPress={() => navigate(-1)}>
            <IoArrowBack className="text-xl" />
          </Button>
          <h1 className="text-2xl font-bold">Edit New Case Study One</h1>
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
                  templateType="caseStudy1"
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
                  id="heroImage"
                  accept="image/*"
                  onChange={(e) => handleImageUpload("heroImage", e)}
                  className="hidden"
                />
                <label
                  htmlFor="heroImage"
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
              {previewImages.heroImage ? (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${previewImages.heroImage})`,
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
                    value={formData.heroHeadingEn}
                    onChange={(value) =>
                      handleInputChange("heroHeadingEn", value)
                    }
                    placeholder="Enter heading content in English..."
                    height="200px"
                    cardHeight="300px"
                  />
                  <RichTextEditor
                    label="Heading (Arabic)"
                    value={formData.heroHeadingAr}
                    onChange={(value) =>
                      handleInputChange("heroHeadingAr", value)
                    }
                    placeholder="Enter heading content in Arabic..."
                    height="200px"
                    isRTL
                    cardHeight="300px"
                  />
                </div>
              </div>
            </section>{" "}
            {/* Overview Section */}
            <section className="pt-32 pb-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  Overview Section
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  {/* Left Column - Overview Content */}
                  <div className="space-y-6">
                    <RichTextEditor
                      label="Overview Content (English)"
                      value={formData.overviewContentEn}
                      onChange={(value) =>
                        handleInputChange("overviewContentEn", value)
                      }
                      placeholder="Enter overview content in English..."
                      height="200px"
                      cardHeight="300px"
                    />
                    <RichTextEditor
                      label="Overview Content (Arabic)"
                      value={formData.overviewContentAr}
                      onChange={(value) =>
                        handleInputChange("overviewContentAr", value)
                      }
                      placeholder="Enter overview content in Arabic..."
                      height="200px"
                      cardHeight="300px"
                      isRTL
                    />
                  </div>

                  {/* Right Column - Quote Box */}
                  <div className="space-y-6">
                    <RichTextEditor
                      label="Quote Content (English)"
                      value={formData.overviewQuoteEn}
                      onChange={(value) =>
                        handleInputChange("overviewQuoteEn", value)
                      }
                      placeholder="Enter quote content in English..."
                      height="200px"
                      cardHeight="300px"
                    />
                    <RichTextEditor
                      label="Quote Content (Arabic)"
                      value={formData.overviewQuoteAr}
                      onChange={(value) =>
                        handleInputChange("overviewQuoteAr", value)
                      }
                      placeholder="Enter quote content in Arabic..."
                      height="200px"
                      cardHeight="300px"
                      isRTL
                    />
                  </div>
                </div>
              </div>
            </section>
            {/* Solution Section */}
            <section className="py-16 bg-white border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  Solution Section
                </h2>

                {/* First Content Block */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <RichTextEditor
                    label="Solution Content (English)"
                    value={formData.solutionContentEn}
                    onChange={(value) =>
                      handleInputChange("solutionContentEn", value)
                    }
                    placeholder="Enter solution content in English..."
                    height="200px"
                    cardHeight="300px"
                  />
                  <RichTextEditor
                    label="Solution Content (Arabic)"
                    value={formData.solutionContentAr}
                    onChange={(value) =>
                      handleInputChange("solutionContentAr", value)
                    }
                    placeholder="Enter solution content in Arabic..."
                    height="200px"
                    cardHeight="300px"
                    isRTL
                  />
                </div>

                {/* Central Image */}
                <div className="mb-12 flex justify-center">
                  <div className="w-full max-w-4xl">
                    {previewImages.solutionMainImage ? (
                      <div className="relative group">
                        <img
                          src={previewImages.solutionMainImage}
                          alt="Solution Main"
                          className="w-full h-72 object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <input
                            type="file"
                            id="solutionMainImage"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload("solutionMainImage", e)
                            }
                            className="hidden"
                          />
                          <label
                            htmlFor="solutionMainImage"
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
                          id="solutionMainImage"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload("solutionMainImage", e)
                          }
                          className="hidden"
                        />
                        <label
                          htmlFor="solutionMainImage"
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
                          Upload Main Solution Image
                        </label>
                        <p className="text-gray-500 mt-2">
                          Recommended size: 1200x400px
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Solution Description */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <RichTextEditor
                    label="Solution Description (English)"
                    value={formData.solutionDescriptionEn}
                    onChange={(value) =>
                      handleInputChange("solutionDescriptionEn", value)
                    }
                    placeholder="Enter solution description in English..."
                     height="200px"
                       cardHeight="300px"
                  />
                  <RichTextEditor
                    label="Solution Description (Arabic)"
                    value={formData.solutionDescriptionAr}
                    onChange={(value) =>
                      handleInputChange("solutionDescriptionAr", value)
                    }
                    placeholder="Enter solution description in Arabic..."
                     height="200px"
                       cardHeight="300px"
                    isRTL
                  />
                </div>

           
              </div>
            </section>
            {/* Results Section */}
            <section className="py-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  Results & Impact Section
                </h2>

                {/* First Container - Image and Main Results */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                  {/* Left Column - Image */}
                  <div className="bg-white/95 rounded-xl p-2 shadow-lg">
                    {previewImages.resultsImage ? (
                      <div className="relative group">
                        <img
                          src={previewImages.resultsImage}
                          alt="Results"
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <input
                            type="file"
                            id="resultsImage"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload("resultsImage", e)
                            }
                            className="hidden"
                          />
                          <label
                            htmlFor="resultsImage"
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
                          id="resultsImage"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("resultsImage", e)}
                          className="hidden"
                        />
                        <label
                          htmlFor="resultsImage"
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
                          Upload Results Image
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
                      label="Results Content (English)"
                      value={formData.resultsContentEn}
                      onChange={(value) =>
                        handleInputChange("resultsContentEn", value)
                      }
                      placeholder="Enter results content in English..."
                       height="200px"
                       cardHeight="300px"
                    />
                    <RichTextEditor
                      label="Results Content (Arabic)"
                      value={formData.resultsContentAr}
                      onChange={(value) =>
                        handleInputChange("resultsContentAr", value)
                      }
                      placeholder="Enter results content in Arabic..."
                        height="200px"
                       cardHeight="300px"
                      isRTL
                    />
                  </div>
                </div>

                {/* Second Container - Results Content and Quote Box */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  {/* Left Column - Additional Results Content */}
                  <div className="space-y-6">
                    <RichTextEditor
                      label="Additional Results Content (English)"
                      value={formData.resultsSecondContentEn}
                      onChange={(value) =>
                        handleInputChange("resultsSecondContentEn", value)
                      }
                      placeholder="Enter additional results content in English..."
                       height="200px"
                       cardHeight="300px"
                    />
                    <RichTextEditor
                      label="Additional Results Content (Arabic)"
                      value={formData.resultsSecondContentAr}
                      onChange={(value) =>
                        handleInputChange("resultsSecondContentAr", value)
                      }
                      placeholder="Enter additional results content in Arabic..."
                        height="200px"
                       cardHeight="300px"
                      isRTL
                    />
                  </div>

                  {/* Right Column - Quote Box */}
                  <div className="space-y-6">
                    <RichTextEditor
                      label="Results Quote (English)"
                      value={formData.resultsQuoteEn}
                      onChange={(value) =>
                        handleInputChange("resultsQuoteEn", value)
                      }
                      placeholder="Enter results quote in English..."
                        height="200px"
                       cardHeight="300px"
                    />
                    <RichTextEditor
                      label="Results Quote (Arabic)"
                      value={formData.resultsQuoteAr}
                      onChange={(value) =>
                        handleInputChange("resultsQuoteAr", value)
                      }
                      placeholder="Enter results quote in Arabic..."
                        height="200px"
                       cardHeight="300px"
                      isRTL
                    />
               
                  </div>
                </div>
              </div>
            </section>
            {/* Final Section */}
            <section className="py-16 text-white border-2 border-dashed border-gray-300 rounded-xl">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  Final Section
                </h2>

                {/* Central Image */}
                <div className="mb-12 flex justify-center">
                  <div className="w-full max-w-4xl">
                    {previewImages.finalImage ? (
                      <div className="relative group">
                        <img
                          src={previewImages.finalImage}
                          alt="Final Section"
                          className="w-full h-72 object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <input
                            type="file"
                            id="finalImage"
                            accept="image/*"
                            onChange={(e) => handleImageUpload("finalImage", e)}
                            className="hidden"
                          />
                          <label
                            htmlFor="finalImage"
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
                          id="finalImage"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("finalImage", e)}
                          className="hidden"
                        />
                        <label
                          htmlFor="finalImage"
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
                          Upload Final Section Image
                        </label>
                        <p className="text-gray-500 mt-2">
                          Recommended size: 1200x400px
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Final Content */}
                <div className="grid grid-cols-2 gap-8">
                  <RichTextEditor
                    label="Final Content (English)"
                    value={formData.finalContentEn}
                    onChange={(value) =>
                      handleInputChange("finalContentEn", value)
                    }
                    placeholder="Enter final section content in English..."
                    height="200px"
                       cardHeight="300px"
                  />
                  <RichTextEditor
                    label="Final Content (Arabic)"
                    value={formData.finalContentAr}
                    onChange={(value) =>
                      handleInputChange("finalContentAr", value)
                    }
                    placeholder="Enter final section content in Arabic..."
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
            <Button color="primary" onPress={handleSubmit}>
              Update Case Study One
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default EditCaseStudyOne;
