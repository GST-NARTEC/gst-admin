import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useCreateSubMenuMutation } from "../../../store/apis/endpoints/websiteEndpoints/subMenu";
import { useGetMenuItemsQuery } from "../../../store/apis/endpoints/websiteEndpoints/menuItems";
import { useGetPagesQuery } from "../../../store/apis/endpoints/pageSetup";

const initialFormState = {
  nameEn: "",
  nameAr: "",
  headingEn: "",
  headingAr: "",
  menuId: "",
  pageId: "",
  externalUrl: "",
  urlType: "page"
};

function AddSubMenu({ isOpen, onOpenChange }) {
  const [createSubMenu, { isLoading }] = useCreateSubMenuMutation();
  const { data: pagesData } = useGetPagesQuery();
  const { data: menuData } = useGetMenuItemsQuery();
  const [formData, setFormData] = useState(initialFormState);

  const menus = menuData?.data?.menus || [];
  const pages = pagesData?.data?.pages?.map((page) => ({
    label: page.nameEn,
    value: page.id,
    description: page.slug,
  })) || [];

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleUrlTypeChange = (keys) => {
    const selectedType = Array.from(keys)[0];
    setFormData((prev) => ({
      ...prev,
      urlType: selectedType,
      pageId: "",
      externalUrl: ""
    }));
  };

  const handleMenuSelection = (keys) => {
    const selectedKey = Array.from(keys)[0];
    setFormData((prev) => ({ ...prev, menuId: selectedKey }));
  };

  const handlePageSelection = (id) => {
    setFormData((prev) => ({ ...prev, pageId: id }));
  };

  const validateFormData = () => {
    if (!formData.nameEn || !formData.nameAr || !formData.menuId) {
      throw new Error("Please fill in all required fields");
    }

    if (formData.urlType === "page" && !formData.pageId) {
      throw new Error("Please select a page");
    }

    if (formData.urlType === "external" && !formData.externalUrl) {
      throw new Error("Please enter an external URL");
    }
  };

  const formatExternalUrl = (url) => {
    try {
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
      new URL(formattedUrl); // Validate URL format
      return formattedUrl;
    } catch (error) {
      throw new Error("Please enter a valid URL");
    }
  };

  const prepareSubmissionData = () => {
    const baseData = {
      nameEn: formData.nameEn,
      nameAr: formData.nameAr,
      headingEn: formData.headingEn || null,
      headingAr: formData.headingAr || null,
      menuId: formData.menuId,
    };

    if (formData.urlType === "external") {
      const formattedUrl = formatExternalUrl(formData.externalUrl);
      return {
        ...baseData,
        pageId: null,
        externalUrl: formattedUrl,
      };
    }

    return {
      ...baseData,
      pageId: formData.pageId,
      externalUrl: null,
    };
  };

  const handleSubmit = async (onClose) => {
    try {
      validateFormData();
      const submissionData = prepareSubmissionData();
      await createSubMenu(submissionData).unwrap();
      toast.success("Submenu created successfully");
      onClose();
    } catch (error) {
      toast.error(error.message || error.data?.message || "Failed to create submenu");
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
        onChange={handleInputChange("externalUrl")}
        className="col-span-2"
        isRequired
      />
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
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
              Add New Submenu
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Name (English)"
                  placeholder="Enter name in English"
                  value={formData.nameEn}
                  onChange={handleInputChange("nameEn")}
                  isRequired
                />
                <Input
                  label="Name (Arabic)"
                  placeholder="Enter name in Arabic"
                  value={formData.nameAr}
                  onChange={handleInputChange("nameAr")}
                  isRequired
                />
                <Input
                  label="Heading (English)"
                  placeholder="Enter heading in English (optional)"
                  value={formData.headingEn}
                  onChange={handleInputChange("headingEn")}
                />
                <Input
                  label="Heading (Arabic)"
                  placeholder="Enter heading in Arabic (optional)"
                  value={formData.headingAr}
                  onChange={handleInputChange("headingAr")}
                />
                <Select
                  label="Parent Menu"
                  placeholder="Select parent menu"
                  selectedKeys={formData.menuId ? [formData.menuId] : []}
                  onSelectionChange={handleMenuSelection}
                  className="col-span-1"
                  isRequired
                >
                  {menus.map((menu) => (
                    <SelectItem key={menu.id} textValue={`${menu.nameEn} (${menu.nameAr})`}>
                      <div className="flex flex-col">
                        <span>{menu.nameEn}</span>
                        <span className="text-small text-default-500">{menu.nameAr}</span>
                      </div>
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="URL Type"
                  placeholder="Select URL type"
                  selectedKeys={[formData.urlType]}
                  onSelectionChange={handleUrlTypeChange}
                  className="col-span-2"
                >
                  <SelectItem key="page" value="page">Internal Page</SelectItem>
                  <SelectItem key="external" value="external">External URL</SelectItem>
                </Select>

                {renderUrlInput()}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                onPress={() => handleSubmit(onClose)}
                className="bg-navy-600 text-white"
              >
                Add Submenu
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddSubMenu;
