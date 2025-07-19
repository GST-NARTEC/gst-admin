import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../../layout/AdminLayouts/MainLayout";
import { Button, Input, Card, CardBody } from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import RichTextEditor from "../common/RichTextEditor";
import SlugInput from "../common/SlugInput";
import { toast } from "react-hot-toast";
import CompniesTable from "./CompniesTable";
import {
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
  useGetTemplateQuery,
} from "../../../../store/apis/endpoints/templates";

function CaseStudyMain() {
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
      templateType: "caseStudyMainTemplate",
    });

  const [formData, setFormData] = useState({
    pageSlug: "",
    headerEn: "",
    headerAr: "",
    footerEn: "",
    footerAr: "",
  });

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
        footerEn: template.footerEn || "",
        footerAr: template.footerAr || "",
      });
    }
  }, [templateData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    } else if (isSuccess) {
      toast.success("Case Study template created successfully");
      navigate(-1);
    }

    if (isUpdateError) {
      toast.error(updateError?.data?.message || "Failed to update template");
    } else if (isUpdateSuccess) {
      toast.success("Case Study template updated successfully");
      navigate(-1);
    }
  }, [
    isError,
    error,
    isSuccess,
    isUpdateError,
    updateError,
    isUpdateSuccess,
    navigate,
  ]);

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

    // Append only the fields needed for CaseStudyMainTemplate
    formDataToSend.append("pageId", formData.pageSlug);
    formDataToSend.append("headerEn", formData.headerEn);
    formDataToSend.append("headerAr", formData.headerAr);
    formDataToSend.append("footerEn", formData.footerEn);
    formDataToSend.append("footerAr", formData.footerAr);

    try {
      if (isEditMode && templateData?.data?.template) {
        // Update existing template
        await updateTemplate({
          templateType: "caseStudyMainTemplate",
          id: templateData.data.template.id,
          data: formDataToSend,
        }).unwrap();
      } else {
        // Create new template
        await createTemplate({
          templateType: "caseStudyMainTemplate",
          data: formDataToSend,
        }).unwrap();
      }
    } catch (err) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} Case Study template:`,
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
            {isEditMode
              ? "Edit Case Study Template"
              : "Create Case Study Template"}
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
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <SlugInput
                    value={formData.pageSlug}
                    onChange={(slug) => handleInputChange("pageSlug", slug)}
                    templateType="case-study-main"
                    label="Page Slug"
                  />
                </div>
              </CardBody>
            </Card>

            {/* Header Content Section */}
            <Card>
              <CardBody className="gap-6 p-10">
                <h2 className="text-xl font-semibold">Header Content</h2>

                {/* Header Rich Text Editors */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <RichTextEditor
                      label="Header (English)"
                      value={formData.headerEn}
                      onChange={(value) => handleInputChange("headerEn", value)}
                      placeholder="Enter header content in English..."
                      height="130px"
                    />
                  </div>
                  <div>
                    <RichTextEditor
                      label="Header (Arabic)"
                      value={formData.headerAr}
                      onChange={(value) => handleInputChange("headerAr", value)}
                      placeholder="Enter header content in Arabic..."
                      height="130px"
                      isRTL
                    />
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Companies Table Section */}
            <CompniesTable />

            {/* Footer Content Section */}
            <Card>
              <CardBody className="gap-6 p-10">
                <h2 className="text-xl font-semibold">Footer Content</h2>

                {/* Footer Rich Text Editors */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <RichTextEditor
                      label="Footer (English)"
                      value={formData.footerEn}
                      onChange={(value) => handleInputChange("footerEn", value)}
                      placeholder="Enter footer content in English..."
                      height="130px"
                    />
                  </div>
                  <div>
                    <RichTextEditor
                      label="Footer (Arabic)"
                      value={formData.footerAr}
                      onChange={(value) => handleInputChange("footerAr", value)}
                      placeholder="Enter footer content in Arabic..."
                      height="130px"
                      isRTL
                    />
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

export default CaseStudyMain;
