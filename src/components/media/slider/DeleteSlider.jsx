import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useDeleteSliderMutation } from "../../../store/apis/endpoints/websiteEndpoints/slider";

function DeleteSlider({ isOpen, onOpenChange, slider }) {
  const [deleteSlider, { isLoading }] = useDeleteSliderMutation();

  const handleDelete = async () => {
    try {
      await deleteSlider(slider.id).unwrap();
      toast.success("Slider deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete slider");
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      size="md"
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
              Delete Slider
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this slider?</p>
              <p className="text-gray-500 mt-2">
                <strong>Title:</strong> {slider?.titleEn} ({slider?.titleAr})
              </p>
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
                color="danger"
                isLoading={isLoading}
                onPress={handleDelete}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default DeleteSlider;
