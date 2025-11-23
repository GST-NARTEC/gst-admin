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
import toast from "react-hot-toast";
import { useDeleteOrderMutation } from "../../store/apis/endpoints/user";

function DeleteOrderModal({
  isOpen,
  onClose,
  order,
}) {
  const [confirmText, setConfirmText] = useState("");
  const isDeleteEnabled = confirmText === "delete";

  const [deleteOrder, { isLoading }] = useDeleteOrderMutation();

  const handleDelete = async () => {
    try {
      await deleteOrder(order?.orderNumber).unwrap();
      toast.success("Order deleted successfully");
      setConfirmText(""); // Reset the input
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete order");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Confirm Order Deletion</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <p>
              This action cannot be undone. This will permanently delete the
              order{" "}
              <span className="font-bold text-danger">
                {order?.orderNumber}
              </span>
              .
            </p>
            <div className="bg-gray-100 p-3 rounded-lg space-y-1">
              <p className="text-sm">
                <span className="font-semibold">Order ID:</span>{" "}
                {order?.orderNumber}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Total Items:</span>{" "}
                {order?.orderItems?.length || 0}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Status:</span> {order?.status}
              </p>
            </div>
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
          <Button 
            variant="light" 
            onPress={onClose}
            disabled={isLoading}
          >
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
              "Delete Order"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteOrderModal;
