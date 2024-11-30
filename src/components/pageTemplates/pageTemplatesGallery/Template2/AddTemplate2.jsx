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

function AddTemplate2() {
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
    description1En: "",
    description1Ar: "",
    description2En: "",
    description2Ar: "",
    description3En: "",
    description3Ar: "",
    image1: null,
    image2: null,
    image3: null,
    buttonTextEn: "",
    buttonTextAr: "",
    buttonNavigationEn: "",
    buttonNavigationAr: "",
  });

  const [previewImages, setPreviewImages] = useState({
    image1: null,
    image2: null,
    image3: null,
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
      toast({
        title: "Error!",
        description: error?.data?.message || "Something went wrong",
        status: "error",
      });
    } else if (isSuccess) {
      toast.success("Template created successfully");
      navigate(-1);
    }
  }, [isError, error, isSuccess]);

  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    // Remove templateType from form data since it goes in URL params
    formDataToSend.append("nameEn", formData.nameEn);
    formDataToSend.append("nameAr", formData.nameAr);
    formDataToSend.append("pageId", formData.pageId);
    formDataToSend.append("isActive", formData.isActive);
    formDataToSend.append("seoDescriptionEn", formData.seoDescriptionEn);
    formDataToSend.append("seoDescriptionAr", formData.seoDescriptionAr);
    formDataToSend.append("description1En", formData.description1En);
    formDataToSend.append("description1Ar", formData.description1Ar);
    formDataToSend.append("description2En", formData.description2En);
    formDataToSend.append("description2Ar", formData.description2Ar);
    formDataToSend.append("description3En", formData.description3En);
    formDataToSend.append("description3Ar", formData.description3Ar);

    // Add button data
    formDataToSend.append("buttonTextEn", formData.buttonTextEn);
    formDataToSend.append("buttonTextAr", formData.buttonTextAr);
    formDataToSend.append("buttonNavigationEn", formData.buttonNavigationEn);
    formDataToSend.append("buttonNavigationAr", formData.buttonNavigationAr);

    // Add files if they exist
    if (formData.image1) formDataToSend.append("image1", formData.image1);
    if (formData.image2) formDataToSend.append("image2", formData.image2);
    if (formData.image3) formDataToSend.append("image3", formData.image3);

    try {
      await createTemplate({
        templateType: "template2",
        data: formDataToSend,
      }).unwrap();
    } catch (err) {
      console.error("Failed to create template:", err);
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button isIconOnly variant="light" onPress={() => navigate("..")}>
            <IoArrowBack className="text-xl" />
          </Button>
          <h1 className="text-2xl font-bold">Add New Page</h1>
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
                  templateType="template2"
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
                  value={formData.isActive}
                  onChange={(e) =>
                    handleInputChange("isActive", e.target.value)
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
            <section className="relative h-[60vh] overflow-hidden border-2 border-dashed border-gray-300 rounded-xl mb-12">
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

              {/* Content Editors */}
              <div className="relative z-10 container mx-auto px-6 h-full py-8">
                <div className="grid grid-cols-2 gap-8 h-full">
                  {/* English Content */}
                  <RichTextEditor
                    label="English Content"
                    value={formData.description1En}
                    onChange={(value) =>
                      handleInputChange("description1En", value)
                    }
                    placeholder="Enter English description here..."
                  />
                  {/* Arabic Content */}
                  <RichTextEditor
                    label="Arabic Content"
                    value={formData.description1Ar}
                    onChange={(value) =>
                      handleInputChange("description1Ar", value)
                    }
                    placeholder="Enter Arabic description here..."
                    isRTL
                  />
                </div>
              </div>
            </section>

            {/* Info Section */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  {/* Content Editors */}
                  <div className="space-y-6">
                    {/* English Editor */}
                    <RichTextEditor
                      label="English Content"
                      value={formData.description2En}
                      onChange={(value) =>
                        handleInputChange("description2En", value)
                      }
                      placeholder="Enter English content here..."
                    />
                    {/* Arabic Editor */}
                    <RichTextEditor
                      label="Arabic Content"
                      value={formData.description2Ar}
                      onChange={(value) =>
                        handleInputChange("description2Ar", value)
                      }
                      placeholder="Enter Arabic content here..."
                      isRTL
                    />
                  </div>

                  {/* Image Section */}
                  <div className="bg-white/95 rounded-xl p-2 shadow-lg ">
                    {previewImages.image2 ? (
                      <div className="relative group">
                        <img
                          src={previewImages.image2}
                          alt="Section 1"
                          className="w-full h-[450px] object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
                      <div className="h-[450px] bg-gray-100 flex flex-col items-center justify-center">
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
                          Upload Image
                        </label>
                        {/* <p className="text-gray-500 mt-2">
                          Recommended size: 800x500px
                        </p> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Navigation Buttons */}
            <div className="container mx-auto px-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Button Text (English)"
                  placeholder="Enter button text"
                  value={formData.buttonTextEn}
                  onChange={(e) =>
                    handleInputChange("buttonTextEn", e.target.value)
                  }
                />
                <Input
                  label="Button Text (Arabic)"
                  placeholder="اكتب النص هنا"
                  value={formData.buttonTextAr}
                  onChange={(e) =>
                    handleInputChange("buttonTextAr", e.target.value)
                  }
                />
                <Input
                  label="Button Navigation (English)"
                  placeholder="Enter navigation link"
                  value={formData.buttonNavigationEn}
                  onChange={(e) =>
                    handleInputChange("buttonNavigationEn", e.target.value)
                  }
                />
                <Input
                  label="Button Navigation (Arabic)"
                  placeholder="اكتب التنقل هنا"
                  value={formData.buttonNavigationAr}
                  onChange={(e) =>
                    handleInputChange("buttonNavigationAr", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Bottom Section - Content above, image below */}
            <section className="py-12 bg-gradient-to-b from-white to-gray-100">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8">
                  {/* Content Editors */}
                  <div className="space-y-6">
                    {/* English Editor */}
                    <RichTextEditor
                      label="English Content"
                      value={formData.description3En}
                      onChange={(value) =>
                        handleInputChange("description3En", value)
                      }
                      placeholder="Enter English content here..."
                    />
                    {/* Arabic Editor */}
                    <RichTextEditor
                      label="Arabic Content"
                      value={formData.description3Ar}
                      onChange={(value) =>
                        handleInputChange("description3Ar", value)
                      }
                      placeholder="Enter Arabic content here..."
                      isRTL
                    />
                  </div>

                  {/* Image Section - Now below the content */}
                  <div className="bg-white/95 rounded-xl p-2 shadow-lg h-[370px] mx-auto w-full max-w-4xl">
                    {previewImages.image3 ? (
                      <div className="relative group">
                        <img
                          src={previewImages.image3}
                          alt="Section 2"
                          className="w-full h-[350px] object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
                      <div className="h-[350px] bg-gray-100 flex flex-col items-center justify-center">
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
                          Upload Image
                        </label>
                        <p className="text-gray-500 mt-2">
                          Recommended size: 800x500px
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              color="danger"
              variant="light"
              onPress={() => navigate("..")}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleSubmit}
              isLoading={isLoading}
            >
              {isLoading ? "Creating..." : "Add Page"}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AddTemplate2;
