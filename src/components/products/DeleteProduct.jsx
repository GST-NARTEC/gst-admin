import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useDeleteProductMutation } from "../../store/apis/endpoints/products";
import toast from "react-hot-toast";

function DeleteProduct({ isOpen, onClose, product }) {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id).unwrap();
      toast.success("Product deleted successfully");
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete product");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Product
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete <strong>{product?.title}</strong>?
                This action cannot be undone.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                onPress={onClose}
                isDisabled={isLoading}
              >
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
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default DeleteProduct;