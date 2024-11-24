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
import { useDeleteWhyBarcodeMutation } from "../../../../store/apis/endpoints/websiteEndpoints/whyBarcode";

function DeleteWhyBarcode({ isOpen, onOpenChange, whyBarcode }) {
  const [deleteWhyBarcode, { isLoading }] = useDeleteWhyBarcodeMutation();

  const handleDelete = async () => {
    try {
      await deleteWhyBarcode(whyBarcode.id).unwrap();
      toast.success("Why Barcode deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete why barcode");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-xl font-semibold">
              Delete Why Barcode
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete this why barcode? This action
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

export default DeleteWhyBarcode;
