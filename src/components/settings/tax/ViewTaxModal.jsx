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
  Switch,
  Textarea,
} from "@nextui-org/react";
import {
  useUpdateTaxMutation,
  useDeleteTaxMutation,
} from "../../../store/apis/endpoints/tax";
import { toast } from "react-hot-toast";

function ViewTaxModal({ isOpen, onOpenChange, tax }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTax, { isLoading: isUpdating }] = useUpdateTaxMutation();
  const [deleteTax, { isLoading: isDeleting }] = useDeleteTaxMutation();

  const [formData, setFormData] = useState({
    name: "",
    type: "PERCENTAGE",
    value: "",
    taxId: "",
    description: "",
    isActive: true,
  });

  // Update formData when tax prop changes
  useEffect(() => {
    if (tax) {
      setFormData({
        name: tax.name,
        type: tax.type,
        value: tax.value.toString(),
        taxId: tax.taxId,
        description: tax.description,
        isActive: tax.isActive,
      });
    }
  }, [tax]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "isActive" ? e : e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateTax({
        id: tax.id,
        data: {
          ...formData,
          value: parseFloat(formData.value),
        },
      }).unwrap();

      toast.success("Tax updated successfully");
      setIsEditing(false);
      onOpenChange(false);
    } catch (error) {
      toast.error(error.data?.message || "Failed to update tax");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTax(tax.id).unwrap();
      toast.success("Tax deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete tax");
    }
  };

  // Update the Select component options
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
                    <SelectItem key="PERCENTAGE">Percentage</SelectItem>
                    <SelectItem key="FIXED">Fixed</SelectItem>
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
                    isLoading={isUpdating}
                    className="bg-navy-600 text-white hover:bg-navy-700"
                    onPress={handleSave}
                  >
                    Save Changes
                  </Button>
                  <Button variant="light" onPress={() => setIsEditing(false)}>
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
                    isLoading={isDeleting}
                    className="bg-red-500 text-white hover:bg-red-600"
                    onPress={handleDelete}
                  >
                    Delete
                  </Button>
                  <Button variant="light" onPress={onClose}>
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
