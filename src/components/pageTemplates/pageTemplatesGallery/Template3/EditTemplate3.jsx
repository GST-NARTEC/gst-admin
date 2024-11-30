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
import RichTextEditor from "./RichTextEditor";
import SlugInput from "../common/SlugInput";
import { toast } from "react-hot-toast";
import OverlayLoader from "../../../common/OverlayLoader";

// api
import {
  useGetTemplateQuery,
  useUpdateTemplateMutation,
} from "../../../../store/apis/endpoints/templates";

function EditTemplate3() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: templateData, isLoading: isLoadingTemplate } =
    useGetTemplateQuery({
      templateType: "template3",
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
    description1En: "",
    description1Ar: "",
    description2En: "",
    description2Ar: "",
    description3En: "",
    description3Ar: "",
    description4En: "",
    description4Ar: "",
    buttonText1En: "",
    buttonText1Ar: "",
    buttonNavigation1En: "",
    buttonNavigation1Ar: "",
    buttonText2En: "",
    buttonText2Ar: "",
    buttonNavigation2En: "",
    buttonNavigation2Ar: "",
    image1: null,
    image2: null,
    image3: null,
  });

  const [previewImages, setPreviewImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (templateData?.data?.template) {
      const template = templateData?.data?.template;
      const initialState = {
        nameEn: template.nameEn || "",
        nameAr: template.nameAr || "",
        pageId: template.pageId || "",
        isActive: template.isActive,
        seoDescriptionEn: template.seoDescriptionEn || "",
        seoDescriptionAr: template.seoDescriptionAr || "",
        description1En: template.description1En || "",
        description1Ar: template.description1Ar || "",
        description2En: template.description2En || "",
        description2Ar: template.description2Ar || "",
        description3En: template.description3En || "",
        description3Ar: template.description3Ar || "",
        description4En: template.description4En || "",
        description4Ar: template.description4Ar || "",
        buttonText1En: template.buttonText1En || "",
        buttonText1Ar: template.buttonText1Ar || "",
        buttonNavigation1En: template.buttonNavigation1En || "",
        buttonNavigation1Ar: template.buttonNavigation1Ar || "",
        buttonText2En: template.buttonText2En || "",
        buttonText2Ar: template.buttonText2Ar || "",
        buttonNavigation2En: template.buttonNavigation2En || "",
        buttonNavigation2Ar: template.buttonNavigation2Ar || "",
      };
      setInitialData(initialState);
      setFormData(initialState);

      setPreviewImages({
        image1: template.image1 || null,
        image2: template.image2 || null,
        image3: template.image3 || null,
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

    Object.keys(formData).forEach((key) => {
      if (key !== "image1" && key !== "image2" && key !== "image3") {
        if (formData[key] !== initialData[key]) {
          formDataToSend.append(key, formData[key]);
          hasChanges = true;
        }
      }
    });

    ["image1", "image2", "image3"].forEach((imageKey) => {
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
        templateType: "template3",
        id: templateData?.data?.template?.id,
        data: formDataToSend,
      }).unwrap();

      toast.success("Template updated successfully");
      navigate(-1);
    } catch (err) {
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
          <Button isIconOnly variant="light" onPress={() => navigate("..")}>
            <IoArrowBack className="text-xl" />
          </Button>
          <h1 className="text-2xl font-bold">Edit Page</h1>
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
                  templateType="template3"
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

              {/* Add Hero Image Upload Button */}
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

              {/* Add Hero Background */}
              {previewImages.image1 ? (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${previewImages.image1?.replace(
                      /\\/g,
                      "/"
                    )})`,
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

            <div className="space-y-6">
              {/* English Editor */}
              <RichTextEditor
                label="English Content"
                value={formData.description3En}
                onChange={(value) => handleInputChange("description3En", value)}
                placeholder="Enter English content here..."
              />
              {/* Arabic Editor */}
              <RichTextEditor
                label="Arabic Content"
                value={formData.description3Ar}
                onChange={(value) => handleInputChange("description3Ar", value)}
                placeholder="Enter Arabic content here..."
                isRTL
              />
            </div>

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
                  <div className="bg-white/95 rounded-xl p-2 shadow-lg">
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
                        <p className="text-gray-500 mt-2">
                          Recommended size: 800x500px
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Navigation Buttons */}
            <div className="container px-4 mb-8 max-w-lg">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Button Text (English)"
                  placeholder="Enter button text"
                  value={formData.buttonText1En}
                  color="primary"
                  onChange={(e) =>
                    handleInputChange("buttonText1En", e.target.value)
                  }
                />
                <Input
                  label="Button Text (Arabic)"
                  placeholder="اكتب النص هنا"
                  value={formData.buttonText1Ar}
                  color="primary"
                  onChange={(e) =>
                    handleInputChange("buttonText1Ar", e.target.value)
                  }
                />
                <Input
                  label="Button Navigation (English)"
                  placeholder="Enter navigation link"
                  value={formData.buttonNavigation1En}
                  color="primary"
                  onChange={(e) =>
                    handleInputChange("buttonNavigation1En", e.target.value)
                  }
                />
                <Input
                  label="Button Navigation (Arabic)"
                  placeholder="اكتب التنقل هنا"
                  value={formData.buttonNavigation1Ar}
                  color="primary"
                  onChange={(e) =>
                    handleInputChange("buttonNavigation1Ar", e.target.value)
                  }
                />
              </div>
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

            {/* Bottom Section - Content above, image below */}
            <section className="py-12 bg-gradient-to-b from-white to-gray-100">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8">
                  {/* Content Editors */}
                  <div className="space-y-6">
                    {/* English Editor */}
                    <RichTextEditor
                      label="English Content"
                      value={formData.description4En}
                      onChange={(value) =>
                        handleInputChange("description4En", value)
                      }
                      placeholder="Enter English content here..."
                    />
                    {/* Arabic Editor */}
                    <RichTextEditor
                      label="Arabic Content"
                      value={formData.description4Ar}
                      onChange={(value) =>
                        handleInputChange("description4Ar", value)
                      }
                      placeholder="Enter Arabic content here..."
                      isRTL
                    />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="container mx-aut px-4 mb-8 max-w-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Button Text (English)"
                        placeholder="Enter button text"
                        color="primary"
                        value={formData.buttonText2En}
                        onChange={(e) =>
                          handleInputChange("buttonText2En", e.target.value)
                        }
                      />
                      <Input
                        label="Button Text (Arabic)"
                        placeholder="اكتب النص هنا"
                        color="primary"
                        value={formData.buttonText2Ar}
                        onChange={(e) =>
                          handleInputChange("buttonText2Ar", e.target.value)
                        }
                      />
                      <Input
                        label="Button Navigation (English)"
                        placeholder="Enter navigation link"
                        color="primary"
                        value={formData.buttonNavigation2En}
                        onChange={(e) =>
                          handleInputChange(
                            "buttonNavigation2En",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        label="Button Navigation (Arabic)"
                        placeholder="اكتب التنقل هنا"
                        color="primary"
                        value={formData.buttonNavigation2Ar}
                        onChange={(e) =>
                          handleInputChange(
                            "buttonNavigation2Ar",
                            e.target.value
                          )
                        }
                      />
                    </div>
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
              isLoading={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Page"}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default EditTemplate3;
