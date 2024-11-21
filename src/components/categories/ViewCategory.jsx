import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Image,
} from "@nextui-org/react";
import {
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../store/apis/endpoints/categories";
import toast from "react-hot-toast";

function ViewCategory({ isOpen, onClose, category }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    newImage: null,
    imagePreview: null,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        image: category.image,
        newImage: null,
        imagePreview: category.image,
      });
    }
  }, [category]);

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        newImage: file,
        imagePreview: previewUrl,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      if (formData.newImage) {
        formDataToSend.append("image", formData.newImage);
      }

      const payload = {
        id: category.id,
        body: formDataToSend,
      };
      await updateCategory(payload).unwrap();
      toast.success("Category updated successfully");
      setIsEditing(false);
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update category");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(category.id).unwrap();
      toast.success("Category deleted successfully");
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete category");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
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
              {isEditing ? "Edit Category" : "View Category"}
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
                  {isEditing && (
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-navy-600">
                        Update Image
                      </label>
                      <Input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        classNames={{
                          input: "bg-gray-50",
                        }}
                        label=" "
                      />
                    </div>
                  )}
                </div>

                {/* Right Column - Image Preview */}
                <div className="flex items-center justify-center">
                  <Image
                    src={formData.imagePreview}
                    alt="Category preview"
                    className="max-w-full h-auto rounded-lg"
                    width={200}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              {isEditing ? (
                <>
                  <Button
                    className="bg-navy-600 text-white hover:bg-navy-700"
                    onPress={handleSave}
                    isLoading={isLoading}
                  >
                    Save Changes
                  </Button>
                  <Button
                    className="text-gray-600 hover:bg-gray-100"
                    variant="light"
                    onPress={() => setIsEditing(false)}
                    isDisabled={isLoading}
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
                    isLoading={isDeleting}
                    className="bg-red-500 text-white hover:bg-red-600"
                    onPress={handleDelete}
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

export default ViewCategory;
