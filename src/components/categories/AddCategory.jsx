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
import { useCreateCategoryMutation } from "../../store/apis/endpoints/categories";
import toast from "react-hot-toast";

function AddCategory({ isOpen, onClose }) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [createCategory, { isLoading, isError, error, isSuccess }] =
    useCreateCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category added successfully!");
      handleClose();
    }

    if (isError) {
      toast.error(error?.data?.message || "Failed to add category");
    }
  }, [isError, isSuccess, error]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCategoryImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleClose = () => {
    setNewCategoryName("");
    setNewCategoryImage(null);
    setImagePreview(null);
    onClose();
  };

  const handleAddCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newCategoryName);
      formData.append("image", newCategoryImage);

      await createCategory(formData).unwrap();
    } catch (err) {
      console.error("Failed to add category:", err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      placement="top-center"
      classNames={{
        base: "max-w-md",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add New Category
            </ModalHeader>
            <ModalBody>
              <Input
                label="Category Name"
                placeholder="Enter category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                classNames={{
                  input: "bg-transparent",
                  inputWrapper: "bg-default-100",
                }}
              />
              <Input
                type="file"
                label="Category Image"
                onChange={handleImageChange}
                accept="image/*"
                classNames={{
                  base: "mt-2",
                  input: "bg-transparent",
                  inputWrapper: "bg-default-100",
                }}
              />
              {imagePreview && (
                <div className="mt-2">
                  <Image
                    src={imagePreview}
                    alt="Category preview"
                    className="max-w-full h-auto rounded-lg"
                    width={200}
                  />
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={handleClose}
                className="hover:bg-danger-100"
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                color="primary"
                onPress={handleAddCategory}
                className="bg-navy-600 text-white hover:bg-navy-700"
                isDisabled={!newCategoryName}
              >
                Add Category
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddCategory;
