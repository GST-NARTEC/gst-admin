import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import OverlayLoader from "../../../common/OverlayLoader";

// api
import {
  useGetTemplateQuery,
  useUpdateTemplateMutation,
} from "../../../../store/apis/endpoints/templates";

function EditCaseStudyOne() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: templateData, isLoading: isLoadingTemplate } =
    useGetTemplateQuery({
      templateType: "caseStudyTemplate1",
      pageId: id,
    });

  const [updateTemplate, { isLoading: isUpdating }] =
    useUpdateTemplateMutation();

  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    pageId: "",
    isActive: true,
    seoDescriptionEn: "",
    seoDescriptionAr: "",
    headingEn: "",
    headingAr: "",
    image1: null,
    description1En: "",
    description1Ar: "",
    descriptionQuote1En: "",
    descriptionQuote1Ar: "",
    descriptionAuthor1En: "",
    descriptionAuthor1Ar: "",
    description2En: "",
    description2Ar: "",
    description3En: "",
    description3Ar: "",
    image2: null,
    description4En: "",
    description4Ar: "",
    description5En: "",
    description5Ar: "",
    description6En: "",
    description6Ar: "",
    image3: null,
    description7En: "",
    description7Ar: "",
    descriptionQuote2En: "",
    descriptionQuote2Ar: "",
    descriptionAuthor2En: "",
    descriptionAuthor2Ar: "",
    image4: null,
    description8En: "",
    description8Ar: "",
  });

  const [previewImages, setPreviewImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    console.log("Template Data:", templateData); // Debug log
    if (templateData?.data?.template) {
      const template = templateData?.data?.template;
      console.log("Image1 URL:", template.image1); // Debug log for image1
      const populatedData = {
        nameEn: template.nameEn || "",
        nameAr: template.nameAr || "",
        pageId: template.pageId || "",
        isActive: template.isActive,
        seoDescriptionEn: template.seoDescriptionEn || "",
        seoDescriptionAr: template.seoDescriptionAr || "",
        headingEn: template.headingEn || "",
        headingAr: template.headingAr || "",
        image1: template.image1 || null, // Will be handled separately for file uploads
        description1En: template.description1En || "",
        description1Ar: template.description1Ar || "",
        descriptionQuote1En: template.descriptionQuote1En || "",
        descriptionQuote1Ar: template.descriptionQuote1Ar || "",
        descriptionAuthor1En: template.descriptionAuthor1En || "",
        descriptionAuthor1Ar: template.descriptionAuthor1Ar || "",
        description2En: template.description2En || "",
        description2Ar: template.description2Ar || "",
        description3En: template.description3En || "",
        description3Ar: template.description3Ar || "",
        image2: template.image2 || null, // Will be handled separately for file uploads
        description4En: template.description4En || "",
        description4Ar: template.description4Ar || "",
        description5En: template.description5En || "",
        description5Ar: template.description5Ar || "",
        description6En: template.description6En || "",
        description6Ar: template.description6Ar || "",
        image3: template.image3 || null, // Will be handled separately for file uploads
        description7En: template.description7En || "",
        description7Ar: template.description7Ar || "",
        descriptionQuote2En: template.descriptionQuote2En || "",
        descriptionQuote2Ar: template.descriptionQuote2Ar || "",
        descriptionAuthor2En: template.descriptionAuthor2En || "",
        descriptionAuthor2Ar: template.descriptionAuthor2Ar || "",
        image4: template.image4 || null, // Will be handled separately for file uploads
        description8En: template.description8En || "",
        description8Ar: template.description8Ar || "",
      };

      setFormData(populatedData);
      setInitialData(populatedData);

      // Set existing images for preview
      setPreviewImages({
        image1: template.image1 || null,
        image2: template.image2 || null,
        image3: template.image3 || null,
        image4: template.image4 || null,
      });
    }
  }, [templateData]);

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
    const formDataToSend = new FormData();
    let hasChanges = false;

    // Check for changes in text fields
    Object.keys(formData).forEach((key) => {
      if (!["image1", "image2", "image3", "image4"].includes(key)) {
        if (formData[key] !== initialData[key]) {
          formDataToSend.append(key, formData[key]);
          hasChanges = true;
        }
      }
    });

    // Check for image changes
    ["image1", "image2", "image3", "image4"].forEach((imageKey) => {
      if (formData[imageKey] instanceof File) {
        formDataToSend.append(imageKey, formData[imageKey]);
        hasChanges = true;
      }
    });

    if (!hasChanges) {
      toast.info("No changes detected");
      return;
    }

    try {
      await updateTemplate({
        templateType: "caseStudyTemplate1",
        id: templateData?.data?.template?.id,
        data: formDataToSend,
      }).unwrap();

      toast.success("Case Study template updated successfully");
      navigate(-1);
    } catch (err) {
      console.error("Failed to update case study template:", err);
      toast.error(err?.data?.message || "Failed to update template");
    }
  };

  if (isLoadingTemplate) {
    return <OverlayLoader />;
  }

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button isIconOnly variant="light" onPress={() => navigate(-1)}>
            <IoArrowBack className="text-xl" />
          </Button>
          <h1 className="text-2xl font-bold">Edit Case Study One</h1>
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
                  templateType="case-study-one"
                  disabled
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
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
                    backgroundImage: `url("${previewImages.image1.replace(
                      /\\/g,
                      "/"
                    )}")`,
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
                      value={formData.description1En}
                      onChange={(value) =>
                        handleInputChange("description1En", value)
                      }
                      placeholder="Enter overview content in English..."
                      height="200px"
                      cardHeight="300px"
                    />
                    <RichTextEditor
                      label="Overview Content (Arabic)"
                      value={formData.description1Ar}
                      onChange={(value) =>
                        handleInputChange("description1Ar", value)
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
                      value={formData.descriptionQuote1En}
                      onChange={(value) =>
                        handleInputChange("descriptionQuote1En", value)
                      }
                      placeholder="Enter quote content in English..."
                      height="150px"
                      cardHeight="250px"
                    />
                    <RichTextEditor
                      label="Quote Content (Arabic)"
                      value={formData.descriptionQuote1Ar}
                      onChange={(value) =>
                        handleInputChange("descriptionQuote1Ar", value)
                      }
                      placeholder="Enter quote content in Arabic..."
                      height="150px"
                      cardHeight="250px"
                      isRTL
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Quote Author (English)"
                        placeholder="Enter author name"
                        value={formData.descriptionAuthor1En}
                        onChange={(e) =>
                          handleInputChange(
                            "descriptionAuthor1En",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        label="Quote Author (Arabic)"
                        placeholder="Enter author name in Arabic"
                        value={formData.descriptionAuthor1Ar}
                        onChange={(e) =>
                          handleInputChange(
                            "descriptionAuthor1Ar",
                            e.target.value
                          )
                        }
                      />
                    </div>
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

                {/* Solution Title */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <Input
                    label="Solution Title (English)"
                    placeholder="Enter solution title"
                    value={formData.description2En}
                    onChange={(e) =>
                      handleInputChange("description2En", e.target.value)
                    }
                  />
                  <Input
                    label="Solution Title (Arabic)"
                    placeholder="Enter solution title in Arabic"
                    value={formData.description2Ar}
                    onChange={(e) =>
                      handleInputChange("description2Ar", e.target.value)
                    }
                  />
                </div>

                {/* Solution Content */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <RichTextEditor
                    label="Solution Content (English)"
                    value={formData.description3En}
                    onChange={(value) =>
                      handleInputChange("description3En", value)
                    }
                    placeholder="Enter solution content in English..."
                    height="200px"
                    cardHeight="300px"
                  />
                  <RichTextEditor
                    label="Solution Content (Arabic)"
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

                {/* Central Image */}
                <div className="mb-12 flex justify-center">
                  <div className="w-full max-w-4xl">
                    {previewImages.image2 ? (
                      <div className="relative group">
                        <img
                          src={previewImages.image2.replace(/\\/g, "/")}
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
                    value={formData.description4En}
                    onChange={(value) =>
                      handleInputChange("description4En", value)
                    }
                    placeholder="Enter solution description in English..."
                    height="200px"
                    cardHeight="300px"
                  />
                  <RichTextEditor
                    label="Solution Description (Arabic)"
                    value={formData.description4Ar}
                    onChange={(value) =>
                      handleInputChange("description4Ar", value)
                    }
                    placeholder="Enter solution description in Arabic..."
                    height="200px"
                    cardHeight="300px"
                    isRTL
                  />
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-2 gap-8">
                  <RichTextEditor
                    label="Key Features (English)"
                    value={formData.description5En}
                    onChange={(value) =>
                      handleInputChange("description5En", value)
                    }
                    placeholder="Enter key features in English..."
                    height="200px"
                    cardHeight="300px"
                  />
                  <RichTextEditor
                    label="Key Features (Arabic)"
                    value={formData.description5Ar}
                    onChange={(value) =>
                      handleInputChange("description5Ar", value)
                    }
                    placeholder="Enter key features in Arabic..."
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
                    {previewImages.image3 ? (
                      <div className="relative group">
                        <img
                          src={previewImages.image3.replace(/\\/g, "/")}
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
                      value={formData.description6En}
                      onChange={(value) =>
                        handleInputChange("description6En", value)
                      }
                      placeholder="Enter results content in English..."
                      height="200px"
                      cardHeight="300px"
                    />
                    <RichTextEditor
                      label="Results Content (Arabic)"
                      value={formData.description6Ar}
                      onChange={(value) =>
                        handleInputChange("description6Ar", value)
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
                      value={formData.description7En}
                      onChange={(value) =>
                        handleInputChange("description7En", value)
                      }
                      placeholder="Enter additional results content in English..."
                      height="200px"
                      cardHeight="300px"
                    />
                    <RichTextEditor
                      label="Additional Results Content (Arabic)"
                      value={formData.description7Ar}
                      onChange={(value) =>
                        handleInputChange("description7Ar", value)
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
                      value={formData.descriptionQuote2En}
                      onChange={(value) =>
                        handleInputChange("descriptionQuote2En", value)
                      }
                      placeholder="Enter results quote in English..."
                      height="150px"
                      cardHeight="250px"
                    />
                    <RichTextEditor
                      label="Results Quote (Arabic)"
                      value={formData.descriptionQuote2Ar}
                      onChange={(value) =>
                        handleInputChange("descriptionQuote2Ar", value)
                      }
                      placeholder="Enter results quote in Arabic..."
                      height="150px"
                      cardHeight="250px"
                      isRTL
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Quote Author (English)"
                        placeholder="Enter author name"
                        value={formData.descriptionAuthor2En}
                        onChange={(e) =>
                          handleInputChange(
                            "descriptionAuthor2En",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        label="Quote Author (Arabic)"
                        placeholder="Enter author name in Arabic"
                        value={formData.descriptionAuthor2Ar}
                        onChange={(e) =>
                          handleInputChange(
                            "descriptionAuthor2Ar",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Final Section */}
            <section className="py-16 bg-white border-2 border-dashed border-gray-300 rounded-xl">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  Final Section
                </h2>

                {/* Central Image */}
                <div className="mb-12 flex justify-center">
                  <div className="w-full max-w-4xl">
                    {previewImages.image4 ? (
                      <div className="relative group">
                        <img
                          src={previewImages.image4.replace(/\\/g, "/")}
                          alt="Final Section"
                          className="w-full h-72 object-cover rounded-lg shadow-lg"
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
                      <div className="h-72 bg-gray-100 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
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
                    value={formData.description8En}
                    onChange={(value) =>
                      handleInputChange("description8En", value)
                    }
                    placeholder="Enter final section content in English..."
                    height="200px"
                    cardHeight="300px"
                  />
                  <RichTextEditor
                    label="Final Content (Arabic)"
                    value={formData.description8Ar}
                    onChange={(value) =>
                      handleInputChange("description8Ar", value)
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
            <Button
              color="primary"
              onPress={handleSubmit}
              isLoading={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Case Study"}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default EditCaseStudyOne;
