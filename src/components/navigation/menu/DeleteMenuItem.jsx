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
import { useDeleteMenuItemMutation } from "../../../store/apis/endpoints/websiteEndpoints/menuItems";

function DeleteMenuItem({ isOpen, onOpenChange, menuItem }) {
  const [deleteMenuItem, { isLoading }] = useDeleteMenuItemMutation();

  const handleDelete = async () => {
    try {
      await deleteMenuItem(menuItem.id).unwrap();
      toast.success("Menu deleted successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete menu");
      console.error("Menu deletion failed:", error);
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
            <ModalHeader className="text-xl font-semibold text-danger">
              Delete Menu
            </ModalHeader>
            <ModalBody>
              <p className="text-gray-600">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-navy-700">
                  {menuItem?.nameEn}
                </span>
                ? This action cannot be undone. and all the sub menus will be
                unlinked.
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
                Delete Menu
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default DeleteMenuItem;
