import React, { useState, useEffect } from "react";
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
import { useUpdateSubMenuMutation } from "../../../store/apis/endpoints/websiteEndpoints/subMenu";
import { useGetMenuItemsQuery } from "../../../store/apis/endpoints/websiteEndpoints/menuItems";
import { useGetPagesQuery } from "../../../store/apis/endpoints/pageSetup";

function EditSubMenu({ isOpen, onOpenChange, subMenu }) {
  const [updateSubMenu, { isLoading }] = useUpdateSubMenuMutation();
  const { data: menuData } = useGetMenuItemsQuery();
  const { data: pagesData } = useGetPagesQuery();

  const menus = menuData?.data?.menus || [];
  const pages = pagesData?.data?.pages?.map((page) => ({
    label: page.nameEn,
    value: page.id,
    description: page.slug
  })) || [];

  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    headingEn: "",
    headingAr: "",
    menuId: "",
    pageId: "",
    externalUrl: "",
    urlType: "page"
  });

  useEffect(() => {
    if (subMenu) {
      setFormData({
        nameEn: subMenu.nameEn,
        nameAr: subMenu.nameAr,
        headingEn: subMenu.headingEn === "null" ? "" : subMenu.headingEn,
        headingAr: subMenu.headingAr === "null" ? "" : subMenu.headingAr,
        menuId: subMenu.menuId,
        pageId: subMenu.pageId || "",
        externalUrl: subMenu.externalUrl || "",
        urlType: subMenu.externalUrl ? "external" : "page"
      });
    }
  }, [subMenu]);

  const handleChange = (field) => (e) => {
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

  const formatExternalUrl = (url) => {
    if (!url) return null;
    try {
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
      new URL(formattedUrl); // Validate URL format
      return formattedUrl;
    } catch (error) {
      throw new Error("Please enter a valid URL");
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.nameEn || !formData.nameAr || !formData.menuId) {
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

      const submissionData = {
        id: subMenu.id,
        nameEn: formData.nameEn,
        nameAr: formData.nameAr,
        headingEn: formData.headingEn || null,
        headingAr: formData.headingAr || null,
        menuId: formData.menuId,
        pageId: formData.urlType === "page" ? formData.pageId : null,
        externalUrl: formData.urlType === "external" ? formatExternalUrl(formData.externalUrl) : null
      };

      await updateSubMenu(submissionData).unwrap();
      toast.success("Submenu updated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.message || error.data?.message || "Failed to update submenu");
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
          onSelectionChange={(id) => 
            setFormData(prev => ({ ...prev, pageId: id }))
          }
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
              Edit Submenu
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Name (English)"
                  placeholder="Enter name in English"
                  value={formData.nameEn}
                  onChange={handleChange("nameEn")}
                  isRequired
                />
                <Input
                  label="Name (Arabic)"
                  placeholder="Enter name in Arabic"
                  value={formData.nameAr}
                  onChange={handleChange("nameAr")}
                  isRequired
                />
                <Input
                  label="Heading (English)"
                  placeholder="Enter heading in English (optional)"
                  value={formData.headingEn}
                  onChange={handleChange("headingEn")}
                />
                <Input
                  label="Heading (Arabic)"
                  placeholder="Enter heading in Arabic (optional)"
                  value={formData.headingAr}
                  onChange={handleChange("headingAr")}
                />
                <Select
                  label="Parent Menu"
                  placeholder="Select parent menu"
                  selectedKeys={formData.menuId ? [formData.menuId] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0];
                    setFormData(prev => ({ ...prev, menuId: selectedKey }));
                  }}
                  className="col-span-1"
                  isRequired
                >
                  {menus.map((menu) => (
                    <SelectItem 
                      key={menu.id} 
                      textValue={`${menu.nameEn} (${menu.nameAr})`}
                    >
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
                Update Submenu
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default EditSubMenu;
