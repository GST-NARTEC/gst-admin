import React, { useState, useEffect } from "react";
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
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useUpdateSmartSolutionMutation } from "../../../../store/apis/endpoints/websiteEndpoints/smartSolution";
import { useGetPagesQuery } from "../../../../store/apis/endpoints/pageSetup";

function EditSmartSolution({ isOpen, onOpenChange, smartSolution }) {
  const [updateSmartSolution, { isLoading }] = useUpdateSmartSolutionMutation();
  const { data: pagesData } = useGetPagesQuery();

  const [formData, setFormData] = useState({
    titleEn: "",
    titleAr: "",
    captionEn: "",
    captionAr: "",
    descriptionEn: "",
    descriptionAr: "",
    image: null,
    date: "",
    isActive: true,
    pageId: "",
    urlType: "page",
    externalUrl: "",
  });

  const [preview, setPreview] = useState(null);

  const pages =
    pagesData?.data?.pages?.map((page) => ({
      label: page.nameEn,
      value: page.id,
      description: page.slug,
    })) || [];

  useEffect(() => {
    if (smartSolution) {
      setFormData({
        titleEn: smartSolution.titleEn || "",
        titleAr: smartSolution.titleAr || "",
        captionEn: smartSolution.captionEn || "",
        captionAr: smartSolution.captionAr || "",
        descriptionEn: smartSolution.descriptionEn || "",
        descriptionAr: smartSolution.descriptionAr || "",
        image: null,
        date: smartSolution.date
          ? new Date(smartSolution.date).toISOString().split("T")[0]
          : "",
        isActive: smartSolution.isActive || false,
        pageId: smartSolution.pageId || "",
        urlType: smartSolution.pageId ? "page" : "external",
        externalUrl: smartSolution.externalUrl || "",
      });
      setPreview(smartSolution.image || null);
    }
  }, [smartSolution]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUrlTypeChange = (keys) => {
    const selectedType = Array.from(keys)[0];
    setFormData((prev) => ({
      ...prev,
      urlType: selectedType,
      pageId: "",
      externalUrl: "",
    }));
  };

  const handlePageSelection = (id) => {
    setFormData((prev) => ({ ...prev, pageId: id }));
  };

  const handleSubmit = async () => {
    try {
      // Validation
      if (!formData.titleEn || !formData.titleAr) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (formData.urlType === "page" && !formData.pageId) {
        toast.error("Please select a page");
        return;
      }

      if (formData.urlType === "external" && !formData.externalUrl) {
        toast.error("Please enter an external URL");
        return;
      }

      const formDataToSubmit = new FormData();
      formDataToSubmit.append("titleEn", formData.titleEn);
      formDataToSubmit.append("titleAr", formData.titleAr);
      formDataToSubmit.append("captionEn", formData.captionEn);
      formDataToSubmit.append("captionAr", formData.captionAr);
      formDataToSubmit.append("descriptionEn", formData.descriptionEn);
      formDataToSubmit.append("descriptionAr", formData.descriptionAr);
      formDataToSubmit.append("date", formData.date);
      formDataToSubmit.append("isActive", formData.isActive);

      if (formData.urlType === "external") {
        const formattedUrl = formData.externalUrl.startsWith("http")
          ? formData.externalUrl
          : `https://${formData.externalUrl}`;
        formDataToSubmit.append("externalUrl", formattedUrl);
      } else {
        formDataToSubmit.append("pageId", formData.pageId);
      }

      if (formData.image) {
        formDataToSubmit.append("image", formData.image);
      }
      const payload = {
        id: smartSolution.id,
        data: formDataToSubmit,
      };

      await updateSmartSolution(payload).unwrap();
      toast.success("Smart Solution updated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.data?.message || "Failed to update smart solution");
    }
  };

  const renderUrlInput = () => {
    if (formData.urlType === "page") {
      return (
        <Autocomplete
          label="Select Page"
          placeholder="Search for a page"
          defaultItems={pages}
          selectedKey={formData.pageId}
          onSelectionChange={handlePageSelection}
          className="col-span-2"
          isRequired
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
      );
    }

    return (
      <Input
        label="External URL"
        placeholder="Enter external URL (e.g., https://example.com)"
        value={formData.externalUrl}
        onChange={handleChange("externalUrl")}
        className="col-span-2"
        isRequired
      />
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      size="4xl"
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
              Edit Smart Solution
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Title (English)"
                  placeholder="Enter title in English"
                  value={formData.titleEn}
                  onChange={handleChange("titleEn")}
                  isRequired
                />
                <Input
                  label="Title (Arabic)"
                  placeholder="Enter title in Arabic"
                  value={formData.titleAr}
                  onChange={handleChange("titleAr")}
                  isRequired
                />

                <Input
                  label="Caption (English)"
                  placeholder="Enter caption in English"
                  value={formData.captionEn}
                  onChange={handleChange("captionEn")}
                />
                <Input
                  label="Caption (Arabic)"
                  placeholder="Enter caption in Arabic"
                  value={formData.captionAr}
                  onChange={handleChange("captionAr")}
                />

                <Textarea
                  label="Description (English)"
                  placeholder="Enter description in English"
                  value={formData.descriptionEn}
                  onChange={handleChange("descriptionEn")}
                  className="col-span-1"
                />
                <Textarea
                  label="Description (Arabic)"
                  placeholder="Enter description in Arabic"
                  value={formData.descriptionAr}
                  onChange={handleChange("descriptionAr")}
                  className="col-span-1"
                />

                <Input
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange("date")}
                  className="col-span-1"
                />

                <div className="col-span-1 flex items-end">
                  <Switch
                    isSelected={formData.isActive}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        isActive: value,
                      }))
                    }
                  >
                    {formData.isActive ? "Active" : "Inactive"}
                  </Switch>
                </div>

                <Select
                  label="URL Type"
                  placeholder="Select URL type"
                  selectedKeys={[formData.urlType]}
                  onSelectionChange={handleUrlTypeChange}
                  className="col-span-2"
                >
                  <SelectItem key="page" value="page">
                    Internal Page
                  </SelectItem>
                  <SelectItem key="external" value="external">
                    External URL
                  </SelectItem>
                </Select>

                {renderUrlInput()}

                <div className="col-span-2">
                  <p className="text-sm mb-2">Image</p>
                  <div
                    onClick={() => document.getElementById("editImage").click()}
                    className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded"
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <FaUpload className="text-2xl mb-2" />
                        <p>Click to upload image</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="editImage"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                onPress={onClose}
                className="text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                onPress={handleSubmit}
                className="bg-navy-600 text-white hover:bg-navy-700"
              >
                Update Smart Solution
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default EditSmartSolution;
