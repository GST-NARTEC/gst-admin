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
  Switch,
  Textarea,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";

import { useCreateTaxMutation } from "../../../store/apis/endpoints/tax";

function AddTaxModal({ isOpen, onOpenChange }) {
  const [createTax, { isLoading }] = useCreateTaxMutation();

  const [formData, setFormData] = useState({
    name: "",
    type: "PERCENTAGE",
    value: "",
    description: "",
    taxId: "",
    isActive: true,
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "isActive" ? e : e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.name || !formData.value || !formData.type) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Prepare data according to the model structure
      const taxData = {
        name: formData.name,
        description: formData.description || null,
        value: parseFloat(formData.value), // Convert string to float
        type: formData.type,
        taxId: formData.taxId || null,
        isActive: formData.isActive,
      };

      await createTax(taxData).unwrap();
      toast.success("Tax created successfully");
      onOpenChange(false); // Close modal
    } catch (error) {
      toast.error(error.data?.message || "Failed to create tax");
      console.error("Tax creation failed:", error);
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
              Add New Tax
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <Input
                    label="Name"
                    value={formData.name}
                    onChange={handleChange("name")}
                    placeholder="Enter tax name"
                    classNames={{
                      label: "text-navy-600",
                      input: "bg-gray-50",
                    }}
                  />
                  <Select
                    label="Type"
                    selectedKeys={[formData.type]}
                    onChange={handleChange("type")}
                    classNames={{
                      label: "text-navy-600",
                      trigger: "bg-gray-50",
                    }}
                  >
                    <SelectItem key="PERCENTAGE">Percentage</SelectItem>
                    <SelectItem key="FIXED">Fixed</SelectItem>
                  </Select>
                  <Input
                    label="Value"
                    type="number"
                    value={formData.value}
                    onChange={handleChange("value")}
                    placeholder="Enter tax value"
                    classNames={{
                      label: "text-navy-600",
                      input: "bg-gray-50",
                    }}
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <Input
                    label="Tax ID (Optional)"
                    value={formData.taxId}
                    onChange={handleChange("taxId")}
                    placeholder="Enter tax ID"
                    classNames={{
                      label: "text-navy-600",
                      input: "bg-gray-50",
                    }}
                  />
                  <Textarea
                    label="Description"
                    value={formData.description}
                    onChange={handleChange("description")}
                    placeholder="Enter tax description"
                    classNames={{
                      label: "text-navy-600",
                      input: "bg-gray-50",
                    }}
                  />
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-navy-600 font-medium">Status</span>
                    <Switch
                      isSelected={formData.isActive}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, isActive: value }))
                      }
                      classNames={{
                        wrapper: "group-data-[selected=true]:bg-navy-600",
                      }}
                    >
                      <span className="text-navy-600">
                        {formData.isActive ? "Active" : "Inactive"}
                      </span>
                    </Switch>
                  </div>
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
                Add Tax
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddTaxModal;
