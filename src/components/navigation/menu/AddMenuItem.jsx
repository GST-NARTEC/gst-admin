import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Switch,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useCreateMenuItemMutation } from "../../../store/apis/endpoints/websiteEndpoints/menuItems";

function AddMenuItem({ isOpen, onOpenChange }) {
  const [createMenuItem, { isLoading }] = useCreateMenuItemMutation();

  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    status: 1,
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "status" ? e : e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.nameEn || !formData.nameAr) {
        toast.error("Please fill in all required fields");
        return;
      }

      const menuData = {
        nameEn: formData.nameEn,
        nameAr: formData.nameAr,
        status: formData.status ? 1 : 0,
      };

      await createMenuItem(menuData).unwrap();
      toast.success("Menu created successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.data?.message || "Failed to create menu");
      console.error("Menu creation failed:", error);
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
            <ModalHeader className="text-xl font-semibold text-navy-700">
              Add New Menu
            </ModalHeader>
            <ModalBody>
              <div className="space-y-6">
                <Input
                  label="English Name"
                  value={formData.nameEn}
                  onChange={handleChange("nameEn")}
                  placeholder="Enter menu name in English"
                  isRequired
                  classNames={{
                    label: "text-navy-600",
                    input: "bg-gray-50",
                  }}
                />
                <Input
                  label="Arabic Name"
                  value={formData.nameAr}
                  onChange={handleChange("nameAr")}
                  placeholder="Enter menu name in Arabic"
                  isRequired
                  classNames={{
                    label: "text-navy-600",
                    input: "bg-gray-50",
                  }}
                />
                <div className="flex justify-between items-center">
                  <span className="text-navy-600 font-medium">Status</span>
                  <Switch
                    isSelected={formData.status === 1}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: value ? 1 : 0,
                      }))
                    }
                    classNames={{
                      wrapper: "group-data-[selected=true]:bg-navy-600",
                    }}
                  >
                    <span className="text-navy-600">
                      {formData.status === 1 ? "Active" : "Inactive"}
                    </span>
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
                Add Menu
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddMenuItem;
