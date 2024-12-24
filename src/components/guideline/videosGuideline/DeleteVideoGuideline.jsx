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
import toast from "react-hot-toast";

function DeleteVideoGuideline({ isOpen, onClose, video }) {
  const [deleteUserGuide, { isLoading }] = useDeleteUserGuideMutation();

  const handleDelete = async () => {
    try {
      await deleteUserGuide(video.id).unwrap();
      toast.success("Video guideline deleted successfully");
      onClose();
    } catch (error) {
      console.error("Failed to delete video:", error);
      toast.error("Failed to delete video guideline");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Delete Video Guideline
        </ModalHeader>
        <ModalBody>
          <p>
            Are you sure you want to delete the video guideline "{video?.title}
            "? This action cannot be undone.
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

export default DeleteVideoGuideline;
