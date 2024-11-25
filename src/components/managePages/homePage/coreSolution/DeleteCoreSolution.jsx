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
import { useDeleteCoreSolutionMutation } from "../../../../store/apis/endpoints/websiteEndpoints/CoreSolution";

function DeleteCoreSolution({ isOpen, onOpenChange, coreSolution }) {
  const [deleteCoreSolution, { isLoading }] = useDeleteCoreSolutionMutation();

  const handleDelete = async () => {
    try {
      await deleteCoreSolution(coreSolution.id).unwrap();
      toast.success("Core Solution deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete core solution");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-xl font-semibold">
              Delete Core Solution
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete this core solution? This action
                cannot be undone.
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

export default DeleteCoreSolution;
