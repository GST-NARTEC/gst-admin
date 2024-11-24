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
} from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useCreateSubMenuMutation } from "../../../store/apis/endpoints/websiteEndpoints/subMenu";
import { useGetMenuItemsQuery } from "../../../store/apis/endpoints/websiteEndpoints/menuItems";

function AddSubMenu({ isOpen, onOpenChange }) {
  const [createSubMenu, { isLoading }] = useCreateSubMenuMutation();
  const { data: menuData } = useGetMenuItemsQuery();
  const menus = menuData?.data?.menus || [];

  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    headingEn: "",
    headingAr: "",
    menuId: "",
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.nameEn || !formData.nameAr || !formData.menuId) {
        toast.error("Please fill in all required fields");
        return;
      }

      await createSubMenu(formData).unwrap();
      toast.success("Submenu created successfully");
      onOpenChange(false);
      setFormData({
        nameEn: "",
        nameAr: "",
        headingEn: "",
        headingAr: "",
        menuId: "",
      });
    } catch (error) {
      toast.error(error.data?.message || "Failed to create submenu");
    }
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
                  className="col-span-2"
                  isRequired
                  classNames={{
                    trigger: "h-12",
                    value: "text-base",
                  }}
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