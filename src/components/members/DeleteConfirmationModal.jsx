// src/components/modals/DeleteConfirmationModal.jsx
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spinner,
} from "@nextui-org/react";
import { useDeleteUserMutation } from "../../store/apis/endpoints/user";
import toast from "react-hot-toast";

function DeleteConfirmationModal({
  isOpen,
  onClose,
  itemName = "item",
  memberId,
  onDeleteSuccess,
}) {
  const [confirmText, setConfirmText] = useState("");
  const isDeleteEnabled = confirmText === "delete";

  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      await deleteUser(memberId).unwrap();
      toast.success("Member deleted successfully");
      setConfirmText(""); // Reset the input
      onDeleteSuccess?.(); // Callback to parent if needed
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete member");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <p>
              This action cannot be undone. This will permanently delete the{" "}
              {itemName}.
            </p>
            <p>
              Please type <span className="font-bold">delete</span> to confirm.
            </p>
            <Input
              value={confirmText}
              onValueChange={setConfirmText}
              placeholder="Type 'delete' to confirm"
              variant="bordered"
              disabled={isLoading}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            color="danger"
            onPress={handleDelete}
            isDisabled={!isDeleteEnabled || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" color="white" />
                <span>Deleting...</span>
              </div>
            ) : (
              "Delete"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteConfirmationModal;
