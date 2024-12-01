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
import SlugInput from "../common/SlugInput";
import { toast } from "react-hot-toast";

// api
import { useCreateTemplateMutation } from "../../../../store/apis/endpoints/templates";
import RichTextEditor from "./RichTextEditor";

function AddTemplate4() {
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
    description4En: "",
    description4Ar: "",
    image1: null,
    image2: null,
    image3: null,
    buttonText1En: "",
    buttonText1Ar: "",
    buttonNavigation1En: "",
    buttonNavigation1Ar: "",
    buttonText2En: "",
    buttonText2Ar: "",
    buttonNavigation2En: "",
    buttonNavigation2Ar: "",
  });

  const [previewImages, setPreviewImages] = useState({
    section1Image: null,
    section2Image: null,
    section3Image: null,
  });

  const handleInputChange = (field, value) => {
    try {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    } catch (error) {
      console.error("Error in handleInputChange: ", error);
      toast.error("Error updating content");
    }
  };

  const handleImageUpload = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      const imageMapping = {
        section1Image: "image1",
        section2Image: "image2",
        section3Image: "image3",
      };

      handleInputChange(imageMapping[field], file);
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

    // Append all text fields
    Object.keys(formData).forEach((key) => {
      if (key !== "image1" && key !== "image2" && key !== "image3") {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Add files if they exist
    if (formData.image1) formDataToSend.append("image1", formData.image1);
    if (formData.image2) formDataToSend.append("image2", formData.image2);
    if (formData.image3) formDataToSend.append("image3", formData.image3);

    try {
      await createTemplate({
        templateType: "template4",
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

        <div className="max-w-[1400px] mx-auto space-y-12">
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
                  templateType="template4"
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

          {/* Section 1 */}
          <section className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <RichTextEditor
                  label="English Content"
                  value={formData.description1En}
                  onChange={(value) =>
                    handleInputChange("description1En", value)
                  }
                  placeholder="Enter English content here..."
                />
                <RichTextEditor
                  label="Arabic Content"
                  value={formData.description1Ar}
                  onChange={(value) =>
                    handleInputChange("description1Ar", value)
                  }
                  placeholder="Enter Arabic content here..."
                  isRTL
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Button Text (English)"
                    value={formData.buttonText1En}
                    onChange={(e) =>
                      handleInputChange("buttonText1En", e.target.value)
                    }
                  />
                  <Input
                    label="Button Text (Arabic)"
                    value={formData.buttonText1Ar}
                    onChange={(e) =>
                      handleInputChange("buttonText1Ar", e.target.value)
                    }
                  />
                  <Input
                    label="Button Link (English)"
                    value={formData.buttonNavigation1En}
                    onChange={(e) =>
                      handleInputChange("buttonNavigation1En", e.target.value)
                    }
                  />
                  <Input
                    label="Button Link (Arabic)"
                    value={formData.buttonNavigation1Ar}
                    onChange={(e) =>
                      handleInputChange("buttonNavigation1Ar", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-lg">
                {previewImages.section1Image ? (
                  <div className="relative group h-full">
                    <img
                      src={previewImages.section1Image}
                      alt="Section 1"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <ImageUploadOverlay
                      id="section1Image"
                      onChange={(e) => handleImageUpload("section1Image", e)}
                    />
                  </div>
                ) : (
                  <ImageUploadPlaceholder
                    id="section1Image"
                    onChange={(e) => handleImageUpload("section1Image", e)}
                  />
                )}
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <RichTextEditor
                  label="English Content"
                  value={formData.description2En}
                  onChange={(value) =>
                    handleInputChange("description2En", value)
                  }
                  placeholder="Enter English content here..."
                />
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

              <div className="bg-white rounded-xl p-4 shadow-lg">
                {previewImages.section2Image ? (
                  <div className="relative group h-full">
                    <img
                      src={previewImages.section2Image}
                      alt="Section 2"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <ImageUploadOverlay
                      id="section2Image"
                      onChange={(e) => handleImageUpload("section2Image", e)}
                    />
                  </div>
                ) : (
                  <ImageUploadPlaceholder
                    id="section2Image"
                    onChange={(e) => handleImageUpload("section2Image", e)}
                  />
                )}
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <RichTextEditor
                  label="English Content"
                  value={formData.description3En}
                  onChange={(value) =>
                    handleInputChange("description3En", value)
                  }
                  placeholder="Enter English content here..."
                />
                <RichTextEditor
                  label="Arabic Content"
                  value={formData.description3Ar}
                  onChange={(value) =>
                    handleInputChange("description3Ar", value)
                  }
                  placeholder="Enter Arabic content here..."
                  isRTL
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Button Text (English)"
                    value={formData.buttonText2En}
                    onChange={(e) =>
                      handleInputChange("buttonText2En", e.target.value)
                    }
                  />
                  <Input
                    label="Button Text (Arabic)"
                    value={formData.buttonText2Ar}
                    onChange={(e) =>
                      handleInputChange("buttonText2Ar", e.target.value)
                    }
                  />
                  <Input
                    label="Button Link (English)"
                    value={formData.buttonNavigation2En}
                    onChange={(e) =>
                      handleInputChange("buttonNavigation2En", e.target.value)
                    }
                  />
                  <Input
                    label="Button Link (Arabic)"
                    value={formData.buttonNavigation2Ar}
                    onChange={(e) =>
                      handleInputChange("buttonNavigation2Ar", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-lg">
                {previewImages.section3Image ? (
                  <div className="relative group h-full">
                    <img
                      src={previewImages.section3Image}
                      alt="Section 3"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <ImageUploadOverlay
                      id="section3Image"
                      onChange={(e) => handleImageUpload("section3Image", e)}
                    />
                  </div>
                ) : (
                  <ImageUploadPlaceholder
                    id="section3Image"
                    onChange={(e) => handleImageUpload("section3Image", e)}
                  />
                )}
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-gradient-to-r from-teal-50 to-emerald-50 p-8 rounded-xl">
            <div className="space-y-6">
              <RichTextEditor
                label="English Content"
                value={formData.description4En}
                onChange={(value) => handleInputChange("description4En", value)}
              />
              <RichTextEditor
                label="Arabic Content"
                value={formData.description4Ar}
                onChange={(value) => handleInputChange("description4Ar", value)}
                isRTL
              />
            </div>
          </section>

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

// Helper Components
const ImageUploadOverlay = ({ id, onChange }) => (
  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
    <input
      type="file"
      id={id}
      accept="image/*"
      onChange={onChange}
      className="hidden"
    />
    <label
      htmlFor={id}
      className="cursor-pointer bg-white px-4 py-2 rounded-full shadow-lg"
    >
      Change Image
    </label>
  </div>
);

const ImageUploadPlaceholder = ({ id, onChange }) => (
  <div className="h-full min-h-[400px] bg-gray-100 flex flex-col items-center justify-center">
    <input
      type="file"
      id={id}
      accept="image/*"
      onChange={onChange}
      className="hidden"
    />
    <label
      htmlFor={id}
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
  </div>
);

export default AddTemplate4;
