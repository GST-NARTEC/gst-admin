import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useDeleteTemplateMutation } from "../../../../store/apis/endpoints/templates";

function DeleteTemplate1({ isOpen, onClose, templateId }) {
  const [deleteTemplate, { isLoading }] = useDeleteTemplateMutation();

  const handleDelete = async () => {
    try {
      await deleteTemplate({ 
        templateType: "template1", 
        id: templateId 
      }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to delete template:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this template? This action cannot be undone.
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button 
            color="danger" 
            onPress={handleDelete}
            isLoading={isLoading}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteTemplate1;
