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
import { useDeletePageMutation } from "../../../store/apis/endpoints/pageSetup";

function DeletePageSetup({ isOpen, onOpenChange, page }) {
  const [deletePage, { isLoading }] = useDeletePageMutation();

  const handleDelete = async () => {
    try {
      await deletePage(page.id).unwrap();
      toast.success("Page deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete page");
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
              Delete Page
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this page?</p>
              <p className="text-gray-500 mt-2">
                <strong>Name:</strong> {page?.nameEn} ({page?.nameAr})
              </p>
              <p className="text-gray-500">
                <strong>Template:</strong> {page?.template}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                onPress={onClose}
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

export default DeletePageSetup;
