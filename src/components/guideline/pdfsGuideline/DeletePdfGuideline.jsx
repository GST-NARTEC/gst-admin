import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useDeleteUserGuideMutation } from "../../../store/apis/endpoints/guideline";

function DeletePdfGuideline({ isOpen, onClose, pdf }) {
  const [deleteUserGuide, { isLoading }] = useDeleteUserGuideMutation();

  const handleDelete = async () => {
    try {
      await deleteUserGuide(pdf.id).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to delete PDF:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Delete PDF Guideline
        </ModalHeader>
        <ModalBody>
          <p>
            Are you sure you want to delete the PDF guideline "{pdf?.title}"?
            This action cannot be undone.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="danger" onPress={handleDelete} isLoading={isLoading}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeletePdfGuideline;
