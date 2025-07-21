import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../../../layout/AdminLayouts/MainLayout";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import RichTextEditor from "../common/RichTextEditor";
import SlugInput from "../common/SlugInput";
import { toast } from "react-hot-toast";

// api
import {
  useGetTemplateQuery,
  useUpdateTemplateMutation,
} from "../../../../store/apis/endpoints/templates";

function EditSunrise() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: templateData, isLoading: isLoadingTemplate } =
    useGetTemplateQuery({
      templateType: "sunrize2027Template",
      pageId: id,
    });

  const [updateTemplate, { isLoading: isUpdating, isError, isSuccess, error }] =
    useUpdateTemplateMutation();

  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    pageId: "",
    isActive: true,
    seoDescriptionEn: "",
    seoDescriptionAr: "",

    // Hero Section
    headingEn: "",
    headingAr: "",
    image1: null,

    // What is GST Sunrise 2027?
    description1En: "",
    description1Ar: "",
    image2: null,
    buttonText1En: "",
    buttonText1Ar: "",
    buttonLink1: "",

    // Transition to 2D Barcodes
    description2En: "",
    description2Ar: "",

    // Industries Empowered
    industriesTitleEn: "",
    industriesTitleAr: "",
    buttonText2En: "",
    buttonText2Ar: "",
    buttonLink2: "",

    // Industry content
    image3: null, // Retail image
    retailContentEn: "",
    retailContentAr: "",

    image4: null, // Logistics image
    logisticsContentEn: "",
    logisticsContentAr: "",

    image5: null, // Manufacturing image
    manufacturingContentEn: "",
    manufacturingContentAr: "",

    image6: null, // Healthcare image
    healthcareContentEn: "",
    healthcareContentAr: "",

    // GS1 Digital Link
    description3En: "",
    description3Ar: "",
    image7: null,

    // Support 2D Barcodes
    description4En: "",
    description4Ar: "",

    // CTA Section
    description5En: "",
    description5Ar: "",
  });

  const [previewImages, setPreviewImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    image6: null,
    image7: null,
  });

  useEffect(() => {
    if (templateData?.data) {
      const data = templateData.data?.template;
      setFormData({
        nameEn: data.nameEn || "",
        nameAr: data.nameAr || "",
        pageId: data.pageId || "",
        isActive: data.isActive ?? true,
        seoDescriptionEn: data.seoDescriptionEn || "",
        seoDescriptionAr: data.seoDescriptionAr || "",

        headingEn: data.headingEn || "",
        headingAr: data.headingAr || "",

        description1En: data.description1En || "",
        description1Ar: data.description1Ar || "",
        buttonText1En: data.buttonText1En || "",
        buttonText1Ar: data.buttonText1Ar || "",
        buttonLink1: data.buttonLink1 || "",

        description2En: data.description2En || "",
        description2Ar: data.description2Ar || "",

        industriesTitleEn: data.industriesTitleEn || "",
        industriesTitleAr: data.industriesTitleAr || "",
        buttonText2En: data.buttonText2En || "",
        buttonText2Ar: data.buttonText2Ar || "",
        buttonLink2: data.buttonLink2 || "",

        retailContentEn: data.retailContentEn || "",
        retailContentAr: data.retailContentAr || "",

        logisticsContentEn: data.logisticsContentEn || "",
        logisticsContentAr: data.logisticsContentAr || "",

        manufacturingContentEn: data.manufacturingContentEn || "",
        manufacturingContentAr: data.manufacturingContentAr || "",

        healthcareContentEn: data.healthcareContentEn || "",
        healthcareContentAr: data.healthcareContentAr || "",

        description3En: data.description3En || "",
        description3Ar: data.description3Ar || "",

        description4En: data.description4En || "",
        description4Ar: data.description4Ar || "",

        description5En: data.description5En || "",
        description5Ar: data.description5Ar || "",

        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
        image6: null,
        image7: null,
      });

      setPreviewImages({
        image1: data.image1 || null,
        image2: data.image2 || null,
        image3: data.image3 || null,
        image4: data.image4 || null,
        image5: data.image5 || null,
        image6: data.image6 || null,
        image7: data.image7 || null,
      });
    }
  }, [templateData]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    } else if (isSuccess) {
      toast.success("Sunrise 2027 template updated successfully");
      navigate(-1);
    }
  }, [isError, error, isSuccess, navigate]);

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

    // What is GST Sunrise 2027?
    formDataToSend.append("description1En", formData.description1En);
    formDataToSend.append("description1Ar", formData.description1Ar);
    if (formData.image2) formDataToSend.append("image2", formData.image2);
    formDataToSend.append("buttonText1En", formData.buttonText1En);
    formDataToSend.append("buttonText1Ar", formData.buttonText1Ar);
    formDataToSend.append("buttonLink1", formData.buttonLink1);

    // Transition to 2D Barcodes
    formDataToSend.append("description2En", formData.description2En);
    formDataToSend.append("description2Ar", formData.description2Ar);

    // Industries Empowered
    formDataToSend.append("industriesTitleEn", formData.industriesTitleEn);
    formDataToSend.append("industriesTitleAr", formData.industriesTitleAr);
    formDataToSend.append("buttonText2En", formData.buttonText2En);
    formDataToSend.append("buttonText2Ar", formData.buttonText2Ar);
    formDataToSend.append("buttonLink2", formData.buttonLink2);

    // Industry content
    if (formData.image3) formDataToSend.append("image3", formData.image3);
    formDataToSend.append("retailContentEn", formData.retailContentEn);
    formDataToSend.append("retailContentAr", formData.retailContentAr);

    if (formData.image4) formDataToSend.append("image4", formData.image4);
    formDataToSend.append("logisticsContentEn", formData.logisticsContentEn);
    formDataToSend.append("logisticsContentAr", formData.logisticsContentAr);

    if (formData.image5) formDataToSend.append("image5", formData.image5);
    formDataToSend.append(
      "manufacturingContentEn",
      formData.manufacturingContentEn
    );
    formDataToSend.append(
      "manufacturingContentAr",
      formData.manufacturingContentAr
    );

    if (formData.image6) formDataToSend.append("image6", formData.image6);
    formDataToSend.append("healthcareContentEn", formData.healthcareContentEn);
    formDataToSend.append("healthcareContentAr", formData.healthcareContentAr);

    // GS1 Digital Link
    formDataToSend.append("description3En", formData.description3En);
    formDataToSend.append("description3Ar", formData.description3Ar);
    if (formData.image7) formDataToSend.append("image7", formData.image7);

    // Support 2D Barcodes
    formDataToSend.append("description4En", formData.description4En);
    formDataToSend.append("description4Ar", formData.description4Ar);

    // CTA Section
    formDataToSend.append("description5En", formData.description5En);
    formDataToSend.append("description5Ar", formData.description5Ar);

    try {
      await updateTemplate({
        templateType: "sunrize2027Template",
        id: templateData?.data?.template?.id,
        data: formDataToSend,
      }).unwrap();
    } catch (err) {
      console.error("Failed to update Sunrise 2027 template:", err);
    }
  };

  if (isLoadingTemplate) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Loading template data...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button isIconOnly variant="light" onPress={() => navigate(-1)}>
            <IoArrowBack className="text-xl" />
          </Button>
          <h1 className="text-2xl font-bold">Edit Sunrise 2027</h1>
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
                  templateType="sunrise-2027"
                  value={formData.pageId}
                  onChange={(id) => handleInputChange("pageId", id)}
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

            {/* What is GST Sunrise 2027? */}
            <section className="py-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  What is GST Sunrise 2027?
                </h2>

                {/* First Container - Image and Main Results */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                  {/* Right Column - Main Results Content */}
                  <div className="space-y-6">
                    <RichTextEditor
                      label="What is GST Sunrise 2027? (English)"
                      value={formData.description1En}
                      onChange={(value) =>
                        handleInputChange("description1En", value)
                      }
                      placeholder="Enter content in English..."
                      height="200px"
                      cardHeight="300px"
                    />
                    <RichTextEditor
                      label="What is GST Sunrise 2027? (Arabic)"
                      value={formData.description1Ar}
                      onChange={(value) =>
                        handleInputChange("description1Ar", value)
                      }
                      placeholder="Enter content in Arabic..."
                      height="200px"
                      cardHeight="300px"
                      isRTL
                    />
                  </div>

                  {/* Left Column - Image */}
                  <div className="bg-white/95 rounded-xl p-2 shadow-lg">
                    {previewImages.image2 ? (
                      <div className="relative group">
                        <img
                          src={previewImages.image2}
                          alt="GST Sunrise 2027"
                          className="w-full h-auto rounded-lg shadow-lg"
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
                      <div className="h-80 bg-gray-100 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
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
                          Upload GST Sunrise 2027 Image
                        </label>
                        <p className="text-gray-500 mt-2">
                          Recommended size: 800x600px
                        </p>
                      </div>
                    )}
                  </div>

                  {/* button area */}
                  <div className="flex flex-col gap-4">
                    <Input
                      label="Button Text (English)"
                      placeholder="Enter Button Text"
                      value={formData.buttonText1En}
                      onChange={(e) =>
                        handleInputChange("buttonText1En", e.target.value)
                      }
                    />
                    <Input
                      label="Button Text (Arabic)"
                      placeholder="Enter Button Text in Arabic"
                      value={formData.buttonText1Ar}
                      onChange={(e) =>
                        handleInputChange("buttonText1Ar", e.target.value)
                      }
                    />
                    <Input
                      label="Button Link"
                      placeholder="Enter Button Link"
                      value={formData.buttonLink1}
                      onChange={(e) =>
                        handleInputChange("buttonLink1", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Transition to 2D Barcodes */}
            <section className="py-16 bg-white border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  Transition to 2D Barcodes
                </h2>

                {/* Content */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <RichTextEditor
                    label="Transition to 2D Barcodes (English)"
                    value={formData.description2En}
                    onChange={(value) =>
                      handleInputChange("description2En", value)
                    }
                    placeholder="Enter content in English..."
                    height="200px"
                    cardHeight="300px"
                  />
                  <RichTextEditor
                    label="Transition to 2D Barcodes (Arabic)"
                    value={formData.description2Ar}
                    onChange={(value) =>
                      handleInputChange("description2Ar", value)
                    }
                    placeholder="Enter content in Arabic..."
                    height="200px"
                    cardHeight="300px"
                    isRTL
                  />
                </div>
              </div>
            </section>

            {/* industries empowered */}
            <section className="py-16 bg-white border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  Industries Empowered
                </h2>

                {/* title area */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="flex flex-col gap-4">
                    <Input
                      label="Title (English)"
                      placeholder="Enter Title"
                      value={formData.industriesTitleEn}
                      onChange={(e) =>
                        handleInputChange("industriesTitleEn", e.target.value)
                      }
                    />
                    <Input
                      label="Title (Arabic)"
                      placeholder="Enter Title in Arabic"
                      value={formData.industriesTitleAr}
                      onChange={(e) =>
                        handleInputChange("industriesTitleAr", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Input
                      label="Button Text (English)"
                      placeholder="Enter Button Text"
                      value={formData.buttonText2En}
                      onChange={(e) =>
                        handleInputChange("buttonText2En", e.target.value)
                      }
                    />
                    <Input
                      label="Button Text (Arabic)"
                      placeholder="Enter Button Text in Arabic"
                      value={formData.buttonText2Ar}
                      onChange={(e) =>
                        handleInputChange("buttonText2Ar", e.target.value)
                      }
                    />
                    <Input
                      label="Button Link"
                      placeholder="Enter Button Link"
                      value={formData.buttonLink2}
                      onChange={(e) =>
                        handleInputChange("buttonLink2", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* industries empowered content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  {/* Left Column - First Row: Retail */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                    <div className="p-4 bg-orange-500 text-white">
                      <h3 className="text-xl font-semibold">Retail</h3>
                    </div>
                    <div className="p-6">
                      {/* Image Upload */}
                      <div className="mb-4">
                        {previewImages.image3 ? (
                          <div className="relative group h-48 mb-3">
                            <img
                              src={previewImages.image3}
                              alt="Retail"
                              className="w-full h-full object-cover rounded-lg"
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
                          <div className="h-48 bg-gray-100 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 mb-3">
                            <input
                              type="file"
                              id="image3"
                              accept="image/*"
                              onChange={(e) => handleImageUpload("image3", e)}
                              className="hidden"
                            />
                            <label
                              htmlFor="image3"
                              className="cursor-pointer bg-primary text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
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
                              Upload Retail Image
                            </label>
                          </div>
                        )}
                      </div>

                      {/* Rich Text Editors */}
                      <div className="grid grid-cols-1 gap-4">
                        <RichTextEditor
                          label="Retail Content (English)"
                          value={formData.retailContentEn}
                          onChange={(value) =>
                            handleInputChange("retailContentEn", value)
                          }
                          placeholder="E.g. One code for checkout, loyalty, and product info..."
                          height="130px"
                          cardHeight="220px"
                        />
                        <RichTextEditor
                          label="Retail Content (Arabic)"
                          value={formData.retailContentAr}
                          onChange={(value) =>
                            handleInputChange("retailContentAr", value)
                          }
                          placeholder="Enter retail content in Arabic..."
                          height="130px"
                          cardHeight="220px"
                          isRTL
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column - First Row: Logistics & Warehousing */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                    <div className="p-4 bg-blue-500 text-white">
                      <h3 className="text-xl font-semibold">
                        Logistics & Warehousing
                      </h3>
                    </div>
                    <div className="p-6">
                      {/* Image Upload */}
                      <div className="mb-4">
                        {previewImages.image4 ? (
                          <div className="relative group h-48 mb-3">
                            <img
                              src={previewImages.image4}
                              alt="Logistics"
                              className="w-full h-full object-cover rounded-lg"
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
                          <div className="h-48 bg-gray-100 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 mb-3">
                            <input
                              type="file"
                              id="image4"
                              accept="image/*"
                              onChange={(e) => handleImageUpload("image4", e)}
                              className="hidden"
                            />
                            <label
                              htmlFor="image4"
                              className="cursor-pointer bg-primary text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
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
                              Upload Logistics Image
                            </label>
                          </div>
                        )}
                      </div>

                      {/* Rich Text Editors */}
                      <div className="grid grid-cols-1 gap-4">
                        <RichTextEditor
                          label="Logistics Content (English)"
                          value={formData.logisticsContentEn}
                          onChange={(value) =>
                            handleInputChange("logisticsContentEn", value)
                          }
                          placeholder="E.g. Improves track & trace across supply chain tiers..."
                          height="130px"
                          cardHeight="220px"
                        />
                        <RichTextEditor
                          label="Logistics Content (Arabic)"
                          value={formData.logisticsContentAr}
                          onChange={(value) =>
                            handleInputChange("logisticsContentAr", value)
                          }
                          placeholder="Enter logistics content in Arabic..."
                          height="130px"
                          cardHeight="220px"
                          isRTL
                        />
                      </div>
                    </div>
                  </div>

                  {/* Left Column - Second Row: Manufacturing */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                    <div className="p-4 bg-orange-500 text-white">
                      <h3 className="text-xl font-semibold">Manufacturing</h3>
                    </div>
                    <div className="p-6">
                      {/* Image Upload */}
                      <div className="mb-4">
                        {previewImages.image5 ? (
                          <div className="relative group h-48 mb-3">
                            <img
                              src={previewImages.image5}
                              alt="Manufacturing"
                              className="w-full h-full object-cover rounded-lg"
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
                          <div className="h-48 bg-gray-100 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 mb-3">
                            <input
                              type="file"
                              id="image5"
                              accept="image/*"
                              onChange={(e) => handleImageUpload("image5", e)}
                              className="hidden"
                            />
                            <label
                              htmlFor="image5"
                              className="cursor-pointer bg-primary text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
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
                              Upload Manufacturing Image
                            </label>
                          </div>
                        )}
                      </div>

                      {/* Rich Text Editors */}
                      <div className="grid grid-cols-1 gap-4">
                        <RichTextEditor
                          label="Manufacturing Content (English)"
                          value={formData.manufacturingContentEn}
                          onChange={(value) =>
                            handleInputChange("manufacturingContentEn", value)
                          }
                          placeholder="E.g. Embeds product lifecycle data from production to delivery..."
                          height="130px"
                          cardHeight="220px"
                        />
                        <RichTextEditor
                          label="Manufacturing Content (Arabic)"
                          value={formData.manufacturingContentAr}
                          onChange={(value) =>
                            handleInputChange("manufacturingContentAr", value)
                          }
                          placeholder="Enter manufacturing content in Arabic..."
                          height="130px"
                          cardHeight="220px"
                          isRTL
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Second Row: Healthcare & Pharmaceuticals */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                    <div className="p-4 bg-blue-500 text-white">
                      <h3 className="text-xl font-semibold">
                        Healthcare & Pharmaceuticals
                      </h3>
                    </div>
                    <div className="p-6">
                      {/* Image Upload */}
                      <div className="mb-4">
                        {previewImages.image6 ? (
                          <div className="relative group h-48 mb-3">
                            <img
                              src={previewImages.image6}
                              alt="Healthcare"
                              className="w-full h-full object-cover rounded-lg"
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
                          <div className="h-48 bg-gray-100 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 mb-3">
                            <input
                              type="file"
                              id="image6"
                              accept="image/*"
                              onChange={(e) => handleImageUpload("image6", e)}
                              className="hidden"
                            />
                            <label
                              htmlFor="image6"
                              className="cursor-pointer bg-primary text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
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
                              Upload Healthcare Image
                            </label>
                          </div>
                        )}
                      </div>

                      {/* Rich Text Editors */}
                      <div className="grid grid-cols-1 gap-4">
                        <RichTextEditor
                          label="Healthcare Content (English)"
                          value={formData.healthcareContentEn}
                          onChange={(value) =>
                            handleInputChange("healthcareContentEn", value)
                          }
                          placeholder="E.g. Meets UDI and global health authority regulations..."
                          height="130px"
                          cardHeight="220px"
                        />
                        <RichTextEditor
                          label="Healthcare Content (Arabic)"
                          value={formData.healthcareContentAr}
                          onChange={(value) =>
                            handleInputChange("healthcareContentAr", value)
                          }
                          placeholder="Enter healthcare content in Arabic..."
                          height="130px"
                          cardHeight="220px"
                          isRTL
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* gs1 digital link */}
            <section className="py-16 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  GS1 Digital Link
                </h2>

                {/* First Container - Image and Main Results */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                  {/* Right Column - Image */}
                  <div className="bg-white/95 rounded-xl p-2 shadow-lg">
                    {previewImages.image7 ? (
                      <div className="relative group">
                        <img
                          src={previewImages.image7}
                          alt="GS1 Digital Link"
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <input
                            type="file"
                            id="image7"
                            accept="image/*"
                            onChange={(e) => handleImageUpload("image7", e)}
                            className="hidden"
                          />
                          <label
                            htmlFor="image7"
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
                          id="image7"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("image7", e)}
                          className="hidden"
                        />
                        <label
                          htmlFor="image7"
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
                          Upload GS1 Digital Link Image
                        </label>
                        <p className="text-gray-500 mt-2">
                          Recommended size: 800x600px
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Left Column - Main Results Content */}
                  <div className="space-y-6">
                    <RichTextEditor
                      label="GS1 Digital Link (English)"
                      value={formData.description3En}
                      onChange={(value) =>
                        handleInputChange("description3En", value)
                      }
                      placeholder="Enter content in English..."
                      height="200px"
                      cardHeight="300px"
                    />
                    <RichTextEditor
                      label="GS1 Digital Link (Arabic)"
                      value={formData.description3Ar}
                      onChange={(value) =>
                        handleInputChange("description3Ar", value)
                      }
                      placeholder="Enter content in Arabic..."
                      height="200px"
                      cardHeight="300px"
                      isRTL
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* support 2d barcodes */}
            <section className="py-16 bg-white border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  Support 2D Barcodes
                </h2>

                {/* Content */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <RichTextEditor
                    label="Support 2D Barcodes (English)"
                    value={formData.description4En}
                    onChange={(value) =>
                      handleInputChange("description4En", value)
                    }
                    placeholder="Enter content in English..."
                    height="200px"
                    cardHeight="300px"
                  />
                  <RichTextEditor
                    label="Support 2D Barcodes (Arabic)"
                    value={formData.description4Ar}
                    onChange={(value) =>
                      handleInputChange("description4Ar", value)
                    }
                    placeholder="Enter content in Arabic..."
                    height="200px"
                    cardHeight="300px"
                    isRTL
                  />
                </div>
              </div>
            </section>

            {/* CTA section */}
            <section className="py-16 bg-white border-2 border-dashed border-gray-300 rounded-xl mb-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                  CTA Section
                </h2>

                {/* Content */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <RichTextEditor
                    label="CTA Section (English)"
                    value={formData.description5En}
                    onChange={(value) =>
                      handleInputChange("description5En", value)
                    }
                    placeholder="Enter content in English..."
                    height="200px"
                    cardHeight="300px"
                  />
                  <RichTextEditor
                    label="CTA Section (Arabic)"
                    value={formData.description5Ar}
                    onChange={(value) =>
                      handleInputChange("description5Ar", value)
                    }
                    placeholder="Enter content in Arabic..."
                    height="200px"
                    cardHeight="300px"
                    isRTL
                  />
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mb-6">
              <Button
                color="danger"
                variant="light"
                onPress={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Sunrise 2027"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default EditSunrise;
