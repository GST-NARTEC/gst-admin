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

function ViewTaxModal({ isOpen, onOpenChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "VAT",
    type: "percentage",
    value: "5",
    taxId: "923456789012345",
    description: "Goods and Services",
    isActive: true,
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "isActive" ? e : e.target.value,
    }));
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
              {isEditing ? "Edit Tax" : "View Tax"}
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <Input
                    label="Name"
                    value={formData.name}
                    onChange={handleChange("name")}
                    isReadOnly={!isEditing}
                    classNames={{
                      label: "text-navy-600",
                      input: "bg-gray-50",
                    }}
                  />
                  <Select
                    label="Type"
                    selectedKeys={[formData.type]}
                    onChange={handleChange("type")}
                    isDisabled={!isEditing}
                    classNames={{
                      label: "text-navy-600",
                      trigger: "bg-gray-50",
                    }}
                  >
                    <SelectItem key="percentage">Percentage</SelectItem>
                    <SelectItem key="fixed">Fixed</SelectItem>
                  </Select>
                  <Input
                    label="Value"
                    type="number"
                    value={formData.value}
                    onChange={handleChange("value")}
                    isReadOnly={!isEditing}
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
                    isReadOnly={!isEditing}
                    classNames={{
                      label: "text-navy-600",
                      input: "bg-gray-50",
                    }}
                  />
                  <Textarea
                    label="Description"
                    value={formData.description}
                    onChange={handleChange("description")}
                    isReadOnly={!isEditing}
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
                      isDisabled={!isEditing}
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
              {isEditing ? (
                <>
                  <Button
                    className="bg-navy-600 text-white hover:bg-navy-700"
                    onPress={() => {
                      console.log("Saving changes:", formData);
                      setIsEditing(false);
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    className="text-gray-600 hover:bg-gray-100"
                    variant="light"
                    onPress={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="bg-navy-600 text-white hover:bg-navy-700"
                    onPress={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-500 text-white hover:bg-red-600"
                    onPress={() => {
                      console.log("Deleting tax");
                      onClose();
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    className="text-gray-600 hover:bg-gray-100"
                    variant="light"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ViewTaxModal;
