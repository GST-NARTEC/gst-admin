import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../../layout/AdminLayouts/MainLayout";
import { Button, Input, Card, CardBody } from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import RichTextEditor from "../common/RichTextEditor";
import SlugInput from "../common/SlugInput";
import { toast } from "react-hot-toast";
import {
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
  useGetTemplateQuery,
} from "../../../../store/apis/endpoints/templates";

function VerfiyHalal() {
  const navigate = useNavigate();
  const [createTemplate, { isLoading, isError, isSuccess, error }] =
    useCreateTemplateMutation();
  const [
    updateTemplate,
    {
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      error: updateError,
    },
  ] = useUpdateTemplateMutation();
  const { data: templateData, isLoading: isTemplateLoading } =
    useGetTemplateQuery({
      templateType: "halalTemplate",
    });

  const [formData, setFormData] = useState({
    pageSlug: "",
    headerEn: "",
    headerAr: "",
    descriptionEn: "",
    descriptionAr: "",
    image1: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Effect to populate form with existing data
  useEffect(() => {
    if (templateData?.data?.template) {
      const template = templateData.data.template;
      setIsEditMode(true);
      setFormData({
        pageSlug: template.pageId || "", // Use pageId instead of page.slug
        headerEn: template.headerEn || "",
        headerAr: template.headerAr || "",
        descriptionEn: template.descriptionEn || "",
        descriptionAr: template.descriptionAr || "",
        image1: null, // Keep as null since we'll show existing image separately
      });

      // Set preview image if exists
      if (template.image1) {
        setPreviewImage(template.image1);
      }
    }
  }, [templateData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleInputChange("image1", file);
      // Create object URL for new file preview
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    } else if (isSuccess) {
      toast.success("Verify Halal template created successfully");
      navigate(-1);
    }

    if (isUpdateError) {
      toast.error(updateError?.data?.message || "Failed to update template");
    } else if (isUpdateSuccess) {
      toast.success("Verify Halal template updated successfully");
      navigate(-1);
    }
  }, [isError, error, isSuccess, isUpdateError, updateError, isUpdateSuccess]);

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.pageSlug.trim()) {
      toast.error("Page slug is required");
      return;
    }
    if (!formData.headerEn.trim()) {
      toast.error("English header is required");
      return;
    }
    if (!formData.headerAr.trim()) {
      toast.error("Arabic header is required");
      return;
    }

    const formDataToSend = new FormData();

    // Append only the fields needed for HalalTemplate
    formDataToSend.append("pageId", formData.pageSlug);
    formDataToSend.append("headerEn", formData.headerEn);
    formDataToSend.append("headerAr", formData.headerAr);
    formDataToSend.append("descriptionEn", formData.descriptionEn);
    formDataToSend.append("descriptionAr", formData.descriptionAr);

    // Add image if exists (only if a new file is selected)
    if (formData.image1 instanceof File) {
      formDataToSend.append("image1", formData.image1);
    }

    try {
      if (isEditMode && templateData?.data?.template) {
        // Update existing template
        await updateTemplate({
          templateType: "halalTemplate",
          id: templateData.data.template.id,
          data: formDataToSend,
        }).unwrap();
      } else {
        // Create new template
        await createTemplate({
          templateType: "halalTemplate",
          data: formDataToSend,
        }).unwrap();
      }
    } catch (err) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} Verify Halal template:`,
        err
      );
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button isIconOnly variant="light" onPress={() => navigate(-1)}>
            <IoArrowBack className="text-xl" />
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditMode ? "Edit Verify Halal" : "Create Verify Halal"}
          </h1>
        </div>

        {/* Loading State */}
        {isTemplateLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading template data...</p>
            </div>
          </div>
        ) : (
          <div className="max-w-[1200px] mx-auto space-y-6">
            {/* Basic Info Card */}
            <Card>
              <CardBody className="gap-4">
                <h2 className="text-xl font-semibold mb-4">Page Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SlugInput
                    value={formData.pageSlug}
                    onChange={(slug) => handleInputChange("pageSlug", slug)}
                    templateType="verify-halal"
                    label="Page Slug"
                  />
                  <Input
                    label="Header (English)"
                    placeholder="Enter header in English"
                    value={formData.headerEn}
                    onChange={(e) =>
                      handleInputChange("headerEn", e.target.value)
                    }
                  />
                  <Input
                    label="Header (Arabic)"
                    placeholder="Enter header in Arabic"
                    value={formData.headerAr}
                    onChange={(e) =>
                      handleInputChange("headerAr", e.target.value)
                    }
                  />
                </div>
              </CardBody>
            </Card>

            {/* Content Section */}
            <Card>
              <CardBody className="gap-6">
                <h2 className="text-xl font-semibold">Content</h2>

                {/* Rich Text Editors */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <RichTextEditor
                      label="Description (English)"
                      value={formData.descriptionEn}
                      onChange={(value) =>
                        handleInputChange("descriptionEn", value)
                      }
                      placeholder="Enter description in English..."
                    />
                  </div>
                  <div>
                    <RichTextEditor
                      label="Description (Arabic)"
                      value={formData.descriptionAr}
                      onChange={(value) =>
                        handleInputChange("descriptionAr", value)
                      }
                      placeholder="Enter description in Arabic..."
                      isRTL
                    />
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Image</h3>
                  <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
                    {previewImage ? (
                      <div className="relative group max-w-md mx-auto">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <input
                            type="file"
                            id="image1"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="image1"
                            className="cursor-pointer bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium"
                          >
                            Change Image
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <input
                          type="file"
                          id="image1"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="image1"
                          className="cursor-pointer inline-flex flex-col items-center justify-center"
                        >
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                            <svg
                              className="w-8 h-8 text-gray-400"
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
                          </div>
                          <span className="text-sm font-medium text-gray-700 mb-1">
                            Click to upload image
                          </span>
                          <span className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
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
                isLoading={isLoading || isUpdateLoading}
                disabled={isLoading || isUpdateLoading || isTemplateLoading}
              >
                {isLoading || isUpdateLoading
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                  ? "Update Template"
                  : "Create Template"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default VerfiyHalal;
