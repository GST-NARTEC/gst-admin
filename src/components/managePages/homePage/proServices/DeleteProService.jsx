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
import { useDeleteProServiceMutation } from "../../../../store/apis/endpoints/websiteEndpoints/proServices";

function DeleteProService({ isOpen, onOpenChange, proService }) {
  const [deleteProService, { isLoading }] = useDeleteProServiceMutation();

  const handleDelete = async () => {
    try {
      await deleteProService(proService.id).unwrap();
      toast.success("Professional Service deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error.data?.message || "Failed to delete professional service"
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-xl font-semibold">
              Delete Professional Service
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete this professional service? This
                action cannot be undone.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
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

export default DeleteProService;
