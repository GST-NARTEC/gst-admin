import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Switch,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useCreateCompanyMutation } from "../../../../store/apis/endpoints/compnies";
import { useGetPagesQuery } from "../../../../store/apis/endpoints/pageSetup";

function AddCompanyModal({ isOpen, onOpenChange }) {
  const [createCompany, { isLoading }] = useCreateCompanyMutation();
  const { data: pagesData } = useGetPagesQuery();

  const [formData, setFormData] = useState({
    icon: null,
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    websiteLink: "",
    pageId: "",
    isActive: true,
  });

  const [previewIcon, setPreviewIcon] = useState(null);

  const pages =
    pagesData?.data?.pages?.map((page) => ({
      label: page.nameEn,
      value: page.id,
      description: page.slug,
    })) || [];

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleIconUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleChange("icon", file);
      // Create object URL for preview
      setPreviewIcon(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({
      icon: null,
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      websiteLink: "",
      pageId: "",
      isActive: true,
    });
    setPreviewIcon(null);
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.titleEn.trim()) {
        toast.error("English title is required");
        return;
      }
      if (!formData.titleAr.trim()) {
        toast.error("Arabic title is required");
        return;
      }

      // Prepare form data for API
      const formDataToSend = new FormData();
      formDataToSend.append("titleEn", formData.titleEn);
      formDataToSend.append("titleAr", formData.titleAr);
      formDataToSend.append("descriptionEn", formData.descriptionEn);
      formDataToSend.append("descriptionAr", formData.descriptionAr);
      formDataToSend.append("websiteLink", formData.websiteLink);
      formDataToSend.append("pageId", formData.pageId || "");
      formDataToSend.append("isActive", formData.isActive);

      if (formData.icon) {
        formDataToSend.append("icon", formData.icon);
      }

      await createCompany(formDataToSend).unwrap();
      toast.success("Company added successfully");
      resetForm();
      onOpenChange(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add company");
    }
  };

  const handleModalClose = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      scrollBehavior="inside"
      classNames={{
        base: "bg-white",
        header: "border-b border-gray-200",
        body: "py-6",
        footer: "border-t border-gray-200",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-xl font-semibold">
              Add New Company
            </ModalHeader>
            <ModalBody>
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="English Title"
                    placeholder="Enter company title in English"
                    value={formData.titleEn}
                    onValueChange={(value) => handleChange("titleEn", value)}
                    isRequired
                  />
                  <Input
                    label="Arabic Title"
                    placeholder="Enter company title in Arabic"
                    value={formData.titleAr}
                    onValueChange={(value) => handleChange("titleAr", value)}
                    isRequired
                  />
                </div>

                {/* Descriptions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Textarea
                    label="English Description"
                    placeholder="Enter company description in English"
                    value={formData.descriptionEn}
                    onValueChange={(value) =>
                      handleChange("descriptionEn", value)
                    }
                    minRows={3}
                  />
                  <Textarea
                    label="Arabic Description"
                    placeholder="Enter company description in Arabic"
                    value={formData.descriptionAr}
                    onValueChange={(value) =>
                      handleChange("descriptionAr", value)
                    }
                    minRows={3}
                  />
                </div>

                {/* Icon Upload and Website */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Icon Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Icon
                    </label>
                    <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-300">
                      {previewIcon ? (
                        <div className="relative group">
                          <img
                            src={previewIcon}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg mx-auto"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                            <input
                              type="file"
                              id="icon"
                              accept="image/*"
                              onChange={handleIconUpload}
                              className="hidden"
                            />
                            <label
                              htmlFor="icon"
                              className="cursor-pointer bg-white px-3 py-1 rounded-full shadow-lg text-xs font-medium"
                            >
                              Change Icon
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <input
                            type="file"
                            id="icon"
                            accept="image/*"
                            onChange={handleIconUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="icon"
                            className="cursor-pointer inline-flex flex-col items-center justify-center"
                          >
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                              <svg
                                className="w-6 h-6 text-gray-400"
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
                            <span className="text-xs font-medium text-gray-700 mb-1">
                              Upload Icon
                            </span>
                            <span className="text-xs text-gray-500">
                              PNG, JPG up to 5MB
                            </span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <Input
                    label="Website Link (Optional)"
                    placeholder="https://example.com"
                    value={formData.websiteLink}
                    onValueChange={(value) =>
                      handleChange("websiteLink", value)
                    }
                  />
                </div>

                {/* Page Selection and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Autocomplete
                    label="Linked Page (Optional)"
                    placeholder="Select a page"
                    defaultItems={pages}
                    selectedKey={formData.pageId}
                    onSelectionChange={(value) => handleChange("pageId", value)}
                  >
                    {(item) => (
                      <AutocompleteItem key={item.value} textValue={item.label}>
                        <div className="flex flex-col">
                          <span>{item.label}</span>
                          <span className="text-small text-default-400">
                            {item.description}
                          </span>
                        </div>
                      </AutocompleteItem>
                    )}
                  </Autocomplete>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <Switch
                      isSelected={formData.isActive}
                      onValueChange={(value) => handleChange("isActive", value)}
                      color="success"
                    >
                      {formData.isActive ? "Active" : "Inactive"}
                    </Switch>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={handleModalClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Company"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddCompanyModal;
