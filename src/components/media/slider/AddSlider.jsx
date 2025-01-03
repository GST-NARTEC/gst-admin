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
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useCreateSliderMutation } from "../../../store/apis/endpoints/websiteEndpoints/slider";
import { FaUpload } from "react-icons/fa";
import { useGetPagesQuery } from "../../../store/apis/endpoints/pageSetup";

function AddSlider({ isOpen, onOpenChange }) {
  const [createSlider, { isLoading }] = useCreateSliderMutation();
  const { data: pagesData } = useGetPagesQuery();

  const [formData, setFormData] = useState({
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    captionEn: "",
    captionAr: "",
    imageEn: null,
    imageAr: null,
    status: 1,
    pageId: "",
    urlType: "page",
    externalUrl: "",
  });

  const [previews, setPreviews] = useState({
    imageEn: null,
    imageAr: null,
  });

  const pages =
    pagesData?.data?.pages?.map((page) => ({
      label: page.nameEn,
      value: page.id,
      description: page.slug,
    })) || [];

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleImageChange = (field) => (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }));
      setPreviews((prev) => ({
        ...prev,
        [field]: URL.createObjectURL(file),
      }));
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
      const formDataToSend = new FormData();
      formDataToSend.append("titleEn", formData.titleEn);
      formDataToSend.append("titleAr", formData.titleAr);
      formDataToSend.append("descriptionEn", formData.descriptionEn);
      formDataToSend.append("descriptionAr", formData.descriptionAr);
      formDataToSend.append("captionEn", formData.captionEn);
      formDataToSend.append("captionAr", formData.captionAr);
      formDataToSend.append("status", formData.status);

      if (formData.urlType === "external") {
        const formattedUrl = formData.externalUrl.startsWith("http")
          ? formData.externalUrl
          : `https://${formData.externalUrl}`;
        formDataToSend.append("externalUrl", formattedUrl);
      } else {
        formDataToSend.append("pageId", formData.pageId);
      }

      if (formData.imageEn) {
        formDataToSend.append("imageEn", formData.imageEn);
      }
      if (formData.imageAr) {
        formDataToSend.append("imageAr", formData.imageAr);
      }

      await createSlider(formDataToSend).unwrap();
      toast.success("Slider created successfully");
      onOpenChange(false);
      setFormData({
        titleEn: "",
        titleAr: "",
        descriptionEn: "",
        descriptionAr: "",
        captionEn: "",
        captionAr: "",
        imageEn: null,
        imageAr: null,
        status: 1,
        pageId: "",
        urlType: "page",
        externalUrl: "",
      });
      setPreviews({ imageEn: null, imageAr: null });
    } catch (error) {
      toast.error(error.data?.message || "Failed to create slider");
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
      size="3xl"
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
              Add New Slider
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
                <Textarea
                  label="Description (English)"
                  placeholder="Enter description in English"
                  value={formData.descriptionEn}
                  onChange={handleChange("descriptionEn")}
                  className="col-span-1"
                  isRequired
                />
                <Textarea
                  label="Description (Arabic)"
                  placeholder="Enter description in Arabic"
                  value={formData.descriptionAr}
                  onChange={handleChange("descriptionAr")}
                  className="col-span-1"
                  isRequired
                />
                <Input
                  label="Button Caption (English)"
                  placeholder="Enter caption in English"
                  value={formData.captionEn}
                  onChange={handleChange("captionEn")}
                  isRequired
                />
                <Input
                  label="Button Caption (Arabic)"
                  placeholder="Enter caption in Arabic"
                  value={formData.captionAr}
                  onChange={handleChange("captionAr")}
                  isRequired
                />

                <div className="col-span-1">
                  <p className="text-sm mb-2">English Image</p>
                  <div
                    onClick={() => document.getElementById("imageEn").click()}
                    className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    {previews.imageEn ? (
                      <img
                        src={previews.imageEn}
                        alt="Preview EN"
                        className="w-full h-40 object-cover rounded"
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <FaUpload className="text-2xl mb-2" />
                        <p>Click to upload English image</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="imageEn"
                    className="hidden"
                    onChange={handleImageChange("imageEn")}
                    accept="image/*"
                  />
                </div>

                <div className="col-span-1">
                  <p className="text-sm mb-2">Arabic Image</p>
                  <div
                    onClick={() => document.getElementById("imageAr").click()}
                    className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    {previews.imageAr ? (
                      <img
                        src={previews.imageAr}
                        alt="Preview AR"
                        className="w-full h-40 object-cover rounded"
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <FaUpload className="text-2xl mb-2" />
                        <p>Click to upload Arabic image</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="imageAr"
                    className="hidden"
                    onChange={handleImageChange("imageAr")}
                    accept="image/*"
                  />
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
                  <Switch
                    isSelected={formData.status === 1}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: value ? 1 : 0,
                      }))
                    }
                  >
                    {formData.status === 1 ? "Active" : "Inactive"}
                  </Switch>
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
                Add Slider
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddSlider;